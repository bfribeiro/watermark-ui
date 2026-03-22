export function downloadTextFile(
  content: string,
  filename: string,
  mimeType: string
) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  triggerBrowserDownload(url, filename);
}

export function downloadSampleCsv() {
  const csvContent =
    "name,email,order_id\nAlice Johnson,alice@example.com,ORD-1001\nBob Smith,bob@example.com,ORD-1002\nCarol White,carol@example.com,ORD-1003\nDavid Brown,david@example.com,ORD-1004\nEmma Davis,emma@example.com,ORD-1005";

  downloadTextFile(csvContent, "buyers-sample.csv", "text/csv");
}

export function triggerBrowserDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);

  triggerBrowserDownload(url, filename);

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}