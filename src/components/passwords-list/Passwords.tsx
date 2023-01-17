import List from '../../atoms/list/List';

import { Password } from '../../features/password-main-container/types';

import PasswordListItem from './password-list-item/PasswordListItem';

import classes from './Passwords.module.css';

type PasswordsProps = {
    onSelectPassword: (key: string) => void;
    selectedPassword: Password | null;
    passwords: { [key: string]: Password };
}

function Passwords({ passwords, onSelectPassword, selectedPassword }: PasswordsProps) {
    function renderListItem(password: Password) {
        return (
            <PasswordListItem
                key={password.id}
                id={password.id}
                name={password.name}
                vulnerable={password.value.length < 2}
                selected={password.id === selectedPassword?.id}
                onClick={() => onSelectPassword(password.id)}
            />
        );
    }

    return (
        <List className={classes.passwords}>
            {Object.values(passwords).map(renderListItem)}
        </List>
    );
}

export default Passwords;
