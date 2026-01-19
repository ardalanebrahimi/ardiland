import * as bcrypt from 'bcryptjs';
import { prisma } from '../../database/client';

export const authService = {
  async validateUser(username: string, password: string) {
    const user = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return null;
    }

    return { id: user.id, username: user.username };
  },

  async createSession(userId: string, token: string) {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    return prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
      },
    });
  },

  async validateSession(token: string) {
    const session = await prisma.session.findUnique({
      where: { token },
    });

    if (!session) {
      return null;
    }

    if (session.expiresAt < new Date()) {
      await prisma.session.delete({ where: { id: session.id } });
      return null;
    }

    return session;
  },

  async deleteSession(token: string) {
    try {
      await prisma.session.delete({ where: { token } });
      return true;
    } catch {
      return false;
    }
  },
};
