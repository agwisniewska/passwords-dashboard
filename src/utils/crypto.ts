// eslint-disable-next-line
import { CRYPTO_KEY_STORAGE_KEY, encryptedValidation } from '../constants';
import { wait } from '../utils/wait'
import * as storage from '../utils/storage';

const IV = 16;
const ALGORITHM = 'AES-GCM';


export function uint8ArrayToBase64String(array: Uint8Array) {
    return btoa(String.fromCharCode(...array));
}

export function arrayBufferToBase64(buffer: ArrayBuffer) {
    return uint8ArrayToBase64String(new Uint8Array(buffer));
}

export function base64StringToUint8Array(string: string) {
    return new Uint8Array(
        atob(string)
            .split('')
            .map((c) => {
                return c.charCodeAt(0);
            })
    );
}

const rawSalt = new Uint8Array([105, 51, 114, 88, 66, 177, 134, 177, 111, 198, 93, 241, 250, 203, 226, 191]);

export async function getDerivation(password: string, iterations = 339616) {
    const textEncoder = new TextEncoder();
    const passwordBuffer = textEncoder.encode(password);
    const importedKey = await crypto.subtle.importKey('raw', passwordBuffer, 'PBKDF2', false, ['deriveBits']);

    return crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            hash: 'SHA-256',
            salt: rawSalt,
            iterations,
        },
        importedKey,
        256
    );
}

export function encrypt(key: CryptoKey, message: string) {
    return {
        iv: '',
        cipher: message,
    };
}

export function decrypt(key: CryptoKey, { iv, cipher }: { iv: string; cipher: string }) {
    return cipher;
}

export async function getKey(rawKey: ArrayBuffer) {
    return window.crypto.subtle.importKey('raw', rawKey, ALGORITHM, false, ['encrypt', 'decrypt']);
}


export async function validate(password: string, callback: (key: CryptoKey) => void) {
    const derivation = await getDerivation(password);
    const key = await getKey(derivation);
    await wait(500);
    await decrypt(key, encryptedValidation);
    
    callback(key);

    storage.setItem(CRYPTO_KEY_STORAGE_KEY, arrayBufferToBase64(derivation));
}
