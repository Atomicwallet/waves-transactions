import { IBurnTransaction, IBurnParams, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
/**
 * Creates and signs [[IBurnTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[IBurnTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { burn } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * const params = {
 *   assetId: '4uK8i4ThRGbehENwa6MxyLtxAjAo1Rj9fduborGExarC',
 *   quantity: 100,
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000,
 *   //chainId: 'W',
 * }
 *
 * const signedBurnTx = burn(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "DEWSE1hGX271vrTRXnmidE6fWyHMxsY9BX4cKkgKJqsg",
 *   "type": 6,
 *   "version": 2,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "assetId": "4uK8i4ThRGbehENwa6MxyLtxAjAo1Rj9fduborGExarC",
 *   "quantity": 100,
 *   "chainId": 87,
 *   "fee": 100000,
 *   "timestamp": 1554389590596,
 *   "proofs": [
 *     "2EKVDMzTdLWLPnwQhGaJeWHC3XsdD24d7No3ezSbqGePkW5ToNRs2PTdiNoyvFy43zAZhj2rNDGE88qA61oiBXJF"
 *   ]
 * }
 * ```
 *
 */
export declare function burn(params: IBurnParams, seed: TSeedTypes): IBurnTransaction & WithId;
export declare function burn(paramsOrTx: IBurnParams & WithSender | IBurnTransaction, seed?: TSeedTypes): IBurnTransaction & WithId;
