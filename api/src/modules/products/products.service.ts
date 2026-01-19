import { prisma } from '../../database/client';

export const productsService = {
  async findAll() {
    return prisma.product.findMany({
      orderBy: { sortOrder: 'asc' },
    });
  },

  async findFeatured() {
    return prisma.product.findMany({
      where: { featured: true },
      orderBy: { sortOrder: 'asc' },
      take: 4,
    });
  },

  async findBySlug(slug: string) {
    return prisma.product.findUnique({
      where: { slug },
    });
  },
};
