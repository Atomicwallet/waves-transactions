import { ICancelLeaseTransaction, ICancelLeaseParams, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
/**
 * Creates and signs [[ICancelLeaseTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[ICancelLeaseTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { cancelLease } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * const params = {
 *   leaseId: '2fYhSNrXpyKgbtHzh5tnpvnQYuL7JpBFMBthPSGFrqqg',
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000,
 *   //chainId: 'W'
 * }
 *
 * const signedCancelLeaseTx = cancelLease(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "7PnZHV1jxUDXXrV6RBkzSpi5KevJSQX5gaBvXuhuZSo",
 *   "type": 9,
 *   "version": 2,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "leaseId": "2fYhSNrXpyKgbtHzh5tnpvnQYuL7JpBFMBthPSGFrqqg",
 *   "fee": 100000,
 *   "timestamp": 1554389590625,
 *   "chainId": 87,
 *   "proofs": [
 *     "4nGdKJ6hAsZ76g61kpXzsJDBsc9XeSsiCimxu9asVoqHY5Kx4bVmJBjybhqbLTqe6rAd3vSXdvH95CLatkKqvVSc"
 *   ]
 * }
 * ```
 *
 */
export declare function cancelLease(params: ICancelLeaseParams, seed: TSeedTypes): ICancelLeaseTransaction & WithId;
export declare function cancelLease(paramsOrTx: ICancelLeaseParams & WithSender | ICancelLeaseTransaction, seed?: TSeedTypes): ICancelLeaseTransaction & WithId;
