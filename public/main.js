const todoForm = document.getElementById("todoForm")
const submitButton = document.getElementById("submit-data")



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
