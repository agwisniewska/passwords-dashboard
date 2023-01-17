import { PasswordLockedContainer } from './components/password-locked-container/PasswordLockedContainer';
import { PasswordMainContainer } from './components/password-main-container/PasswordMainContainer';
import { useCryptoKey } from './components/password-main-container/hooks/useCryptoKey';

export default function App() {
    const { cryptoKeyState, setKey, removeKey } = useCryptoKey();

    switch (cryptoKeyState.type) {
        case 'KEY_NOT_SET':
            return <PasswordLockedContainer onLogin={setKey} />;
        case 'KEY_SET':
            return <PasswordMainContainer onLogout={removeKey} cryptoKey={cryptoKeyState.key} />;
    }
}
