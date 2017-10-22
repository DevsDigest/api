const express = require('express');
const router = express.Router();
const Posts = require('./posts');
const posts = new Posts();

router.get('/', (req, res) => res.send('Server API running'));

router.get('/v1/posts', posts.all);
router.get('/v1/posts/:category', posts.byCategory);

module.exports = router;