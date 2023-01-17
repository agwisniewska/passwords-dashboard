import { Password } from '../types';

export function duplicateUrlsAmongPasswords(newPassword: Password, passwords: { [id: string]: Password }) {
    const passwordsValues = Object.values(passwords).map((value) => value);
    return passwordsValues
        .filter((value) => value.id !== newPassword.id)
        .filter((value) => {
            const [set1, set2] = [new Set(value.url), new Set(newPassword.url)];
            const common = [...set1].filter((x) => set2.has(x));

            if (common.length) {
                return value;
            }
            return null
        });
}
