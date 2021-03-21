import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Carthik Naren',
    email: 'naren@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'P R Akash',
    email: 'prakash@yahoo.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
