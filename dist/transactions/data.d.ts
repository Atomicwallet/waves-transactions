/// <reference types="node" />
import { IDataTransaction, IDataParams, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
export interface TypelessDataEntry {
    key: string;
    value: string | number | boolean | Buffer | Uint8Array | number[];
}
/**
 * Creates and signs [[IDataTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[IDataTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { data } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * const params = {
 *   data: [
 *     { key: 'integerVal', value: 1 },
 *     { key: 'booleanVal', value: true },
 *     { key: 'stringVal', value: 'hello' },
 *     { key: 'binaryVal', value: [1, 2, 3, 4] },
 *   ],
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000 + bytes.length * 100000
 * }
 *
 * const signedDataTx = data(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "5X1KAjtSuQbu1bmia7mBNbgF51r3kXBLyJRACMhnMSy7",
 *   "type": 12,
 *   "version": 1,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "fee": 100000,
 *   "timestamp": 1554389590642,
 *   "proofs": [
 *     "27iCaywqcdypV9R6BXmH8EZnwf8jvDvmS8NCeWm15ftkA3iwuoHcyVBNsK3McYDiTVbEye1RDsX9Y2kRcjjuFa21"
 *   ],
 *   "data": [
 *     {
 *       "type": "integer",
 *       "key": "integerVal",
 *       "value": 1
 *     },
 *     {
 *       "type": "boolean",
 *       "key": "booleanVal",
 *       "value": true
 *     },
 *     {
 *       "type": "string",
 *       "key": "stringVal",
 *       "value": "hello"
 *     },
 *     {
 *       "type": "binary",
 *       "key": "binaryVal",
 *       "value": "base64:AQIDBA=="
 *     }
 *   ]
 * }
 * ```
 *
 */
export declare function data(params: IDataParams, seed: TSeedTypes): IDataTransaction & WithId;
export declare function data(paramsOrTx: IDataParams & WithSender | IDataTransaction, seed?: TSeedTypes): IDataTransaction & WithId;
