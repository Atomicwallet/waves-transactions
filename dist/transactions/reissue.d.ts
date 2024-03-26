import { IReissueTransaction, IReissueParams, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
/**
 * Creates and signs [[IReissueTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[IReissueTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { reissue } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * const params = {
 *   quantity: 10000,
 *   assetId: '3toqCSpAHShatE75UFKxqymuWFr8nxuxD7UcLjdxVFLx',
 *   reissuable: false,
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000000,
 *   //chainId: 'W'
 * }
 *
 * const signedReissueTx = reissue(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "9oXKPVgRAw9A3rQwVuPfGf3yfTsBipH5KgS764YUnM25",
 *   "type": 5,
 *   "version": 2,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "assetId": "3toqCSpAHShatE75UFKxqymuWFr8nxuxD7UcLjdxVFLx",
 *   "quantity": 10000,
 *   "reissuable": false,
 *   "chainId": 87,
 *   "fee": 100000000,
 *   "timestamp": 1554389590713,
 *   "proofs": [
 *     "3EGQ15xhsgHiHQYsREDgsoFd7nw5Ki4cZRE1vSF9jzmDAuacwCF8Zawu4JSEcCCFZx6JZzmWBGGf9emgsSCA9DgJ"
 *   ]
 * }
 * ```
 *
 */
export declare function reissue(paramsOrTx: IReissueParams, seed: TSeedTypes): IReissueTransaction & WithId;
export declare function reissue(paramsOrTx: IReissueParams & WithSender | IReissueTransaction, seed?: TSeedTypes): IReissueTransaction & WithId;
