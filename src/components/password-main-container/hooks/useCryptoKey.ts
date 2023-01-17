import { useEffect, useState } from 'react';
import { CRYPTO_KEY_STORAGE_KEY } from '../../../constants';
import { base64StringToUint8Array, getKey } from '../../../utils/crypto';
import * as storage from '../../../utils/storage';

type CryptoKeyState = { type: 'KEY_SET'; key: CryptoKey } | { type: 'KEY_NOT_SET' };

export function useCryptoKey() {
    const [cryptoKeyState, setCryptoKeyState] = useState<CryptoKeyState>({ type: 'KEY_NOT_SET' });

    useEffect(() => {
        const rawCryptoKey = storage.getItem<string>(CRYPTO_KEY_STORAGE_KEY);

        if (!rawCryptoKey) {
            setCryptoKeyState({ type: 'KEY_NOT_SET' });
            return;
        }

        getKey(base64StringToUint8Array(rawCryptoKey)).then((storedKey) => {
            setCryptoKeyState({ type: 'KEY_SET', key: storedKey });
        });
    }, []);

    function setKey(newKey: CryptoKey) {
        setCryptoKeyState({ type: 'KEY_SET', key: newKey });
    }

    function removeKey() {
        storage.removeItem(CRYPTO_KEY_STORAGE_KEY);
        setCryptoKeyState({ type: 'KEY_NOT_SET' });
    }

    return {
        cryptoKeyState,
        setCryptoKeyState,
        setKey,
        removeKey,
    };
}
