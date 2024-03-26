import { ISetScriptTransaction, ISetScriptParams, WithId, WithSender } from '../transactions';
import { TSeedTypes } from '../types';
/**
 * Creates and signs [[ISetScriptTransaction]].
 *
 * If no senderPublicKey is set, it will be derived from seed.
 * In case sender and signer are different, you need to pass senderPublicKey explicitly.
 *
 * You can use this function with multiple seeds. In this case it will sign transaction accordingly and will add one proof per seed.
 * Also you can use already formed [[ISetScriptTransaction]] instead of params.
 *
 * ### Usage
 * ```js
 * const { setScript } = require('@waves/waves-transactions')
 *
 * const seed = 'example seed phrase'
 *
 * const params = {
 *   script: 'AQa3b8tH', //true
 *   //senderPublicKey: 'by default derived from seed',
 *   //timestamp: Date.now(),
 *   //fee: 100000,
 *   //chainId: 'W'
 * }
 *
 * const signedSetScriptTx = setScript(params, seed)
 * ```
 * ### Output
 * ```json
 * {
 *   "id": "8qit2xkqswkz4jG59Jitdz8xdopdqRRRMkDEr1uvCH5p",
 *   "type": 13,
 *   "version": 1,
 *   "senderPublicKey": "3SU7zKraQF8tQAF8Ho75MSVCBfirgaQviFXnseEw4PYg",
 *   "chainId": 87,
 *   "fee": 1000000,
 *   "timestamp": 1554389590761,
 *   "proofs": [
 *     "4inp2B1noohvso64L5KPNEnABHV9jjexqJncg8WScuiW47YfehTcfzTsSRcRCTXJbv2nybmAkeMHG58yBPifh9au"
 *   ],
 *   "script": "base64:AQa3b8tH"
 * }
 * ```
 *
 */
export declare function setScript(params: ISetScriptParams, seed: TSeedTypes): ISetScriptTransaction & WithId;
export declare function setScript(paramsOrTx: ISetScriptParams & WithSender | ISetScriptTransaction, seed?: TSeedTypes): ISetScriptTransaction & WithId;
