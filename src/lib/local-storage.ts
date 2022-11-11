const STORAGE_KEYS = {
  ROOM_USER: "planning-poker@room-user",
} as const;

type Value = {
  ROOM_USER: { [roomId: string]: string };
};

type StorageKey = keyof typeof STORAGE_KEYS;
type StorageValue = Value[StorageKey];

function getStorageItem(key: "ROOM_USER"): Value["ROOM_USER"] | null;
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

function setStorageItem(key: "ROOM_USER", value: Value["ROOM_USER"]): void;
function setStorageItem(key: StorageKey, value: StorageValue): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export { getStorageItem, setStorageItem };
