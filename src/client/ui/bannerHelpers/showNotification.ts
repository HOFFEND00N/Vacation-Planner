import { store } from "@confirmit/react-banner";

export const showNotification = (message: string) => {
  store.success({ text: message, closeTimeout: 0 });
};
