export function uploadPdf(
  setpdfloading: (value: boolean) => void,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) return;
      const file = input.files[0];

      const formData = new FormData();
      formData.append("file", file);

      try {
        setpdfloading(true);
        const uploadRes = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
        });
        if (!uploadRes.ok) {
          throw new Error("Upload failed");
        }

        const data = await uploadRes.json();
        console.log("Upload Response:", data);
        resolve(data);
      } catch (err) {
        console.error("Upload failed:", err);
        reject(err);
      }
    };
    input.click();
  });
}
