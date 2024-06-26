"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transactions_1 = require("../transactions");
const marshall_1 = require("@waves/marshall");
const waves_crypto_1 = require("@waves/waves-crypto");
const generic_1 = require("../generic");
function burn(paramsOrTx, seed) {
    const type = transactions_1.TRANSACTION_TYPE.BURN;
    const version = paramsOrTx.version || 2;
    const seedsAndIndexes = generic_1.convertToPairs(seed);
    const senderPublicKey = generic_1.getSenderPublicKey(seedsAndIndexes, paramsOrTx);
    const tx = {
        type,
        version,
        senderPublicKey,
        assetId: paramsOrTx.assetId,
        quantity: paramsOrTx.quantity,
        chainId: generic_1.networkByte(paramsOrTx.chainId, 87),
        fee: generic_1.fee(paramsOrTx, 100000),
        timestamp: paramsOrTx.timestamp || Date.now(),
        proofs: paramsOrTx.proofs || [],
        id: '',
    };
    const bytes = marshall_1.binary.serializeTx(tx);
    seedsAndIndexes.forEach(([s, i]) => generic_1.addProof(tx, waves_crypto_1.signBytes(bytes, s), i));
    tx.id = waves_crypto_1.hashBytes(bytes);
    return tx;
}
exports.burn = burn;
//# sourceMappingURL=burn.js.map