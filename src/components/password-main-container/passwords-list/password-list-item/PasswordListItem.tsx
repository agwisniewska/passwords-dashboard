import React from 'react';
import Icon from '../../../../atoms/icon/Icon';
import clsx from 'clsx';

import ListItem from '../../../../atoms/list/list-item/ListItem';
import classes from './PasswordListItem.module.css';

type PasswordListItemProps = {
    id: string;
    name: string;
    selected: boolean;
    vulnerable: boolean;

    onClick: () => void;
};

function PasswordListItem({ name, id, vulnerable, selected, onClick }: PasswordListItemProps) {
    return (
        <ListItem
            key={`item${id}`}
            clickable
            className={clsx(classes.listItem, { [classes.selected]: selected })}
            onClick={onClick}
        >
            {name}
            {vulnerable && <Icon size="small" className="fas fa-exclamation-triangle" />}
        </ListItem>
    );
}

export default React.memo(PasswordListItem);
