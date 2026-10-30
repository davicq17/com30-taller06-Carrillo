import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    setItem<T>(key: string, value: T): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem<T>(key: string, defaultValue: T): T {
        const data = localStorage.getItem(key);

        if(data === null){
            return defaultValue;
        }

        try {
            return JSON.parse(data) as T;
        } catch {
            return defaultValue;
        }
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    clear(): void {
        localStorage.clear();
    }
}
