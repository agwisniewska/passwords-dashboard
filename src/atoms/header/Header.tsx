import React from 'react';
import clsx from 'clsx';

import classes from './Header.module.css';

export interface HeaderProps extends React.ComponentPropsWithoutRef<'header'> {};

function Header({ className, ...rest }: HeaderProps) {
    const rootClassName = clsx(classes.root, className);

    return <header className={rootClassName} {...rest} />;
}

export default Header;
