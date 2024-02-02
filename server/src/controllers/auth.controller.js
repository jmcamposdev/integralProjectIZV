import { Role } from '../models/Role.js'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
  const { username, email, password, role } = req.body

  // Validate that the username, email and password are not empty
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Username, email and password are required' })
    return
  }

  // Validate that the username and email are not already in use
  const foundEmail = await User.findOne({ where: { email } })
  if (foundEmail) {
    res.status(400).json({ message: 'Email already in use' })
    return
  }

  const foundUsername = await User.findOne({ where: { username } })
  if (foundUsername) {
    res.status(400).json({ message: 'Username already in use' })
    return
  }

  // Create the new user Object
  const newUser = new User({
    username,
    email,
    password: User.encryptPassword(password)
  })

  // Check if the role exists
  if (role) {
    // Find the role in the database
    const foundRole = await Role.findOne({ name: role })
    // If the role does not exist, return an error
    if (!foundRole) {
      res.status(400).json({ message: `Role ${role} does not exist` })
    } else { // If the role exists, assign it to the new user
      newUser.roleId = foundRole.id
    }
  } else { // If the role is not specified, assign the user role to the new user
    const userRole = await Role.findOne({ name: 'user' })
    newUser.roleId = userRole.id
  }

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

export const signIn = async (req, res) => {
  const { email, password } = req.body

  // Validate that the email and password are not empty
  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required' })
    return
  }

  // Validate that the user exists
  const user = await User.findOne({ where: { email } })

  if (!user) {
    res.status(400).json({ token: null, message: 'Email or password is incorrect' })
    return
  }

  // Validate that the password is correct
  const matchPassword = User.comparePassword(password, user.password)

  if (!matchPassword) {
    res.status(400).json({ token: null, message: 'Email or password is incorrect' })
    return
  }

  // Generate the token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 86400 // 24 hours
  })
  res.json({ token })
}
