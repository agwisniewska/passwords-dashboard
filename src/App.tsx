import { PasswordLockedContainer } from './features/password-locked-container/PasswordLockedContainer';
import { PasswordMainContainer } from './features/password-main-container/PasswordMainContainer';
import { useCryptoKey } from './features/password-main-container/hooks/useCryptoKey';

export default function App() {
    const { cryptoKeyState, setKey, removeKey } = useCryptoKey();

    switch (cryptoKeyState.type) {
        case 'KEY_NOT_SET':
            return <PasswordLockedContainer onLogin={setKey} />;
        case 'KEY_SET':
            return <PasswordMainContainer onLogout={removeKey} cryptoKey={cryptoKeyState.key} />;
    }
}
