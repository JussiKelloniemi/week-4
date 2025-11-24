"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const router = (0, express_1.Router)();
let userList = [];
fs_1.default.readFile("./data.json", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    try {
        userList = JSON.parse(data);
    }
    catch (error) {
        console.error(`Error parsing JSON: ${error}`);
    }
});
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
exports.default = router;
