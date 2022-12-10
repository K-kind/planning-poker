const STORAGE_KEYS = {
  ROOMS: "planning-poker:rooms@v1",
  AUTH: "planning-poker:auth@v1",
} as const;

type Value = {
  ROOMS: { [roomId: string]: { playerId: string; createdAt: string } };
  AUTH: { email: string; password: string };
};

type StorageKey = keyof typeof STORAGE_KEYS;
type StorageValue = Value[StorageKey];

function getStorageItem(key: "ROOMS"): Value["ROOMS"] | null;
function getStorageItem(key: "AUTH"): Value["AUTH"] | null;
function getStorageItem(key: StorageKey): StorageValue | null {
  const stringifiedItem = localStorage.getItem(STORAGE_KEYS[key]);
  if (stringifiedItem == null) return null;

  try {
    return JSON.parse(stringifiedItem) as StorageValue;
  } catch (e) {
    console.error(e);

    return null;
  }
}

function setStorageItem(key: "ROOMS", value: Value["ROOMS"]): void;
function setStorageItem(key: "AUTH", value: Value["AUTH"]): void;
function setStorageItem(key: StorageKey, value: StorageValue): void {
  localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
}

function clearStorageItem(key: StorageKey): void {
  localStorage.removeItem(STORAGE_KEYS[key]);
}

export { getStorageItem, setStorageItem, clearStorageItem };
