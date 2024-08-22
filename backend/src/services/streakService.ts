import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

class StreaksService {
  async updateStreak(userId: string, streakId: string, data: { title?: string; count?: number }) {
    try {
      return await prisma.streak.update({
        where: {
          id: streakId,
          userId,
        },
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
        // Record to update not found
        throw new Error(`Streak with ID ${streakId} not found for user ${userId}`);
      } else {
        throw error;
      }
    }
  }

  async deleteStreak(userId: string, streakId: string) {
    await prisma.streak.delete({
      where: {
        id: streakId,
        userId,
      },
    });
  }

  async incrementStreakCount(userId: string, streakId: string) {
    return await prisma.streak.update({
      where: {
        id: streakId,
        userId,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  }

  async getStreaks(userId: string) {
    return await prisma.streak.findMany({
      where: {
        userId,
      },
    });
  }

  async resetStreakCounter(userId: string) {
    await prisma.streak.updateMany({
      where: {
        userId,
      },
      data: {
        count: 0,
      },
    });
  }

  async getLongestStreak(userId: string) {
    const streaks = await prisma.streak.findMany({
      where: {
        userId,
      },
      orderBy: {
        count: 'desc',
      },
      take: 1,
    });

    return streaks[0] || null;
  }

  async getUpdatedStreaks(userId: string) {
    return await prisma.streak.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      take: 5,
    });
  }
}

export default new StreaksService();