import React from 'react';

import Button from '../../../atoms/button/Button';
import Header from '../../../atoms/header/Header';
import Icon from '../../../atoms/icon/Icon';
import classes from './PasswordMainContainerHeader.module.css';

type PasswordMainContainerHeaderProps = {
    amountOfVulnerablePasswords: number;
    onLogout: () => void;
    createNewPassword: () => void;
}

export function PasswordMainContainerHeader(props: PasswordMainContainerHeaderProps) {
    const { amountOfVulnerablePasswords, onLogout, createNewPassword } = props;

    return (
        <Header className={classes.header}>
            <Button disabled={false} onClick={createNewPassword}>
                New Password
            </Button>

            {amountOfVulnerablePasswords > 0 && (
                <span>
                    You have {amountOfVulnerablePasswords} vulnerable passwords
                    <Icon size="small" style={{ marginLeft: 8 }} className="fas fa-exclamation-triangle" />
                </span>
            )}

            <Button onClick={onLogout}>Logout</Button>
        </Header>
    );
}