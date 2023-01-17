import classes from './PasswordLockedContainer.module.css';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
import { useMasterPassword } from './hooks/useMasterPassword';

type PasswordLockedContainerProps = {
    onLogin: (password: CryptoKey) => void;
}

export const PasswordLockedContainer = ({ onLogin }: PasswordLockedContainerProps) => {
    const { state, handleSubmit, handleChange } = useMasterPassword(onLogin);

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h1>Enter your master password</h1>
                <label htmlFor="password-input">Password</label>
                <Input
                    id="password-input"
                    type="password"
                    value={state.password}
                    onChange={handleChange}
                    placeholder="***********"
                />
                <Button>Submit</Button>
            </form>
        </div>
    );
};
