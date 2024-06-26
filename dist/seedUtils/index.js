"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const waves_crypto_1 = require("@waves/waves-crypto");
const dictionary_1 = __importDefault(require("./dictionary"));
const marshall_1 = require("@waves/marshall");
class Seed {
    constructor(phrase) {
        if (phrase.length < 12) {
            throw new Error('Your seed length is less than allowed in config');
        }
        this.phrase = phrase;
        this.address = waves_crypto_1.address(phrase);
        this.keyPair = {
            privateKey: waves_crypto_1.privateKey(phrase),
            publicKey: waves_crypto_1.publicKey(phrase),
        };
        Object.freeze(this);
        Object.freeze(this.keyPair);
    }
    encrypt(password, encryptionRounds) {
        return Seed.encryptSeedPhrase(this.phrase, password, encryptionRounds);
    }
    static encryptSeedPhrase(seedPhrase, password, encryptionRounds = 5000) {
        if (password && password.length < 8) {
            // logger.warn('Your password may be too weak');
        }
        if (encryptionRounds < 1000) {
            // logger.warn('Encryption rounds may be too few');
        }
        if (seedPhrase.length < 12) {
            throw new Error('The seed phrase you are trying to encrypt is too short');
        }
        return encryptSeed(seedPhrase, password, encryptionRounds);
    }
    static decryptSeedPhrase(encryptedSeedPhrase, password, encryptionRounds = 5000) {
        const wrongPasswordMessage = 'The password is wrong';
        let phrase;
        try {
            phrase = decryptSeed(encryptedSeedPhrase, password, encryptionRounds);
        }
        catch (e) {
            throw new Error(wrongPasswordMessage);
        }
        if (phrase === '' || phrase.length < 12) {
            throw new Error(wrongPasswordMessage);
        }
        return phrase;
    }
    static create(words = 15) {
        const phrase = generateNewSeed(words);
        const minimumSeedLength = 12;
        if (phrase.length < minimumSeedLength) {
            // If you see that error you should increase the number of words in the generated seed
            throw new Error(`The resulted seed length is less than the minimum length (${minimumSeedLength})`);
        }
        return new Seed(phrase);
    }
    static fromExistingPhrase(phrase) {
        const minimumSeedLength = 12;
        if (phrase.length < minimumSeedLength) {
            // If you see that error you should increase the number of words or set it lower in the config
            throw new Error(`The resulted seed length is less than the minimum length (${minimumSeedLength})`);
        }
        return new Seed(phrase);
    }
}
exports.Seed = Seed;
function generateNewSeed(length) {
    const random = Array.from({ length })
        .map(_ => waves_crypto_1.randomUint8Array(4)
        .reduce((acc, next, i) => acc + next * Math.pow(2, (i * 4)), 0));
    const wordCount = dictionary_1.default.length;
    const phrase = [];
    for (let i = 0; i < length; i++) {
        const wordIndex = random[i] % wordCount;
        phrase.push(dictionary_1.default[wordIndex]);
    }
    return phrase.join(' ');
}
exports.generateNewSeed = generateNewSeed;
function strengthenPassword(password, rounds = 5000) {
    while (rounds--) {
        const bytes = marshall_1.serializePrimitives.STRING(password);
        password = waves_crypto_1.byteArrayToHexString(waves_crypto_1.sha256(bytes));
    }
    return password;
}
exports.strengthenPassword = strengthenPassword;
function encryptSeed(seed, password, encryptionRounds) {
    if (!seed || typeof seed !== 'string') {
        throw new Error('Seed is required');
    }
    if (!password || typeof password !== 'string') {
        throw new Error('Password is required');
    }
    password = strengthenPassword(password, encryptionRounds);
    return waves_crypto_1.libs.CryptoJS.AES.encrypt(seed, password).toString();
}
exports.encryptSeed = encryptSeed;
function decryptSeed(encryptedSeed, password, encryptionRounds) {
    if (!encryptedSeed || typeof encryptedSeed !== 'string') {
        throw new Error('Encrypted seed is required');
    }
    if (!password || typeof password !== 'string') {
        throw new Error('Password is required');
    }
    password = strengthenPassword(password, encryptionRounds);
    const hexSeed = waves_crypto_1.libs.CryptoJS.AES.decrypt(encryptedSeed, password);
    const byteSeed = waves_crypto_1.hexStringToByteArray(hexSeed.toString());
    return marshall_1.parsePrimitives.P_STRING_FIXED(byteSeed.length)(Uint8Array.from(byteSeed)).value;
}
exports.decryptSeed = decryptSeed;
//# sourceMappingURL=index.js.map