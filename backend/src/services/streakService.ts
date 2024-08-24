import { PrismaClient } from '@prisma/client';
import {v4 as uuidv4} from 'uuid'

const prisma = new PrismaClient();

export const getStreaks = async (userId: string) => {
  return prisma.streak.findMany({ where: { userId } });
};

export const createStreak = async (userId: string, name: string) => {
  return prisma.streak.create({ data: { 
    id:uuidv4(),
    userId, 
    name 
  } });
};

export const increaseStreakCount = async (userId: string, streakId: string) => {
  const streak = await prisma.streak.findUnique({
    where: { id: streakId },
  });

  if (streak?.userId !== userId) {
    throw new Error("Streak does not belong to the user");
  }

  return prisma.streak.update({
    where: { id: streakId },
    data: { count: { increment: 1 } },
  });
};

export const deleteStreak = async (id: string, userId: string) => {
    const streak = await prisma.streak.findUnique({
    where: { id },
  });

  if (streak?.userId !== userId) {
    throw new Error("Streak does not belong to the user");
  }

  return prisma.streak.delete({
    where: { id },
  });
};

export const resetStreak = async (userId: string, streakId: string) => {
  return prisma.streak.update({
    where: { id: streakId },
    data: { count: 0 },
  });
};
