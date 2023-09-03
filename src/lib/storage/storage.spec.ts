import { MMKV } from "react-native-mmkv";
import { createStorage, type StorageType } from "./storage";

// fixtures
const KEY = "Key";
const VALUE_OBJECT = { x: 1 };
const VALUE_STRING = JSON.stringify(VALUE_OBJECT);
const NEW_KEY = "New";

// MMKV mocks the instance automatically
let mockStorage: MMKV;
let storage: StorageType;

beforeEach(() => {
  mockStorage = new MMKV();
  mockStorage.set(KEY, VALUE_STRING);

  storage = createStorage(mockStorage);
});
afterEach(() => mockStorage.clearAll());

test("load", () => {
  const value = storage.load(KEY);
  expect(value).toStrictEqual(VALUE_OBJECT);
});

test("getItem", () => {
  const value = storage.getItem(KEY);
  expect(value).toStrictEqual(VALUE_STRING);
});

test("save", () => {
  storage.save(NEW_KEY, VALUE_OBJECT);
  expect(mockStorage.getString(NEW_KEY)).toStrictEqual(VALUE_STRING);
});

test("setItem", () => {
  storage.setItem(NEW_KEY, VALUE_STRING);
  expect(mockStorage.getString(NEW_KEY)).toStrictEqual(VALUE_STRING);
});

test("removeItem", () => {
  storage.removeItem(KEY);
  expect(mockStorage.contains(KEY)).toStrictEqual(false);
});

test("clear", () => {
  storage.clear();
  expect(mockStorage.getAllKeys()).toEqual(expect.arrayContaining([]));
});
