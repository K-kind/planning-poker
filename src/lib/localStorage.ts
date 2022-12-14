import { captureException } from "@/lib/sentry";

const STORAGE_KEYS = {
  AUTH: "planning-poker:auth@v1",
} as const;

type Value = {
  AUTH: { email: string; password: string };
};

type StorageKey = keyof typeof STORAGE_KEYS;
type StorageValue = Value[StorageKey];

function getStorageItem(key: "AUTH"): Value["AUTH"] | null;
function getStorageItem(key: StorageKey): StorageValue | null {
  const stringifiedItem = localStorage.getItem(STORAGE_KEYS[key]);
  if (stringifiedItem == null) return null;

  try {
    return JSON.parse(stringifiedItem) as StorageValue;
  } catch (e) {
    captureException(e);

    return null;
  }
}

function setStorageItem(key: "AUTH", value: Value["AUTH"]): void;
function setStorageItem(key: StorageKey, value: StorageValue): void {
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
}

function clearStorageItem(key: StorageKey): void {
  localStorage.removeItem(STORAGE_KEYS[key]);
}

export { getStorageItem, setStorageItem, clearStorageItem };
