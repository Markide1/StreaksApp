import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class StreaksService {
  async createStreak(userId: string, title: string) {
    return await prisma.streak.create({
      data: {
        title,
        count: 1,
        userId,
      },
    });
  }

  async updateStreak(userId: string, streakId: string, data: { title?: string; count?: number }) {
    return await prisma.streak.update({
      where: {
        id: streakId,
        userId,
      },
      data,
    });
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