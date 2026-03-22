export function generateWatermarkCode(buyerId: number, orderId: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  const seed = String(buyerId) + orderId;

  for (let i = 0; i < 8; i++) {
    const idx = (seed.charCodeAt(i % seed.length) * (i + 1)) % chars.length;
    code += chars[idx];

    if (i === 3) {
      code += "-";
    }
  }

  return code;
}