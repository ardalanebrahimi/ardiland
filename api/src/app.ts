import Fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import fastifyStatic from '@fastify/static';
import * as path from 'path';
import * as fs from 'fs';
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

  // Register API routes
  await app.register(healthRoutes);
  await app.register(productsRoutes, { prefix: '/api/products' });
  await app.register(essaysRoutes, { prefix: '/api/essays' });
  await app.register(authRoutes, { prefix: '/api/auth' });
  await app.register(adminRoutes, { prefix: '/api/admin' });

  // Serve static files in production
  // In production, public folder is at the root level (../../public from api/src/)
  const staticPath = path.join(__dirname, '..', '..', 'public');
  if (fs.existsSync(staticPath)) {
    await app.register(fastifyStatic, {
      root: staticPath,
      prefix: '/',
    });

    // SPA fallback - serve index.html for non-API routes
    app.setNotFoundHandler((request, reply) => {
      if (!request.url.startsWith('/api/') && !request.url.startsWith('/health')) {
        return reply.sendFile('index.html');
      }
      return reply.status(404).send({ error: 'Not found' });
    });
  }

  return app;
}
