import { User } from '@prisma/client'

export interface UserModel extends User {
  // You can extend the User type here if needed
}

export interface CreateUserInput {
  email: string
  password: string
}

export interface LoginUserInput {
  email: string
  password: string
}