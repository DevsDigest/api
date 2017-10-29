require('../infra/database');
const Post = require('../model/post');

function getLimit(limit = 0) {
  return +limit;
}

class Posts {
  all(req, res) {
    Post.find({}, null, { sort: { date: -1 }}, (err, posts) => {
      if (err) {
        res.status(403).send({ message: 'An error occurred', statusCode: 403, textError: err });
        return;
      }
      res.status(200).send(posts);
    }).limit(getLimit(req.query.limit));
  }

  byCategory(req, res) {
    let category = req.params.category;

    if (category) {
      Post.find({ category: category }, null, { sort: { date: -1 }}, (err, posts) => {
        if (err) {
          res.status(403).send({ message: 'An error occurred', statusCode: 403 });
          return;
        }

        if (posts.length > 0) {
          res.status(200).send(posts);
        } else {
          res.send({ message: `There is not posts in the ${category} category`, statusCode: 404, textError: err });
        }
      }).limit(getLimit(req.query.limit));
    }
  }
}

module.exports = Posts;