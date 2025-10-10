async function downloadNow() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "puducherry"; // default branch

  const statusEl = document.querySelector(".status");
  statusEl.textContent = "⏳ Loading contact info...";

  const filePath = `../data/${id}.json`;
  console.log(`Fetching: ${filePath}`);

  try {
    const response = await fetch(filePath);

    if (!response.ok) {
      throw new Error(`File not found or server error (status: ${response.status})`);
    }

    const data = await response.json();

    if (!data.name || !data.phone) {
      throw new Error("Invalid data format in JSON.");
    }

    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${data.name}
FN:${data.name}
TEL;TYPE=CELL:${data.phone}
EMAIL:${data.email || ""}
ADR;TYPE=WORK:;;${data.address || ""}
ORG:${data.org || ""}
TITLE:${data.title || ""}
END:VCARD`.trim();

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);

    statusEl.textContent = "✅ Contact Downloaded Successfully!";

    if (data.redirect) {
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 3000);
    }

  } catch (error) {
    console.error(error);
    statusEl.textContent = `❌ Failed to load contact info: ${error.message}`;
  }
}
