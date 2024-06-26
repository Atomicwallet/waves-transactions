"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const marshall_1 = require("@waves/marshall");
const waves_crypto_1 = require("@waves/waves-crypto");
const transactions_1 = require("./transactions");
const issue_1 = require("./transactions/issue");
const transfer_1 = require("./transactions/transfer");
const reissue_1 = require("./transactions/reissue");
const burn_1 = require("./transactions/burn");
const lease_1 = require("./transactions/lease");
const cancel_lease_1 = require("./transactions/cancel-lease");
const data_1 = require("./transactions/data");
const mass_transfer_1 = require("./transactions/mass-transfer");
const alias_1 = require("./transactions/alias");
const set_script_1 = require("./transactions/set-script");
const generic_1 = require("./generic");
const set_asset_script_1 = require("./transactions/set-asset-script");
const exchange_1 = require("./transactions/exchange");
const sponsorship_1 = require("./transactions/sponsorship");
const invoke_script_1 = require("./transactions/invoke-script");
exports.txTypeMap = {
    [transactions_1.TRANSACTION_TYPE.ISSUE]: { sign: (x, seed) => issue_1.issue(x, seed) },
    [transactions_1.TRANSACTION_TYPE.TRANSFER]: { sign: (x, seed) => transfer_1.transfer(x, seed) },
    [transactions_1.TRANSACTION_TYPE.REISSUE]: { sign: (x, seed) => reissue_1.reissue(x, seed) },
    [transactions_1.TRANSACTION_TYPE.BURN]: { sign: (x, seed) => burn_1.burn(x, seed) },
    [transactions_1.TRANSACTION_TYPE.LEASE]: { sign: (x, seed) => lease_1.lease(x, seed) },
    [transactions_1.TRANSACTION_TYPE.CANCEL_LEASE]: { sign: (x, seed) => cancel_lease_1.cancelLease(x, seed) },
    [transactions_1.TRANSACTION_TYPE.ALIAS]: { sign: (x, seed) => alias_1.alias(x, seed) },
    [transactions_1.TRANSACTION_TYPE.MASS_TRANSFER]: { sign: (x, seed) => mass_transfer_1.massTransfer(x, seed) },
    [transactions_1.TRANSACTION_TYPE.DATA]: { sign: (x, seed) => data_1.data(x, seed) },
    [transactions_1.TRANSACTION_TYPE.SET_SCRIPT]: { sign: (x, seed) => set_script_1.setScript(x, seed) },
    [transactions_1.TRANSACTION_TYPE.SET_ASSET_SCRIPT]: { sign: (x, seed) => set_asset_script_1.setAssetScript(x, seed) },
    [transactions_1.TRANSACTION_TYPE.SPONSORSHIP]: { sign: (x, seed) => sponsorship_1.sponsorship(x, seed) },
    [transactions_1.TRANSACTION_TYPE.EXCHANGE]: { sign: (x, seed) => exchange_1.exchange(x, seed) },
    [transactions_1.TRANSACTION_TYPE.INVOKE_SCRIPT]: { sign: (x, seed) => invoke_script_1.invokeScript(x, seed) },
};
/**
 * Signs arbitrary transaction. Can also create signed transaction if provided params have type field
 * @param tx
 * @param seed
 */
function signTx(tx, seed) {
    if (!exports.txTypeMap[tx.type])
        throw new Error(`Unknown tx type: ${tx.type}`);
    return exports.txTypeMap[tx.type].sign(tx, seed);
}
exports.signTx = signTx;
/**
 * Converts transaction or order object to Uint8Array
 * @param obj transaction or order
 */
function serialize(obj) {
    if (generic_1.isOrder(obj))
        return marshall_1.binary.serializeOrder(obj);
    return marshall_1.binary.serializeTx(obj);
}
exports.serialize = serialize;
/**
 * Verifies signature of transaction or order
 * @param obj
 * @param proofN - proof index. Takes first proof by default
 * @param publicKey - takes senderPublicKey by default
 */
function verify(obj, proofN = 0, publicKey) {
    publicKey = publicKey || obj.senderPublicKey;
    const bytes = serialize(obj);
    const signature = obj.version == null ? obj.signature : obj.proofs[proofN];
    return waves_crypto_1.verifySignature(publicKey, bytes, signature);
}
exports.verify = verify;
/**
 * Sends transaction to waves node
 * @param tx - transaction to send
 * @param nodeUrl - node address to send tx to. E.g. https://nodes.wavesplatform.com/
 */
function broadcast(tx, nodeUrl) {
    return axios_1.default.post('transactions/broadcast', marshall_1.json.stringifyTx(tx), {
        baseURL: nodeUrl,
        headers: { 'content-type': 'application/json' },
    })
        .then(x => x.data)
        .catch(e => Promise.reject(e.response && e.response.status === 400 ? new Error(e.response.data.message) : e));
}
exports.broadcast = broadcast;
/**
 * Retrieve information about waves account balance
 * @param address - waves address as base58 string
 * @param nodeUrl - node address to ask balance from. E.g. https://nodes.wavesplatform.com/
 */
function addressBalance(address, nodeUrl) {
    return axios_1.default.get(`addresses/balance/${address}`, { baseURL: nodeUrl })
        .then(x => x.data && x.data.balance)
        .catch(e => Promise.reject(e.response && e.response.status === 400 ? new Error(e.response.data.message) : e));
}
exports.addressBalance = addressBalance;
/**
 * Get data from account dictionary by key
 * @param address - waves address as base58 string
 * @param key - dictionary key
 * @param nodeUrl - node address to ask balance from. E.g. https://nodes.wavesplatform.com/
 */
function addressDataByKey(address, key, nodeUrl) {
    return axios_1.default.get(`addresses/data/${address}/${key}`, { baseURL: nodeUrl })
        .then(x => {
        switch (x.data.type) {
            case 'integer':
            case 'string':
                return x.data.value;
            case 'binary':
                return marshall_1.serializePrimitives.BASE64_STRING(x.data.value);
            case 'boolean':
                return x.data.value === 'true';
        }
        return null;
    })
        .catch(e => e.response && e.response.status === 404 ?
        Promise.resolve(null) :
        Promise.reject(e.response && e.response.status === 400 ? new Error(e.response.data.message) : e));
}
exports.addressDataByKey = addressDataByKey;
/**
 * Sends order to matcher
 * @param ord - transaction to send
 * @param matcherUrl - matcher address to send order to. E.g. https://matcher.wavesplatform.com/
 */
function submitOrder(ord, matcherUrl) {
    return axios_1.default.post('matcher/orderbook', marshall_1.json.stringifyOrder(ord), {
        baseURL: matcherUrl,
        headers: { 'content-type': 'application/json' },
    })
        .then(x => x.data)
        .catch(e => Promise.reject(e.response && e.response.status === 400 ? new Error(e.response.data.message) : e));
}
exports.submitOrder = submitOrder;
/**
 * Sends cancel order command to matcher. Since matcher api requires amountAsset and priceAsset in request url,
 * this function requires them as params
 * @param co - signed cancelOrder object
 * @param amountAsset - amount asset of the order to be canceled
 * @param priceAsset - price asset of the order to be canceled
 * @param matcherUrl - matcher address to send order cancel to. E.g. https://matcher.wavesplatform.com/
 */
function cancelSubmittedOrder(co, amountAsset, priceAsset, matcherUrl) {
    return axios_1.default.post(`matcher/orderbook/${amountAsset || 'WAVES'}/${priceAsset || 'WAVES'}/cancel`, JSON.stringify(co), {
        baseURL: matcherUrl,
        headers: { 'content-type': 'application/json' },
    })
        .then(x => x.data)
        .catch(e => Promise.reject(e.response && e.response.status === 400 ? new Error(e.response.data.message) : e));
}
exports.cancelSubmittedOrder = cancelSubmittedOrder;
//# sourceMappingURL=general.js.map