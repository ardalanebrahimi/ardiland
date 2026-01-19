import { prisma } from '../../database/client';

export const essaysService = {
  async findAll() {
    return prisma.essay.findMany({
      orderBy: { sortOrder: 'asc' },
      take: 12, // Max 12 essays as per PRD
    });
  },

  async findFeatured() {
    return prisma.essay.findMany({
      where: { featured: true },
      orderBy: { sortOrder: 'asc' },
      take: 3,
    });
  },

  async findBySlug(slug: string) {
    return prisma.essay.findUnique({
      where: { slug },
    });
  },
};
