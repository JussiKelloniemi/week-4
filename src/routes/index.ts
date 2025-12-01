import {Request, Response, Router} from "express"
import { compile } from "morgan"
import { User, IUser } from '../models/User'
import populateUsers from '../../data/users'

const router: Router = Router()



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

router.get("/api/users/populate", async (req: Request, res: Response) => {
    for (let i = 0; i < populateUsers.length; i++) {
        const user: IUser = new User({
            user: populateUsers[i].name,
            todos: populateUsers[i].todos
        })
        await user.save()
    }

    console.log("Database populated")
    res.json({message: "Database populated"})
})

export default router