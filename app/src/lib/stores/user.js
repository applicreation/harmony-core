import {writable} from "svelte/store";

export const isAuthenticating = writable(true);
export const isChecked = writable(false);
export const isUser = writable(false);
export const user = writable({});
export const popupOpen = writable(false);
export const error = writable();
