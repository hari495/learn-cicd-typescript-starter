import { IncomingHttpHeaders } from "http";

export function getAPIKey(headers: IncomingHttpHeaders): string | null {
  // authorization header may be string | string[] | undefined
  const raw = headers["authorization"];
  if (!raw) {
    return null;
  }

  // normalize to a single string (if array, take first element)
  const authHeader = Array.isArray(raw) ? raw[0] : raw;

  if (!authHeader) return null;

  const splitAuth = authHeader.split(" ");
  if (splitAuth.length < 2 || splitAuth[0] !== "ApiKey") {
    return null;
  }

  return splitAuth[1];
}
