import express, {Express} from "express"
import path from "path"

const app: Express = express()
const port = 3000

app.use(express.json())
app.use(express.static(path.join(__dirname, "../public")))

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})

type TUser = {
    name: string
    todos: string[]
}

const users: TUser[] = []

app.post('/add', (req, res) => {
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