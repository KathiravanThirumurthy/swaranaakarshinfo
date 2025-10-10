async function downloadNow() {
  try {
    const response = await fetch('../data/contact.json');
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
      window.location.href = "https://www.image.edu.in/multimedia-animation-training-institutes-pondicherry.asp";
    }, 3000);

  } catch (error) {
    document.querySelector(".status").textContent = "❌ Failed to load contact info!";
    console.error(error);
  }
}
