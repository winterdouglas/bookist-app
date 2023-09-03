import { MMKV } from "react-native-mmkv";

export type StorageType = {
  getItem: (key: string) => Promise<string | undefined>;
  setItem: (key: string, value: string) => Promise<boolean>;
  load: <T>(key: string) => T | undefined;
  save: <T>(key: string, value: T) => boolean;
  removeItem: (key: string) => Promise<void>;
  clear: () => void;
};

export const createStorage = (_storage?: MMKV): StorageType => {
  const storage = _storage ?? new MMKV();

  return {
    /**
     * Loads a string from storage.
     *
     * @param key The key to fetch.
     */
    getItem: (key: string): Promise<string | undefined> => {
      try {
        return Promise.resolve(storage.getString(key));
      } catch {
        // not sure why this would fail... even reading the RN docs I'm unclear
        return Promise.resolve(undefined);
      }
    },

    /**
     * Saves a string to storage.
     *
     * @param key The key to fetch.
     * @param value The value to store.
     */
    setItem: (key: string, value: string): Promise<boolean> => {
      try {
        storage.set(key, value);
        return Promise.resolve(true);
      } catch {
        return Promise.resolve(false);
      }
    },

    /**
     * Loads something from storage and runs it thru JSON.parse.
     *
     * @param key The key to fetch.
     */
    load: <T>(key: string): T | undefined => {
      try {
        const value = storage.getString(key);
        if (!value) {
          return;
        }
        return JSON.parse(value);
      } catch {
        return undefined;
      }
    },

    /**
     * Saves an object to storage.
     *
     * @param key The key to fetch.
     * @param value The value to store.
     */
    save: <T>(key: string, value: T): boolean => {
      try {
        storage.set(key, JSON.stringify(value));
        return true;
      } catch {
        return false;
      }
    },

    /**
     * Removes something from storage.
     *
     * @param key The key to kill.
     */
    removeItem: (key: string): Promise<void> => {
      try {
        storage.delete(key);
      } catch {}

      return Promise.resolve();
    },

    /**
     * Burn it all to the ground.
     */
    clear: (): void => {
      try {
        storage.clearAll();
      } catch {}
    },
  };
};

export const Storage = createStorage();
