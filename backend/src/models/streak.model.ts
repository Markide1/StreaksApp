import { Streak } from '@prisma/client'

export interface StreakModel extends Streak {
  // You can extend the Streak type here if needed
}

export interface CreateStreakInput {
  title: string
  userId: string
}

export interface UpdateStreakInput {
  title?: string
  count?: number
}