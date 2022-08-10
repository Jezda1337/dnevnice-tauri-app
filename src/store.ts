import moment from "moment";
import { writable } from "svelte/store";

export const daysInMonth = writable(moment().daysInMonth());
