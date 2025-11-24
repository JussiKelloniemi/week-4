import {Request, Response, Router} from "express"
import fs from "fs"
import { compile } from "morgan"

const router: Router = Router()

let userList: string[] = []

fs.readFile("./data.json", "utf8", (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
        console.error(err)
        return
    }
    try {
        userList = JSON.parse(data)
    } catch (error: any) {
        console.error(`Error parsing JSON: ${error}`)
    }
})

type TUser = {
    name: string
    todos: string[]
}

const users: TUser[] = []

router.post('/add', (req, res) => {
    const name = req.body.name
    const todos = req.body.todos
    const user = users.find(user => user.name === name)

    if (user) {
        user.todos.push(...todos)
    } else {
        const newUser: TUser = {
            name,
            todos
        }
        users.push(newUser)
    }

    const message = `Todo added successfully for user ${name}.`
    res.json({html: message})
    console.log(users)
})

router.get('/todos/:id', (req, res) => {
    const name = req.params.id
    const user = users.find(user => user.name === name)

    if (user) {
        res.json({
            found: true,
            name: user.name,
            todos: user.todos})
    } else {
        res.json({
            found: false,
            message: "User not found"
        })
    }
})

export default router