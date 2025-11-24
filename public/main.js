const todoForm = document.getElementById("todoForm")
const submitButton = document.getElementById("submit-data")
const searchForm = document.getElementById("searchFrom")
const searchButton = document.getElementById("search")


todoForm.addEventListener("submit", async function(event) {
    event.preventDefault()

    const userName = document.getElementById("userInput").value
    const todoInput = document.getElementById("todoInput").value

    const data = {name: userName, todos: [todoInput]}

    const userTodo = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const response = await userTodo.json()
    const submission = document.getElementById("submission")
    submission.textContent = response.html
})

searchForm.addEventListener("submit", async function(event) {
    event.preventDefault()

    const searchInput = document.getElementById("searchInput").value
    const todoList = document.getElementById("todoList")

    const searchResult = await fetch(`http://localhost:3000/todos/${searchInput}`, {
        method: "GET"
    })

    const userJson = await searchResult.json()
    todoList.innerHTML = ""

    if (userJson.found) {
        userJson.todos.forEach(todo => {
            const li = document.createElement("li")
            li.textContent = todo
            todoList.appendChild(li)
        })
    } else {
        todoList.innerHTML = "<li>User not found.</li>"
    }

})