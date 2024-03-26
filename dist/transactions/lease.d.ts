import { ILeaseTransaction, ILeaseParams, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
/**
 * Creates and signs [[ILeaseTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[ILeaseTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { lease } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * const params = {
 *   amount: 100,
 *   recipient: '3P23fi1qfVw6RVDn4CH2a5nNouEtWNQ4THs',
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000,
 * }
 *
 * const signedLeaseTx = lease(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "DD6tEnvBhnecYuWEavWcugU88771g8QyrcNFgr5yhd53",
 *   "type": 8,
 *   "version": 2,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "amount": 100,
 *   "recipient": "3P23fi1qfVw6RVDn4CH2a5nNouEtWNQ4THs",
 *   "fee": 100000,
 *   "timestamp": 1554389590676,
 *   "proofs": [
 *     "3bgq42maSed2HsxdHpp9ZBFjhCabcV9kyJNbjwbf4RdUwzN5jnf2QtMjyrpGPfGSAH8ZAkYbGUQswwkhit8mJUfW"
 *   ]
 * }
 * ```
 *
 */
export declare function lease(params: ILeaseParams, seed: TSeedTypes): ILeaseTransaction & WithId;
export declare function lease(paramsOrTx: ILeaseParams & WithSender | ILeaseTransaction, seed?: TSeedTypes): ILeaseTransaction & WithId;
