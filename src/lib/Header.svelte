<script lang="ts">
  console.log("header");
  export let handlePDF: any;
</script>

<header class="flex items-center justify-between mb-2 mt-2 px-4">
  <button
    on:click="{handlePDF}"
    class="px-4 w-full py-2 bg-blue-400 rounded-sm"
  >
    PDF
  </button>
</header>
