const blogRouter = require('express').Router()
const blogNote = require('../models/blogNote')
const User = require('../models/user')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {

    const blogs = await blogNote
    .find({}).populate('user', { username: 1, name: 1 })

    if (blogs) {
        response.json(blogs)
    } else {
        response.status(404)
    }
})

blogRouter.get('/:id', async (request, response) => {

    const blog = await blogNote.findById(request.params.id).populate('user', { username: 1, name: 1 })

    if (blog) {
        response.json(blog)
    } else {
        response.status(404)
    }
})

blogRouter.delete('/:id', async (request, response) => {
    const user = request.user
    //const decodedToken = jwt.verify(request.token, process.env.SECRET)
    const blog = await blogNote.findById(request.params.id).populate('user')
    if (!blog) {
        return response.status(404).json({ error: 'Blog not found' });
      }
    if (user.id.toString() !== blog.user.id.toString()) {
      return response.status(401).json({ error: 'token invalid' })
    }
    await blogNote.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const body = request.body;
    const update = await blogNote.findByIdAndUpdate(request.params.id, body);

    if (!update) {
        return response.status(404).json({ error: 'Blog not found' });
    }

    response.status(204).end();
});


blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user
   // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //  if (!user.id) {
    //  return response.status(401).json({ error: 'userID not found' })
   // }
   // const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'user not found' });
  }
    const blog = new blogNote(
        {
            author: body.author,
            title: body.title,
            url: body.url,
            likes: body.likes === undefined ? 0 : body.likes,
            user: user.id
        }
    )
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.status(201).json(savedBlog);
});

module.exports = blogRouter