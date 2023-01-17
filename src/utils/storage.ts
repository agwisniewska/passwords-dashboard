const currentLocalStorage: { [key: string]: any } = {};

export function setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getItem<V>(key: string): V {
    if (currentLocalStorage[key]) {
        return currentLocalStorage[key];
    }

    const storedValue = localStorage.getItem(key);

    return storedValue && JSON.parse(storedValue);
}

export function removeItem(key: string) {
    localStorage.removeItem(key);
}
