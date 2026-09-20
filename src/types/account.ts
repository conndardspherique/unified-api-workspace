export type ProviderType = "gmail" | "outlook" | "linkedin";

export interface Account {
  id: string;
  provider: ProviderType;
  identifier: string;
  displayName?: string;
}