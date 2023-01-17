
import uniqid from 'uniqid';
import { Password } from '../types';

export function createNewPassword() {
    const id = uniqid();

    return {
        id,
        value: '',
        description: '',
        name: '',
        url: [],
        createdAt: undefined,
        lastModified: undefined
    } as Password;
}