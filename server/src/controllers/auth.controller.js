import { Role } from '../models/Role.js'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export const signUp = (req, res) => {
  const { username, email, password, role } = req.body

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: User.encryptPassword(password)
  })

  // Save the new user in the database
  newUser.save()
    .then(user => {
      jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
      }, (err, token) => {
        if (err) {
          res.status(500).json({ message: err })
          return
        }
        res.json({ token })
      })
    })
    .catch(err => res.status(500).json({ message: err }))
}

export const signIn = (req, res) => {
  res.json('signin')
}
