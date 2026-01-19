import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { productsRoutes } from './modules/products/products.routes';
import { essaysRoutes } from './modules/essays/essays.routes';
import { healthRoutes } from './modules/health/health.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { adminRoutes } from './modules/admin/admin.routes';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger: {
      level: process.env['NODE_ENV'] === 'development' ? 'info' : 'warn',
    },
  });

  // Register plugins
  await app.register(cors, {
    origin: process.env['CORS_ORIGIN'] || 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  await app.register(helmet, {
    contentSecurityPolicy: false, // Disable for development
  });

  // Register routes
  await app.register(healthRoutes);
  await app.register(productsRoutes, { prefix: '/api/products' });
  await app.register(essaysRoutes, { prefix: '/api/essays' });
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(adminRoutes, { prefix: '/api/admin' });

  return app;
}
