export const getFapshiBaseUrl = (): string =>
  process.env.FAPSHI_ENV === "live"
    ? "https://live.fapshi.com"
    : "https://sandbox.fapshi.com";

export const getFapshiHeaders = () => ({
  "Content-Type": "application/json",
  apiuser: process.env.FAPSHI_API_USER || "",
  apikey: process.env.FAPSHI_API_KEY || "",
});
