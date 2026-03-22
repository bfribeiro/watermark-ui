export type WatermarkRequest = {
  file: File;
  name: string;
  orderId: string;
};

export type BatchWatermarkRequest = {
  file: File;
  buyers: Array<{
    name: string;
    orderId: string;
    email?: string;
  }>;
};

const apiBaseUrl =
  import.meta.env.VITE_WATERMARK_API_BASE_URL ||
  "https://blindstamp.onrender.com";

export async function watermarkPdf({
  file,
  name,
  orderId,
}: WatermarkRequest): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);
  formData.append("order_id", orderId);

  const response = await fetch(`${apiBaseUrl}/watermark`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || `Failed to watermark file. Status: ${response.status}`
    );
  }

  return await response.blob();
}

export async function watermarkBatchZip({
  file,
  buyers,
}: BatchWatermarkRequest): Promise<Blob> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("buyers", JSON.stringify(buyers));

  const response = await fetch(`${apiBaseUrl}/watermark/batch`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || `Failed to generate ZIP. Status: ${response.status}`
    );
  }

  return await response.blob();
}