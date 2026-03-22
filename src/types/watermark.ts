export type ActiveTab =
  | "upload"
  | "template"
  | "buyers"
  | "process"
  | "investigator";

export type TemplateKey = "discreet" | "balanced" | "aggressive";

export type Buyer = {
  name: string;
  email: string;
  orderId: string;
};

export type TemplateConfig = {
  name: string;
  opacity: number;
  frequency: number;
  footerSize: number;
};

export type TemplatesMap = Record<TemplateKey, TemplateConfig>;

export type WatermarkedFileStatus = "ready" | "error";

export type WatermarkedFile = {
  buyer: Buyer;
  code: string;
  filename: string;
  status: WatermarkedFileStatus;
  downloads: number;
  maxDownloads: number;
  expiresAt: string;
  error?: string;
};

export type InvestigatorFoundResult = {
  found: true;
  code: string;
  buyer: Buyer;
  batch: string;
  issuedAt: string;
};

export type InvestigatorNotFoundResult = {
  found: false;
  message: string;
};

export type InvestigatorResult =
  | InvestigatorFoundResult
  | InvestigatorNotFoundResult;