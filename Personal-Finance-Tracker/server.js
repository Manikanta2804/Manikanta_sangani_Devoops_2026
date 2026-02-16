const express = require('express');
const app = express();

app.use(express.json());

let expenses = [];
let income = [];

// Dashboard API
app.get('/api/dashboard', (req, res) => {
    res.json({
        totalIncome: income.reduce((a, b) => a + b.amount, 0),
        totalExpenses: expenses.reduce((a, b) => a + b.amount, 0)
    });
});

// Expenses APIs
app.get('/api/expenses', (req, res) => {
    res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
    expenses.push(req.body);
    res.status(201).json(req.body);
});

// Income APIs
app.get('/api/income', (req, res) => {
    res.json(income);
});

app.post('/api/income', (req, res) => {
    income.push(req.body);
    res.status(201).json(req.body);
});

module.exports = app;
