import { PrismaClient } from '@prisma/client';
import {v4 as uuidv4} from 'uuid'

const prisma = new PrismaClient();

export const getStreaks = async (userId: string) => {
  return prisma.streak.findMany({ where: { userId } });
};

export const createStreak = async (userId: string, name: string) => {
  const existingStreak = await prisma.streak.findFirst({
    where: { 
      userId, 
      name: { 
        contains: name.toLowerCase()
      } 
    }
  });

  if (existingStreak) {
    throw new Error("The streak already exists, create another one");
  }

  return prisma.streak.create({ 
    data: { 
      id: uuidv4(),
      userId, 
      name,
      createdAt: new Date(),  
      lastUpdated: new Date()  
    } 
  });
};

export const increaseStreakCount = async (userId: string, streakId: string) => {
  const streak = await prisma.streak.findUnique({
    where: { id: streakId },
  });

  if (!streak || streak.userId !== userId) {
    throw new Error("Streak does not belong to the user");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const lastUpdated = new Date(streak.lastUpdated);
  lastUpdated.setHours(0, 0, 0, 0);

  const daysSinceLastUpdate = Math.floor((today.getTime() - lastUpdated.getTime()) / (1000 * 3600 * 24));

  if (daysSinceLastUpdate === 0) {
    // Streak already updated today, no change
    return streak;
  } else if (daysSinceLastUpdate === 1) {
    // Streak continued, increment count
    return prisma.streak.update({
      where: { id: streakId },
      data: { 
        count: { increment: 1 },
        lastUpdated: today
      },
    });
  } else {
    // Streak broken, reset count to 1
    return prisma.streak.update({
      where: { id: streakId },
      data: { 
        count: 1,
        lastUpdated: today
      },
    });
  }
};

export const deleteStreak = async (id: string, userId: string) => {
  const streak = await prisma.streak.findUnique({
    where: { id },
  });

  if (streak?.userId !== userId) {
    throw new Error("Streak does not belong to the user");
  }

  return prisma.streak.update({
    where: { id },
    data: { deletedAt: new Date() }
  });
};

export const resetStreak = async (userId: string, streakId: string) => {
  console.log(`Attempting to reset streak. UserId: ${userId}, StreakId: ${streakId}`);

  if (!streakId) {
    throw new Error("Invalid streakId");
  }

  const streak = await prisma.streak.findUnique({
    where: { id: streakId },
  });

  console.log(`Found streak:`, streak);

  if (!streak || streak.userId !== userId) {
    throw new Error("Streak does not belong to the user");
  }

  return prisma.streak.update({
    where: { id: streakId },
    data: { 
      count: 0,
      lastReset: new Date(),
      lastUpdated: new Date()
    },
  });
};

export const getStreakStats = async (userId: string) => {
  const streaks = await prisma.streak.findMany({ where: { userId } });
  
  let longestStreak = 0;
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  streaks.forEach(streak => {
    const createdDate = new Date(streak.lastReset);
    createdDate.setHours(0, 0, 0, 0);
    const lastUpdated = new Date(streak.lastUpdated);
    lastUpdated.setHours(0, 0, 0, 0);

    const daysSinceCreation = Math.floor((today.getTime() - createdDate.getTime()) / (1000 * 3600 * 24));
    const daysSinceLastUpdate = Math.floor((today.getTime() - lastUpdated.getTime()) / (1000 * 3600 * 24));

    if (daysSinceLastUpdate <= 1) {
      currentStreak = Math.min(streak.count, daysSinceCreation + 1);
    } else {
      currentStreak = 0;
    }

    longestStreak = Math.max(longestStreak, currentStreak);
  });

  return { longestStreak, currentStreak };
};