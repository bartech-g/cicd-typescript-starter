import { describe, expect, test } from "vitest";

const person = {
  isActive: true,
  age: 32,
};

describe("person", () => {
  test("person is defined", () => {
    expect(person).toBeDefined();
  });

  test("is active", () => {
    expect(person.isActive).toBeTruthy();
  });
});

/*
 * export function getAPIKey(headers: IncomingHttpHeaders): string | null {
  const authHeader = headers["authorization"];
  if (!authHeader) {
    return null;
  }

  const splitAuth = authHeader.split(" ");
  if (splitAuth.length < 2 || splitAuth[0] !== "ApiKey") {
    return null;
  }

  return splitAuth[1];
}
*/

import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns API key when authorization header is valid", () => {
    const headers = {
      authorization: "ApiKey my-secret-key",
    };

    expect(getAPIKey(headers)).toBe("my-secret-key");
  });

  test("returns null when authorization header is missing", () => {
    const headers = {};

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization type is incorrect", () => {
    const headers = {
      authorization: "Bearer my-secret-key",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header has no key", () => {
    const headers = {
      authorization: "ApiKey",
    };

    expect(getAPIKey(headers)).toBeNull();
  });
});
