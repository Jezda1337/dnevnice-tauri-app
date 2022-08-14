import moment from "moment";
import { writable } from "svelte/store";
import type { Data } from "./modal";
import { supabase } from "./supabaseClient";
export const daysInMonth = writable(moment().daysInMonth());
export const currentMonth = writable<string>(moment().format("MMMM"));
export const data = writable<Data[]>([]);

export const initDB = async (values: any, month: string) => {
  try {
    const { data } = await supabase.from(month).insert(values);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export const createRow = async (id: number, values: any, month: string) => {
  console.log(values);
  try {
    const { data } = await supabase.from(month).insert([values]);
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export const updateRow = async (id: number, values: any, month: string) => {
  try {
    const { data } = await supabase
      .from(month)
      .update(values)
      .match({ id: id });
    return data;
  } catch (error) {
    console.error("error", error);
  }
};

export const selectAll = async (month: string) => {
  try {
    const { data: listOfData } = await supabase.from(month).select("*");
    return listOfData;
  } catch (error) {
    console.error("error", error);
  }
};

export const headers = writable<string[]>([
  "Date",
  "Jagodic",
  "Pecenicic",
  "Dzambasovic",
  "Jezdic",
  "Napomene",
]);
