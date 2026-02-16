const request = require('supertest');
const app = require('../server');

describe("Integration Testing - Finance APIs", () => {

    test("Create Expense", async () => {
        const res = await request(app)
            .post('/api/expenses')
            .send({ title: "Food", amount: 100 });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Food");
    });

    test("Fetch Expenses", async () => {
        const res = await request(app).get('/api/expenses');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("Create Income", async () => {
        const res = await request(app)
            .post('/api/income')
            .send({ title: "Salary", amount: 1000 });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Salary");
    });

    test("Fetch Income", async () => {
        const res = await request(app).get('/api/income');

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("Dashboard Summary", async () => {
        const res = await request(app).get('/api/dashboard');

        expect(res.statusCode).toBe(200);
        expect(res.body.totalIncome).toBeDefined();
        expect(res.body.totalExpenses).toBeDefined();
    });

});
