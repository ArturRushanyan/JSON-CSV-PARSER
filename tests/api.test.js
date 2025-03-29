const request = require("supertest");
const express = require("express");
const app = require("../index");

describe("API Tests", () => {
  test("JSON to CSV conversion should work correctly", async () => {
    const response = await request(app)
      .post("/api/v1/json-to-csv")
      .send({
        data: [{ name: "John", age: 30 }],
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.text).toContain('"name","age"');
    expect(response.text).toContain('"John",30');
  });

  test("CSV to JSON conversion should work correctly", async () => {
    const csvData = "name,age\nJohn,30\nAlice,25";
    const response = await request(app)
      .post("/api/v1/csv-to-json")
      .send(csvData)
      .set("Content-Type", "text/plain");

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual([
      { name: "John", age: "30" },
      { name: "Alice", age: "25" },
    ]);
  });

  test("Should return error for invalid JSON input", async () => {
    const response = await request(app)
      .post("/api/v1/json-to-csv")
      .send({ data: "invalid data" })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe(
      "Invalid JSON format. Expected an array."
    );
  });
});

describe("Testing Limits", () => {
  test("Rate limiting should work", async () => {
    for (let i = 0; i < 15; i++) {
      await request(app).post("/api/v1/json-to-csv").send({ data: [] });
    }
    const response = await request(app)
      .post("/api/v1/json-to-csv")
      .send({ data: [] });
    expect(response.status).toBe(429);
    expect(response.body.error).toBe(
      "Too many requests, please try again later."
    );
  });
});
