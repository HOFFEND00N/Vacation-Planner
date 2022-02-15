import { store } from "@confirmit/react-banner";

export const showError = (error: Error) => {
  store.error({ text: error.message, closeTimeout: 0 });
};
