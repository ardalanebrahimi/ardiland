import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { prisma } from '../../database/client';

export const healthRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/health', async (_request, reply) => {
    try {
      // Check database connection
      await prisma.$queryRaw`SELECT 1`;

      return reply.send({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'connected',
        },
      });
    } catch (error) {
      return reply.status(503).send({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          database: 'disconnected',
        },
      });
    }
  });
};
