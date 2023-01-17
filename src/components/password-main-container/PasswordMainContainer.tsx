import { PasswordMainContainerHeader } from './header/PasswordMainContainerHeader';
import { usePasswords } from './hooks/usePasswords';
import classes from './PasswordMainContainer.module.css';
import { useEffect } from 'react';
import { encrypt } from '../../utils/crypto';
import * as storage from '../../utils/storage';
import { PASSWORDS_STORAGE_KEY } from '../../constants';
import Passwords from './passwords-list/Passwords';
import NoPasswords from './no-passwords/NoPasswords';
import NoPasswordSelected from './no-password-selected/NoPasswordSelected';
import { PasswordEdit } from './password-edit/PasswordEdit';

type PasswordMainContainerProps = {
    onLogout: () => void;
    cryptoKey: CryptoKey;
}

export function PasswordMainContainer({ cryptoKey, onLogout }: PasswordMainContainerProps) {
    const {
        state,
        amountOfVulnerablePasswords,
        handleCreate,
        hydratePasswords,
        handleCancel,
        handleDelete,
        handleSave,
        handleSelect,
    } = usePasswords();

    useEffect(() => {
        hydratePasswords(cryptoKey);
    }, [cryptoKey]);

    useEffect(() => {
        sync();
    }, [state.passwords]);

    async function sync() {
        if (!cryptoKey) {
            return;
        }

        const data = JSON.stringify(state.passwords);
        const encryptedPasswords = await encrypt(cryptoKey, data);
        storage.setItem(PASSWORDS_STORAGE_KEY, JSON.stringify(encryptedPasswords));
    }

    return (
        <div className={classes.container}>
            <div className={classes.headerArea}>
                <PasswordMainContainerHeader
                    createNewPassword={handleCreate}
                    onLogout={onLogout}
                    amountOfVulnerablePasswords={amountOfVulnerablePasswords}
                />
            </div>
            <div className={classes.passwordsArea}>
                {Object.values(state.passwords).length > 0 ? (
                    <Passwords passwords={state.passwords} onSelectPassword={handleSelect} selectedPassword={state.type === 'SELECT_PASSWORD' ? state.password : null}/>
                ) : (
                    <NoPasswords />
                )}
            </div>
            <div className={classes.passwordArea}>
                <>
                    {state.password ? (
                        <PasswordEdit
                            isSelected={state.type === 'SELECT_PASSWORD'}
                            password={state.password}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onDelete={() => handleDelete(state.password.id)}
                        />
                    ) : (
                        <NoPasswordSelected />
                    )}
                </>
            </div>
        </div>
    );
}
