module.exports = {
  getPosts(req, res) {
      res.status(200).send(req.store.posts);
  },
  addPost(req, res) {
      let newPost = req.body;
      let postId = req.store.posts.length;
      if (typeof(newPost.comments) == 'undefined') {
          newPost.comments = [];
      }
      req.store.posts.push(newPost);
      res.status(200).send({postId: postId});      
  },
  updatePost(req, res) {
      req.store.posts[req.params.postId].name = req.body.name;
      req.store.posts[req.params.postId].url = req.body.url;
      req.store.posts[req.params.postId].text = req.body.text;
      res.status(200).send(req.store.posts[req.params.postId]);
  },
  removePost(req, res) {
      req.store.posts.splice(req.params.postId,1);
      res.status(204).send();
  }
}