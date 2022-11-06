export const getStorage = (key: string) => 
  typeof(window) !== "undefined" ? window.localStorage.getItem(key) : null;

export const setStorage = (key: string, value: string) => {
  if (typeof(window) !== "undefined") {
    window.localStorage.setItem(key, value);
  }
}

export const removeStorage = (key: string) => {
  if (typeof(window) !== "undefined") {
    window.localStorage.removeItem(key);
  }
}