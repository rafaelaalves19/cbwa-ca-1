const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = (module.exports = express()); 
const port = process.env.PORT || 3000; 
const hostname = '0.0.0.0'; 
const users = require('./controllers/users')(); 
const projects = require('./controllers/projects')(); 
const issues = require('./controllers/issues')(); 
const comments = require('./controllers/comments')();



app.use(bodyParser.json()); 

app.get('/users', users.getController); 
app.get('/users/:email', users.getEmail); 
app.post('/users', users.postController); 

app.get('/issues', issues.getController);
app.get('/issues/:slug', issues.getIssue); 
app.get('/projects/:slug/issues', issues.getByProject); 
app.post('/projects/:slug/issues', issues.postController); 

app.post('/issues/:issueNumber/comments', comments.postComment);
app.get('/issues/:issueNumber/comments', comments.getCommentsIssue);
app.get('/issues/comments/:commentId', comments.getComment);

app.get('/projects', projects.getController); 
app.get('/projects/:slug', projects.getSlug); 
app.post('/projects', projects.postController); 













app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`);
});