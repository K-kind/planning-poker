const STORAGE_KEYS = {
  ROOMS: "planning-poker:rooms@v1",
} as const;

type Value = {
  ROOMS: { [roomId: string]: { playerId: string; createdAt: string } };
};

type StorageKey = keyof typeof STORAGE_KEYS;
type StorageValue = Value[StorageKey];

function getStorageItem(key: "ROOMS"): Value["ROOMS"] | null;
function getStorageItem(key: StorageKey): StorageValue | null {
  const stringifiedItem = localStorage.getItem(key);
  if (stringifiedItem == null) return null;

  try {
    return JSON.parse(stringifiedItem) as StorageValue;
  } catch (e) {
    console.error(e);

    return null;
  }
}

function setStorageItem(key: "ROOMS", value: Value["ROOMS"]): void;
function setStorageItem(key: StorageKey, value: StorageValue): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getStorageItem, setStorageItem };
