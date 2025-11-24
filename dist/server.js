"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
const users = [];
app.post('/add', (req, res) => {
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
