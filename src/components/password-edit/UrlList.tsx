import { ChangeEvent, ReactNode, memo } from 'react';
import List from '../../atoms/list/List';
import ListItem from '../../atoms/list/list-item/ListItem';
import clsx from 'clsx';
import classes from './PasswordEdit.module.css';

type UrlListProps = {
    urls: string[];
    icon: ReactNode;
    onDelete: (index: number) => void;
    onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
}

export const UrlList = memo(({ urls, icon, onChange, onDelete }: UrlListProps) => (
    <List className={classes.urlList}>
        {urls?.map((urlEntry, index) => (
            <ListItem dense className={classes.urlListItem}>
                <input autoFocus value={urlEntry} onChange={onChange} />
                <span onClick={() => onDelete(index)}>{icon}</span>
            </ListItem>
        ))}
        {urls?.length === 0 && (
            <ListItem dense className={clsx(classes.urlListItem, classes.urlListItemEmpty)}>
                No urls added
            </ListItem>
        )}
    </List>
));
