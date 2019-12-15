const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const PORT = 3001

let todos = []

// すべてのtodoの取得
app.get("/todos", (req, res) => {
    // todosをjsonで送る
    res.json(todos)
})

// 特定のtodoの取得
app.get("/todos/:id", (req, res) => {
    // req.params.idで:idの部分に入力されたパラメータを取得できる
    // パラメータは文字列なので注意！
    const id = Number(req.params.id)
    const todo = todos.find(todo => todo.id === id)

    if (todo) {
        res.json(todo)
    } else {
        res.status(404).end()
    }
})

// 削除処理
app.delete('/todos/:id', (req, res) => {
    const id = Number(req.params.id)
    todos = todos.filter(todos => todo.id !== id)
    res.json(todos)
})

// 新規追加処理
app.post('/todos', (req, res) => {    
    const todo = req.body

    // idの生成は関数に抽出しました。
    todo.id = createNewId()

    todos = todos.concat(todo)

    res.json(todos)
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

const createNewId = () => {
    const maxID = todos.length > 0 ?
    Math.max(...todos.map(todo => todo.id)) : 0

    return maxID + 1
}