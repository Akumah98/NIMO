import { getFapshiBaseUrl, getFapshiHeaders } from "./fapshiConfig";

export interface DirectPayParams {
  amount: number;
  phone: string;
  medium?: "mobile money" | "orange money";
  email: string;
  externalId: string;
  message?: string;
}

export interface DirectPayResponse {
  success: boolean;
  transId?: string;
  error?: string;
}

export function sanitizeCameroonPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("237") && digits.length === 12) {
    return digits.slice(3);
  }
  return digits;
}

export function detectMedium(phone: string): "mobile money" | "orange money" {
  const clean = sanitizeCameroonPhone(phone);
  if (/^6(9|5[5-9])/.test(clean)) return "orange money";
  return "mobile money";
}

export async function sendDirectPay(params: DirectPayParams): Promise<DirectPayResponse> {
  const url = `${getFapshiBaseUrl()}/direct-pay`;
  const cleanPhone = sanitizeCameroonPhone(params.phone);
  const chosenMedium = params.medium || detectMedium(cleanPhone);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: getFapshiHeaders(),
      body: JSON.stringify({
        amount: Math.round(params.amount),
        phone: cleanPhone,
        medium: chosenMedium,
        email: params.email,
        externalId: params.externalId,
        message: params.message || "Donation to NIMO",
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || "Failed to trigger direct payment" };
    }

    return {
      success: true,
      transId: data.transId,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Network error";
    return { success: false, error: msg };
  }
}
