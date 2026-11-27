import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Web3FormsResponse {
  success: boolean;
  message: string;
  data?: any;
}

/**
 * Submit contact inquiry directly to Web3Forms official endpoint using FormData
 */
export async function submitWeb3Forms(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  botcheck?: boolean;
}): Promise<Web3FormsResponse> {
  const accessKey =
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
    "c727d09e-ed43-4985-828f-c0ce20be5170";

  const formData = new FormData();
  formData.append("access_key", accessKey);
  formData.append("name", payload.name.trim());
  formData.append("email", payload.email.trim());
  formData.append("subject", payload.subject.trim());
  formData.append("message", payload.message.trim());
  if (payload.botcheck) {
    formData.append("botcheck", "true");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  const result: Web3FormsResponse = await response.json();
  return result;
}

export async function checkApiHealth(): Promise<{ status: string; database?: string }> {
  const response = await api.get("/api/health");
  return response.data;
}
