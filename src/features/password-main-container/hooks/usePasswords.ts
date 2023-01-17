import { useState } from 'react';

import * as storage from '../../../utils/storage';

import { PASSWORDS_STORAGE_KEY } from '../../../constants';
import { Password } from '../types';
import { decrypt } from '../../../utils/crypto';
import { duplicateUrlsAmongPasswords } from '../utils/duplicate-urls-among-passwords';
import { createNewPassword } from '../utils/create-new-password';

type ManagingPasswordsState =
    | { type: 'LISTING'; passwords: { [key: string]: Password }; password: null }
    | {
          type: 'SELECT_PASSWORD';
          passwords: { [key: string]: Password };
          password: Password;
      };

export const usePasswords = () => {
    const [state, setState] = useState<ManagingPasswordsState>({
        type: 'LISTING',
        passwords: {},
        password: null,
    });

    async function hydratePasswords(newKey: CryptoKey) {
        const encryptedPasswords = JSON.parse(storage.getItem(PASSWORDS_STORAGE_KEY));
        if (!encryptedPasswords) {
            return;
        }
        const decryptedPasswords = JSON.parse(await decrypt(newKey, encryptedPasswords));
        setState({ type: 'LISTING', passwords: decryptedPasswords, password: null });
    }

    function handleCreate() {
        const newPassword = createNewPassword();
        setState({
            type: 'SELECT_PASSWORD',
            passwords: {
                ...(state.passwords || []),
                [newPassword.id]: newPassword,
            },
            password: newPassword,
        });
    }

    function handleSave(password: Password) {
        const nextPasswords = {
            ...state.passwords,
            [password.id]: {
                ...password,
                lastModifiedAt: Date.now(),
            },
        };

        console.log('passwords', state.passwords);

    



        const duplicateUrls = duplicateUrlsAmongPasswords(password, nextPasswords)

        if (duplicateUrls.length) {

            //  this should be a toast

            window.alert(duplicateUrls)
        }

        setState({ type: 'SELECT_PASSWORD', passwords: nextPasswords, password });
    }

    function handleDelete(id: string) {
        delete state.passwords[id];

        storage.setItem(PASSWORDS_STORAGE_KEY, state.passwords)
        setState({ type: 'LISTING', passwords: state.passwords, password: null });
    }

    async function handleSelect(id: string) {
        setState({
            type: 'SELECT_PASSWORD',
            passwords: state.passwords,
            password: state.passwords[id],
        });
    }

    function handleCancel() {
        setState({
            type: 'LISTING',
            passwords: state.passwords,
            password: null,
        });
    }

    const amountOfVulnerablePasswords = Object.keys(state.passwords).reduce<number>(
        (acc, key) => acc + +(state.passwords[key].value.length < 3),
        0
    );

    return {
        handleCancel,
        handleSelect,
        handleDelete,
        handleSave,
        handleCreate,
        hydratePasswords,
        amountOfVulnerablePasswords,
        state,
    };
};
