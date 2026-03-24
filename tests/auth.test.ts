import { describe, it, expect } from "vitest";
import { getAPIKey } from "../src/api/auth";

describe("getAPIKey", () => {
  it("returns the API key when Authorization header is 'ApiKey <key>'", () => {
    const headers: any = { authorization: "ApiKey abc123" };
    expect(getAPIKey(headers)).toBe("abc123");
  });

  it("returns null when Authorization header is missing", () => {
    const headers: any = {};
    expect(getAPIKey(headers)).toBeNull();
  });

  it("returns null when Authorization uses a different scheme", () => {
    const headers: any = { authorization: "Bearer abc123" };
    expect(getAPIKey(headers)).toBeNull();
  });

  it("works when Authorization header is an array (takes first element)", () => {
    const headers: any = { authorization: ["ApiKey arrayKey", "ApiKey other"] };
    expect(getAPIKey(headers)).toBe("rrayKey");
  });
});
