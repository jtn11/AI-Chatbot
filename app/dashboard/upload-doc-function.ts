export async function uploadPdf(
  setpdfloading: (value: boolean) => void,
  userId: string,
  currentChatId?: string | null,
) {
  return new Promise<{ chatId: string }>((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/pdf";

    input.onchange = async () => {
      if (!input.files || input.files.length === 0) return;

      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userId);

      // sending currentChatId only if it exist i.e., now chat have to be updated
      if (currentChatId) {
        formData.append("currentChatId", currentChatId);
      }

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

        resolve({ chatId: data.chatId });
      } catch (err) {
        reject(err);
      }
    };

    input.click();
  });
}
