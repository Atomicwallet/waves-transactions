import { ITransferTransaction, ITransferParams, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
/**
 * Creates and signs [[ITransferTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[ITransferTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { transfer } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * //Transfering 1 WAVES
 * const params = {
 *   amount: 100000000,
 *   recipient: '3P23fi1qfVw6RVDn4CH2a5nNouEtWNQ4THs',
 *   //feeAssetId: undefined
 *   //assetId: undefined
 *   //attachment: undefined
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000,
 * }
 *
 * const signedTransferTx = transfer(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "8qX7aMi17EbZ25Kk9DdKcV4JnuTszaGEwcRXsFad6VSH",
 *   "type": 4,
 *   "version": 2,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "recipient": "3P23fi1qfVw6RVDn4CH2a5nNouEtWNQ4THs",
 *   "amount": 100000000,
 *   "attachment": "",
 *   "fee": 100000,
 *   "timestamp": 1554389590735,
 *   "proofs": [
 *     "rfvBojTPCjwEefQ5wuufis34u3NYmfb8MCivbsaatKAbmm7xCwV8s2f8VWxTs6TR5RepXhQaLaEV3u34SNDSek9"
 *   ]
 * }
 * ```
 *
 */
export declare function transfer(params: ITransferParams, seed: TSeedTypes): ITransferTransaction & WithId;
export declare function transfer(paramsOrTx: ITransferParams & WithSender | ITransferTransaction, seed?: TSeedTypes): ITransferTransaction & WithId;
