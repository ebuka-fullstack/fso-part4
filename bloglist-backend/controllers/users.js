const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


//all users their blog populated
usersRouter.get('/', async(req, res) =>{
    const users = await User.find({}).populate('blogs', {
        url: 1,
        title: 1,
        author: 1,
        id: 1
    })
    res.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
    .populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
    })

  response.json(user)
})

//creating user with validation
usersRouter.post('/', async(req, res)=>{
    const {username,name,password} = req.body

    if(!password || password.length < 3) {
        return res.status(400).json({
            error: 'password must be at least 3 character long',
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({username, name, passwordHash})
    const savedUser = await user.save()
    res.status(201).json(savedUser)
})

module.exports = usersRouter