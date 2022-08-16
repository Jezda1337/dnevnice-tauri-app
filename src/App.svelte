<script lang="ts">
  import { save } from "@tauri-apps/api/dialog";
  import { writeBinaryFile } from "@tauri-apps/api/fs";
  import Header from "./lib/Header.svelte";

  import html2pdf from "html2pdf.js";
  import Table from "./lib/Table.svelte";

  const handlePDF = () => {
    const opt = {
      margin: 1,
      image: { type: "jpeg", quality: 100 },
      html2canvas: { scale: 3 },
      jsPDF: { unit: "pt" },
    };
    setTimeout(async () => {
      const pdf = await html2pdf()
        .set(opt)
        .from(document.getElementById("pdf"))
        .outputPdf("arraybuffer");

      console.log(pdf);

      const path = await save({
        filters: [{ name: "pdf", extensions: ["pdf"] }],
      });

      await writeBinaryFile(path, new Uint8Array(pdf));
    }, 500);
  };

  // this func is for web
  // const handlePdf = () => {
  //   const opt = {
  //     margin: 1,
  //     filename: "myfile.pdf",
  //     image: { type: "webp", quality: 100 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "pt" },
  //   };
  //   html2pdf().set(opt).from(document.getElementById("pdf")).save();
  // };
</script>

<main>
  <Header handlePDF="{handlePDF}" />

  <div id="pdf">
    <Table />
  </div>
</main>
