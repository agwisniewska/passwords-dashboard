import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { UrlList } from './UrlList';
import { Password } from '../../features/password-main-container/types';
import Icon from '../../atoms/icon/Icon';
import LabelledIconButton from './LabelledIconButton';
import classes from './PasswordEdit.module.css';
import Labelled from '../../atoms/label/Labelled';
import Button from '../../atoms/button/Button';
import Input from '../../atoms/input/Input';
import TextArea from '../../atoms/input/TextArea';

type PasswordEditProps = {
    isSelected: boolean;
    password: Password;
    onSave: (password: Password) => void;
    onDelete: () => void;
    onCancel: () => void;
};

export function PasswordEdit({ password, onSave, onDelete, onCancel, isSelected }: PasswordEditProps) {
    const [isEdited, setIsEdited] = useState(false);
    const [values, setValues] = useState<Password>(password);
    const [urlInput, setUrlInput] = useState('');

    useEffect(() => {
        setValues(password);

        if (!password.lastModifiedAt) {
            setIsEdited(true);
        }
    }, [password]);

    function change(partial: { [x: string]: string | string[] }) {
        setValues((values) => ({
            ...values,
            ...partial,
        }));
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) {
        change({ [e.target.name]: e.target.value });
    }

    function handleSaveClick() {
        setIsEdited(false);
        onSave(password);
    }

    function handleDeleteClick() {
        onDelete();
    }

    function handleCancelClick() {
        onCancel();
    }

    function handleEditClick() {
        setIsEdited(true);
    }

    function handleUrlAdd() {
        const urls = values.url || [];

        urls.unshift(urlInput);

        change({ url: urls });

        setUrlInput('');
    }

    const handleUrlDelete = useCallback((index: number) => {
        const urls = values.url || [];
        urls.splice(index, 1);
        change({ url: urls });
    }, []);

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>
                {isEdited && (
                    <input
                        name="name"
                        autoFocus
                        className={classes.titleInput}
                        value={values.name}
                        onChange={handleChange}
                    />
                )}
                {!isEdited && <>{values.name}</>}
            </h2>

            <div className={classes.content}>
                <Labelled label="description">
                    {isEdited && <TextArea name="description" value={values?.description} onChange={handleChange} />}
                    {!isEdited && <> {values.description} </>}
                </Labelled>

                <Labelled label="value">
                    {isEdited && <Input name="value" value={values.value} onChange={handleChange} />}
                    {!isEdited && <> {values.value}</>}
                </Labelled>
                <Labelled label="url">
                    {isEdited && (
                        <div>
                            <Input value={urlInput} onChange={(e) => setUrlInput(e.target.value)} />
                            <Button onClick={handleUrlAdd}>Add</Button>
                        </div>
                    )}

                    <UrlList
                        urls={values.url}
                        icon={isEdited ? <Icon size="small" className="fas fa-times" /> : null}
                        onDelete={handleUrlDelete}
                        onChange={handleChange}
                    />
                </Labelled>
            </div>
            <div className={classes.controls}>
                <LabelledIconButton
                    label="Cancel"
                    className={classes.cancel}
                    onClick={handleCancelClick}
                    icon={<Icon size="small" className="fas fa-times" />}
                />

                {isEdited && (
                    <LabelledIconButton
                        label="Save"
                        className={classes.save}
                        onClick={handleSaveClick}
                        icon={<Icon size="small" className="fas fa-save" />}
                    />
                )}
                {isSelected && !isEdited && (
                    <div className={classes.controls}>
                        <LabelledIconButton
                            label="Edit"
                            className={classes.edit}
                            onClick={handleEditClick}
                            icon={<Icon size="small" className="fas fa-pen" />}
                        />
                    </div>
                )}

                <LabelledIconButton
                    label="Delete"
                    className={classes.delete}
                    onClick={handleDeleteClick}
                    icon={<Icon size="small" className="fas fa-trash" />}
                />
            </div>
        </div>
    );
}
