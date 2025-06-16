// usertest.test.js
import request from "supertest";
import app from "../server.js";

describe('user api tests', () => {
  it('should return working message from /normaltest', async () => {
    const res = await request(app).get('/api/students/normaltest');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Working Correctly without any errors..");
  });
});
