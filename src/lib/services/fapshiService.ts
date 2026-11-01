interface InitiateParams {
  amount: number;
  email: string;
  externalId: string;
  redirectUrl: string;
  userId?: string;
  message?: string;
}

interface FapshiResponse {
  success: boolean;
  link?: string;
  transId?: string;
  error?: string;
  statusCode?: number;
}

const getBaseUrl = (): string =>
  process.env.FAPSHI_ENV === "live"
    ? "https://live.fapshi.com"
    : "https://sandbox.fapshi.com";

const getHeaders = () => ({
  "Content-Type": "application/json",
  apiuser: process.env.FAPSHI_API_USER || "",
  apikey: process.env.FAPSHI_API_KEY || "",
});

export async function initiatePayment(params: InitiateParams): Promise<FapshiResponse> {
  const url = `${getBaseUrl()}/initiate-pay`;
  try {
    const payload: Record<string, unknown> = {
      amount: Math.round(params.amount),
      email: params.email,
      externalId: params.externalId,
      redirectUrl: params.redirectUrl,
      message: params.message || "Donation to NIMO",
    };
    if (params.userId && /^[a-zA-Z0-9_-]{1,100}$/.test(params.userId)) {
      payload.userId = params.userId;
    }

    const res = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) {
      return { success: false, error: data.message || "Failed to initiate payment", statusCode: res.status };
    }

    return {
      success: true,
      link: data.link,
      transId: data.transId,
      statusCode: res.status,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Network error";
    return { success: false, error: message };
  }
}

export async function getPaymentStatus(transId: string) {
  if (!transId || !/^[a-zA-Z0-9_-]{6,30}$/.test(transId)) return null;
  try {
    const res = await fetch(`${getBaseUrl()}/payment-status/${transId}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function verifyWebhookSecret(secret?: string | null): boolean {
  const expected = process.env.FAPSHI_WEBHOOK_SECRET;
  if (!expected) return true;
  return secret === expected;
}
