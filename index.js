const express = require('express'); 
const bodyParser = require('body-parser'); 
const app = (module.exports = express()); 
const port = process.env.PORT || 3000; 
const hostname = '0.0.0.0'; 
const users = require('./controllers/users')(); 
const projects = require('./controllers/projects')(); 
const issues = require('./controllers/issues')(); 
const comments = require('./controllers/comments')();
const usersModel = require('./models/users')();


app.use(async(req, res, next)=> {
    const messageFail = {
        error: 'Entry Failed',
        message:'Authorization Denied',
        code: '00000' 
    }


    const suppliedKey = req.headers['x-api-key'];
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if(!suppliedKey){
        console.log('Entry Failed, no key inserted');
        new Date(), clientIp;
        messageFail.code = '01';
        return res.status(401).json(messageFail);

    }

    
    const user = await usersModel.getByKey(suppliedKey);

    if(!user){
        messageFail.code = '02';
        return res.status(401).json(messageFail);
    }

    next();

});

app.use(bodyParser.json()); 

app.get('/users', users.getController); // to get all the users
app.get('/users/:email', users.getEmail); // to get an individual user
app.post('/users', users.postController); // to add a new user

app.get('/issues', issues.getController); // to get all the issues
app.get('/issues/:slug', issues.getIssue); // to get an individual issue
app.get('/projects/:slug/issues', issues.getByProject); // to get all the issues related to a project
app.post('/projects/:slug/issues', issues.postController); // to add an issue in a project

app.post('/issues/:issueNumber/comments', comments.postComment); // to add a comment in an issue
app.get('/issues/:issueNumber/comments', comments.getCommentsIssue); // to get every comment in an specific issue
app.get('/issues/comments/:commentId', comments.getComment); // to get an specific comment by an specific id

app.get('/projects', projects.getController); // to get all the projects
app.get('/projects/:slug', projects.getSlug); // to get one specific project
app.post('/projects', projects.postController); // to add a new project



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, hostname, () => {
    console.log(`App listening at http://${hostname}:${port}`);

});

app.use((req, res) => {
    res.status(404).json({
        error: 404,
        message: 'Route not found!',
    });
});