const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('Jose')`
connection.query(sql)
connection.end()


app.get('/', (req, res) => {
    const newConnection = mysql.createConnection(config)
    newConnection.query("SELECT * FROM people", function (err, result, fields) {
        let response = '<h1>Full Cycle Rocks !</h1>'
        let names = []
        Object.keys(result).forEach(function (key) {
            var row = result[key];
            names.push(row.name)
        });

        console.log(names)
        res.send(response.concat(names))
    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})