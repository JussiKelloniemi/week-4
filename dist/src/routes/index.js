"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const users_1 = __importDefault(require("../../data/users"));
const router = (0, express_1.Router)();
const users = [];
router.post('/add', (req, res) => {
    const name = req.body.name;
    const todos = req.body.todos;
    const user = users.find(user => user.name === name);
    if (user) {
        user.todos.push(...todos);
    }
    else {
        const newUser = {
            name,
            todos
        };
        users.push(newUser);
    }
    const message = `Todo added successfully for user ${name}.`;
    res.json({ html: message });
    console.log(users);
});
router.get('/todos/:id', (req, res) => {
    const name = req.params.id;
    const user = users.find(user => user.name === name);
    if (user) {
        res.json({
            found: true,
            name: user.name,
            todos: user.todos
        });
    }
    else {
        res.json({
            found: false,
            message: "User not found"
        });
    }
});
router.get("/api/users/populate", async (req, res) => {
    for (let i = 0; i < users_1.default.length; i++) {
        const user = new User_1.User({
            user: users_1.default[i].name,
            todos: users_1.default[i].todos
        });
        await user.save();
    }
    console.log("Database populated");
    res.json({ message: "Database populated" });
});
exports.default = router;
