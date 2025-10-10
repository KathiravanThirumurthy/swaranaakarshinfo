async function downloadNow() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "puducherry"; // default branch
  
  try {
    const response = await fetch(`../data/${id}.json`);
    const data = await response.json();

    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${data.name}
FN:${data.name}
TEL;TYPE=CELL:${data.phone}
EMAIL:${data.email}
ADR;TYPE=WORK:;;${data.address}
ORG:${data.org}
TITLE:${data.title}
END:VCARD`;

    const blob = new Blob([vcard.trim()], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${data.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);

    document.querySelector(".status").textContent = "✅ Contact Downloaded Successfully!";
    
    setTimeout(() => {
      window.location.href = data.redirect;
    }, 3000);

  } catch (error) {
    document.querySelector(".status").textContent = "❌ Failed to load contact info!";
    console.error(error);
  }
}
