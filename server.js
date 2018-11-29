const express = require('express');
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const routes = require('./routes');

let app = express();
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(errorhandler());

let store = {}
store.posts = []

app.use((req, res, next) => {
    req.store = store;
  next();
});

/*
GET and POST /posts
PUT and DELETE /posts/:postId/
GET and POST /posts/:postId/comments
PUT and DELETE /posts/:postId/comments/commentId
*/

//Posts routes
app.get('/posts', (req, res) => {
  routes.posts.getPosts(req, res);
})

app.post('/posts', (req, res) => {
    routes.posts.addPost(req, res);
})

app.put('/posts/:postId', (req, res) => {
    routes.posts.updatePost(req, res);
})

app.delete('/posts/:postId', (req, res) => {
    routes.posts.removePost(req, res);
})

//Comments routes 
app.get('/posts/:postId/comments', (req, res) => {
  routes.comments.getComments(req, res);
})

app.post('/posts/:postId/comments', (req, res) => {
    //console.log("req.store.posts.comments.length: " + req.store.posts.comments.length);
    routes.comments.addComment(req, res);
})

app.put('/posts/:postId/comments/:commentId', (req, res) => {
    routes.comments.updateComment(req, res);
})

app.delete('/posts/:postId/comments/:commentId', (req, res) => {
    routes.comments.removeComment(req, res);
})

console.log("starting on port 3000");
app.listen(3000);