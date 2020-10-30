const express = require('express');
const bodyParser = require('body-parser');
const app = (module.exports = express());
const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';
const users = require('./controllers/users')();


app.use(bodyParser.json());
app.get('/users', users.getController);
app.get('/users/:email', users.getEmail);
app.post('/users', users.postController);
app.get('/', (req, res) => {

    res.send('Hello World');
});

app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`);
});