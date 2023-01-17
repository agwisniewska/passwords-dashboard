import { useState, FormEvent, ChangeEvent } from 'react';
import { validate } from '../../../utils/crypto';
import { assertState } from '../../password-main-container/utils/assert-state';

type MasterPasswordState =
    | {
          type: 'PASSWORD_NOT_SET';
          password: '';
      }
    | {
          type: 'PASSWORD_SET';
          password: string;
      };

export function useMasterPassword(onLogin: (password: CryptoKey) => void) {
    const [state, setState] = useState<MasterPasswordState>({ type: 'PASSWORD_NOT_SET', password: '' });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        assertState(state, 'PASSWORD_SET');

        validate(state.password, onLogin);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({ type: 'PASSWORD_SET', password: e.target.value });
    };

    return {
        handleChange,
        handleSubmit,
        state,
    };
}
