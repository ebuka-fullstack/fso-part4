const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
      })

    res.json(blogs)
  } catch (error) {
    next(error)
  }
})


blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', {
        username: 1,
        name: 1,
      })

    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})


blogsRouter.post('/', async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({
        error: 'token invalid',
      })
    }

    const body = req.body

    if (!body.title || !body.url) {
      return res.status(400).json({
        error: 'title and url are required',
      })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const populatedBlog = await Blog.findById(savedBlog._id).populate('user', {
        username: 1,
        name: 1,
      })

    res.status(201).json(populatedBlog)
  } catch (error) {
    next(error)
  }
})


blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({
        error: 'token invalid',
      })
    }

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        error: 'blog not found',
      })
    }

    
    const updatedData = {
      title: req.body.title,
      author: req.body.author,
      url: req.body.url,
      likes: req.body.likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        returnDocument: 'after',
        runValidators: true,
        context: 'query',
      }
    ).populate('user', {
      username: 1,
      name: 1,
    })

    res.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})


blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const user = req.user

    if (!user) {
      return res.status(401).json({
        error: 'token invalid',
      })
    }

    const blog = await Blog.findById(req.params.id)

    if (!blog) {
      return res.status(404).json({
        error: 'blog not found',
      })
    }

    
    if (blog.user.toString() !== user._id.toString()) {
      return res.status(403).json({
        error: 'only the creator can delete this blog',
      })
    }

    await Blog.findByIdAndDelete(req.params.id)

    // Remove blog from user's blogs array
    const blogOwner = await User.findById(blog.user)

    blogOwner.blogs = blogOwner.blogs.filter(id => id.toString() !== blog._id.toString())

    await blogOwner.save()

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter