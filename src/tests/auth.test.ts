import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth";

describe("getAPIKey", () => {
  test("returns null when authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when authorization header is empty string", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    expect(getAPIKey({ authorization: "Bearer sometoken" })).toBeNull();
  });

  test("returns null when header has no space (no key value)", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns the API key for a valid ApiKey header", () => {
    expect(getAPIKey({ authorization: "ApiKey mysecretkey" })).toBe(
      "mysecretkey",
    );
  });

  test("returns the first element when authorization is an array", () => {
    expect(
      getAPIKey({ authorization: ["ApiKey arraykey", "ApiKey other"] as string[] }),
    ).toBe("arraykey");
  });

  test("returns null when authorization array is empty", () => {
    expect(getAPIKey({ authorization: [] as string[] })).toBeNull();
  });
});
