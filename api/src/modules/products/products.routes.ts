import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { productsService } from './products.service';

export const productsRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // GET /api/products - List all products
  app.get('/', async (_request, reply) => {
    try {
      const products = await productsService.findAll();
      return reply.send({
        success: true,
        data: products,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch products',
      });
    }
  });

  // GET /api/products/featured - Get featured products
  app.get('/featured', async (_request, reply) => {
    try {
      const products = await productsService.findFeatured();
      return reply.send({
        success: true,
        data: products,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch featured products',
      });
    }
  });

  // GET /api/products/:slug - Get product by slug
  app.get<{ Params: { slug: string } }>('/:slug', async (request, reply) => {
    try {
      const { slug } = request.params;
      const product = await productsService.findBySlug(slug);

      if (!product) {
        return reply.status(404).send({
          success: false,
          error: 'Not found',
          message: `Product with slug "${slug}" not found`,
        });
      }

      return reply.send({
        success: true,
        data: product,
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch product',
      });
    }
  });
};
