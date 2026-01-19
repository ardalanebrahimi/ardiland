import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { essaysService } from './essays.service';

export const essaysRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // GET /api/essays - List all essays
  app.get('/', async (_request, reply) => {
    try {
      const essays = await essaysService.findAll();
      return reply.send({
        success: true,
        data: essays,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch essays',
      });
    }
  });

  // GET /api/essays/featured - Get featured essays
  app.get('/featured', async (_request, reply) => {
    try {
      const essays = await essaysService.findFeatured();
      return reply.send({
        success: true,
        data: essays,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch featured essays',
      });
    }
  });

  // GET /api/essays/:slug - Get essay by slug
  app.get<{ Params: { slug: string } }>('/:slug', async (request, reply) => {
    try {
      const { slug } = request.params;
      const essay = await essaysService.findBySlug(slug);

      if (!essay) {
        return reply.status(404).send({
          success: false,
          error: 'Not found',
          message: `Essay with slug "${slug}" not found`,
        });
      }

      return reply.send({
        success: true,
        data: essay,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch essay',
      });
    }
  });
};
