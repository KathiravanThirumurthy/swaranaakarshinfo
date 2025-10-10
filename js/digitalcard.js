// Contact data stored directly
const contactData = {
  "name": "Image Creative Education - Puducherry",
  "phone": "+91 99439 52078",
  "email": "imagepondy75@gmail.com",
  "address": "166, Govindan Naicker St,(Opp. Shanmuga theater ), Kuyavarpalayam, Nellithope, Puducherry - 605013",
  "org": "Image Creative Education",
  "title": "Image Creative Education",
  "redirect": "https://www.image.edu.in/multimedia-animation-training-institutes-pondicherry.asp"
};



// Function called on button click
function downloadNow() {
  const statusEl = document.querySelector(".status");
  statusEl.textContent = "⏳ Generating contact info...";

  try {
    // Generate vCard string
    const vcard = `
BEGIN:VCARD
VERSION:3.0
N:${contactData.name}
FN:${contactData.name}
TEL;TYPE=CELL:${contactData.phone}
EMAIL:${contactData.email}
ADR;TYPE=WORK:;;${contactData.address}
ORG:${contactData.org}
TITLE:${contactData.title}
END:VCARD`.trim();

    // Download VCF
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${contactData.name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    URL.revokeObjectURL(url);

    statusEl.textContent = "✅ Contact Downloaded Successfully!";

    // Optional redirect after 3 seconds
    if (contactData.redirect) {
      setTimeout(() => {
        window.location.href = contactData.redirect;
      }, 10000);
    }

    

  } catch (error) {
    console.error(error);
    statusEl.textContent = `❌ Failed to generate contact info: ${error.message}`;
  }
}

