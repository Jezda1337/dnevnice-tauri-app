<script lang="ts">
  import { appWindow } from "@tauri-apps/api/window";
  import { onMount } from "svelte";

  import {
    currentMonth,
    data,
    daysInMonth,
    headers,
    initDB,
    selectAll,
    updateRow,
  } from "../store";

  onMount(async () => {
    await appWindow.setTitle($currentMonth);
    let all = await selectAll($currentMonth);

    if (!all.length) {
      initDB($data, $currentMonth);
      return;
    }

    $data = all.sort((a, b) => a.id - b.id);
  });

  let index: number = 1;
  $: {
    while (Array($daysInMonth).length - 1 >= $data.length) {
      $data.push({
        id: index,
        jagodic: null,
        pecenicic: null,
        dzambasovic: null,
        jezdic: null,
        komlenic: null,
        napomena: null,
      });
      index++;
    }
  }

  async function handleChange(index: number, e: Event, user: string) {
    let newRow = {};

    user === "napomena"
      ? (newRow = { id: index + 1, napomena: e.target["value"] })
      : (newRow = { id: index + 1, [user]: e.target["checked"] });

    await updateRow(index + 1, newRow, $currentMonth);

    const all = await selectAll($currentMonth);
    if (all) {
      $data = all.sort((a, b) => a.id - b.id);
    }
  }
</script>

<section class="py-2">
  <table style="width: 100%;" class="w-full">
    <thead>
      <tr>
        {#each $headers as header}
          <th class="pb-2">
            {header}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each $data as { id, jagodic, pecenicic, dzambasovic, jezdic, komlenic, napomena }, index}
        <tr class="text-center odd:bg-slate-400">
          <td>
            {index + 1}
          </td>
          <td>
            <label class="block cursor-pointer" for="{`${id + 'jagodic'}`}">
              <input
                id="{`${id + 'jagodic'}`}"
                class="checked opacity-0 hover:opacity-100 w-4 h-4"
                type="checkbox"
                value="{index + 1}"
                checked="{jagodic}"
                on:change="{(e) => handleChange(index, e, 'jagodic')}"
              />
            </label>
          </td>
          <td>
            <label
              class="block cursor-pointer"
              for="{`${id + 1 + 'pecenicic'}`}"
            >
              <input
                id="{`${id + 1 + 'pecenicic'}`}"
                class="checked opacity-0 hover:opacity-100 w-4 h-4"
                type="checkbox"
                value="{index + 1}"
                checked="{pecenicic}"
                on:change="{(e) => handleChange(index, e, 'pecenicic')}"
              />
            </label>
          </td>
          <td>
            <label
              class="block cursor-pointer"
              for="{`${id + 1 + 'dzambasovic'}`}"
            >
              <input
                id="{`${id + 1 + 'dzambasovic'}`}"
                class="checked opacity-0 hover:opacity-100 w-4 h-4"
                type="checkbox"
                value="{index + 1}"
                checked="{dzambasovic}"
                on:change="{(e) => handleChange(index, e, 'dzambasovic')}"
              />
            </label>
          </td>
          <td>
            <label class="block cursor-pointer" for="{`${id + 1 + 'jezdic'}`}">
              <input
                id="{`${id + 1 + 'jezdic'}`}"
                class="checked opacity-0 hover:opacity-100 w-4 h-4"
                type="checkbox"
                value="{index + 1}"
                checked="{jezdic}"
                on:change="{(e) => handleChange(index, e, 'jezdic')}"
              />
            </label>
          </td>
          <td>
            <label
              class="block cursor-pointer"
              for="{`${id + 1 + 'Komlenic'}`}"
            >
              <input
                id="{`${id + 1 + 'Komlenic'}`}"
                class="checked opacity-0 hover:opacity-100 w-4 h-4"
                type="checkbox"
                value="{index + 1}"
                checked="{komlenic}"
                on:change="{(e) => handleChange(index, e, 'komlenic')}"
              />
            </label>
          </td>
          <td>
            <label class="flex" for="">
              <input
                value="{napomena}"
                type="text"
                placeholder="-"
                class="input px-2 ml-auto"
                on:change="{(e) => handleChange(index, e, 'napomena')}"
              />
            </label>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  <div class="mt-4">
    <h4 class="flex justify-between w-40">
      Jagodic: <span>{$data.filter((j) => j.jagodic).length}</span>
    </h4>
    <h4 class="flex justify-between w-40">
      Pecenicic: <span>{$data.filter((p) => p.pecenicic).length}</span>
    </h4>
    <h4 class="flex justify-between w-40">
      Dzambasovic: <span>{$data.filter((dz) => dz.dzambasovic).length}</span>
    </h4>
    <h4 class="flex justify-between w-40">
      Jezdic: <span>{$data.filter((j) => j.jezdic).length}</span>
    </h4>
    <h4 class="flex justify-between w-40">
      Komlenic: <span>{$data.filter((k) => k.komlenic).length}</span>
    </h4>
  </div>
</section>

<style>
  .checked:checked {
    opacity: 1;
  }

  .input {
    width: 80%;
  }
</style>
