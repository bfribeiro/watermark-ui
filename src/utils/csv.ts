import type { Buyer } from "../types/watermark";

type ParseBuyersCsvResult =
  | {
      success: true;
      buyers: Buyer[];
    }
  | {
      success: false;
      error: string;
    };

export function parseBuyersCsv(text: string): ParseBuyersCsvResult {
  const lines = text.split("\n").filter((line) => line.trim());

  if (lines.length < 2) {
    return {
      success: false,
      error: "CSV file must have at least a header row and one data row",
    };
  }

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

  const nameIdx = headers.findIndex((h) => h.includes("name"));
  const emailIdx = headers.findIndex((h) => h.includes("email"));
  const orderIdx = headers.findIndex((h) => h.includes("order"));

  if (nameIdx === -1 || emailIdx === -1 || orderIdx === -1) {
    return {
      success: false,
      error: "CSV must have columns: name, email, order_id",
    };
  }

  const buyers: Buyer[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(",").map((v) => v.trim());

    if (values.length >= 3) {
      buyers.push({
        name: values[nameIdx],
        email: values[emailIdx],
        orderId: values[orderIdx],
      });
    }
  }

  if (buyers.length === 0) {
    return {
      success: false,
      error: "No valid buyer data found in CSV",
    };
  }

  return {
    success: true,
    buyers,
  };
}