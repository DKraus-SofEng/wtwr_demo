const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user");

describe("User Routes", () => {
  beforeEach(async () => {
    // Remove the test user before each test
    await User.deleteOne({ email: "testuser@example.com" });
  });

  it("should return 401 for GET / (signup/signin route expects POST)", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(401);
  });

  it("should create a new user with POST /signup", async () => {
    const res = await request(app).post("/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "TestPassword123",
      avatar: "https://example.com/avatar.png",
    });
    console.log("Signup response:", res.body); // Log response for debugging
    expect([200, 201]).toContain(res.statusCode); // Accept 200 or 201
    expect(res.body.data).toHaveProperty("email", "testuser@example.com");
  });

  it("should sign in an existing user with POST /signin", async () => {
    // Ensure the user exists before signin
    await request(app).post("/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "TestPassword123",
      avatar: "https://example.com/avatar.png",
    });
    const res = await request(app).post("/signin").send({
      email: "testuser@example.com",
      password: "TestPassword123",
    });
    console.log("Signin response:", res.body); // Log response for debugging
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should return 401 for GET /users/me without token", async () => {
    const res = await request(app).get("/users/me");
    expect(res.statusCode).toBe(401);
  });

  it("should return user info for GET /users/me with valid token", async () => {
    // First, sign up and sign in to get a token
    await request(app).post("/signup").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "TestPassword123",
      avatar: "https://example.com/avatar.png",
    });
    const signinRes = await request(app).post("/signin").send({
      email: "testuser@example.com",
      password: "TestPassword123",
    });
    const token = signinRes.body.token;
    const res = await request(app)
      .get("/users/me")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("email", "testuser@example.com");
  });

  it("should return 400 for signup with missing required fields", async () => {
    const res = await request(app).post("/signup").send({
      email: "missingfields@example.com",
      password: "TestPassword123",
      // missing name and avatar
    });
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 for signup with invalid email", async () => {
    const res = await request(app).post("/signup").send({
      name: "Invalid Email",
      email: "not-an-email",
      password: "TestPassword123",
      avatar: "https://example.com/avatar.png",
    });
    expect(res.statusCode).toBe(400);
  });

  it("should return 400 for signup with short password", async () => {
    const res = await request(app).post("/signup").send({
      name: "Short Password",
      email: "shortpass@example.com",
      password: "short",
      avatar: "https://example.com/avatar.png",
    });
    expect(res.statusCode).toBe(400);
  });

  it("should return 409 for signup with duplicate email", async () => {
    // First, create the user
    await request(app).post("/signup").send({
      name: "Dup Email",
      email: "dupe@example.com",
      password: "TestPassword123",
      avatar: "https://example.com/avatar.png",
    });
    // Try to create again
    const res = await request(app).post("/signup").send({
      name: "Dup Email",
      email: "dupe@example.com",
      password: "TestPassword123",
      avatar: "https://example.com/avatar.png",
    });
    expect(res.statusCode).toBe(409);
  });

  it("should return 401 for signin with wrong password", async () => {
    // First, create the user
    await request(app).post("/signup").send({
      name: "Wrong Password",
      email: "wrongpass@example.com",
      password: "TestPassword123",
      avatar: "https://example.com/avatar.png",
    });
    // Try to sign in with wrong password
    const res = await request(app).post("/signin").send({
      email: "wrongpass@example.com",
      password: "WrongPassword",
    });
    expect(res.statusCode).toBe(401);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
