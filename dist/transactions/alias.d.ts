import { IAliasParams, IAliasTransaction, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
/**
 * Creates and signs [[IAliasTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[IAliasTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { alias } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * const params = {
 *   alias: 'MyNewAlias',
 *   chainId: 'W',
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000,
 * }
 *
 * const signedAliasTx = alias(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "24RbQnKAqB17J2Fs5r1JBWVcrXcZiYUeYpkXQpr6pS8c",
 *   "type": 10,
 *   "version": 2,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "alias": "MyNewAlias",
 *   "fee": 100000,
 *   "timestamp": 1554389590750,
 *   "chainId": 87,
 *   "proofs": [
 *     "3FDrGKD9njwSJBHJfU71P1Sp7jJPy99tJmprzGxJoB5WexTN2pKQZnpmPXTLAQKT3m8Za6SwqrW83J9soNm7CvFM"
 *   ]
 * }
 * ```
 *
 */
export declare function alias(params: IAliasParams, seed: TSeedTypes): IAliasTransaction & WithId;
export declare function alias(paramsOrTx: IAliasParams & WithSender | IAliasTransaction, seed?: TSeedTypes): IAliasTransaction & WithId;
