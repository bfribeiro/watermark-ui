import type { Buyer, TemplatesMap } from "../types/watermark";

export const templates: TemplatesMap = {
  discreet: {
    name: "Discreet",
    opacity: 0.05,
    frequency: 10,
    footerSize: 6,
  },
  balanced: {
    name: "Balanced",
    opacity: 0.1,
    frequency: 20,
    footerSize: 8,
  },
  aggressive: {
    name: "Aggressive",
    opacity: 0.2,
    frequency: 40,
    footerSize: 10,
  },
};

export const sampleBuyers: Buyer[] = [
  { name: "Alice Johnson", email: "alice@example.com", orderId: "ORD-1001" },
  { name: "Bob Smith", email: "bob@example.com", orderId: "ORD-1002" },
  { name: "Carol White", email: "carol@example.com", orderId: "ORD-1003" },
];