export async function uploadFile(file: File): Promise<string | null> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) return data.url;

    console.error("Upload failed:", data);
    return null;
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}
