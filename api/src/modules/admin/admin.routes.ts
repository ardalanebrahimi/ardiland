import { FastifyInstance, FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { authService } from '../auth/auth.service';
import { prisma } from '../../database/client';

// Auth middleware
async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return reply.status(401).send({
      success: false,
      error: 'Unauthorized',
      message: 'No token provided',
    });
  }

  const token = authHeader.slice(7);
  const session = await authService.validateSession(token);

  if (!session) {
    return reply.status(401).send({
      success: false,
      error: 'Unauthorized',
      message: 'Invalid or expired token',
    });
  }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const adminRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // Apply auth to all admin routes
  app.addHook('preHandler', authenticate);

  // ==================== PRODUCTS ====================

  // GET /api/admin/products
  app.get('/products', async (_request, reply) => {
    try {
      const products = await prisma.product.findMany({
        orderBy: { sortOrder: 'asc' },
      });
      return reply.send({ success: true, data: products });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch products',
      });
    }
  });

  // POST /api/admin/products
  app.post<{ Body: Record<string, unknown> }>('/products', async (request, reply) => {
    try {
      const body = request.body;
      const slug = body.slug as string || generateSlug(body.name as string);

      const product = await prisma.product.create({
        data: {
          slug,
          name: body.name as string,
          description: body.description as string,
          status: (body.status as string) || 'experiment',
          why: body.why as string,
          problem: body.problem as string,
          currentState: body.currentState as string,
          next: body.next as string,
          ctaLabel: body.ctaLabel as string | undefined,
          ctaUrl: body.ctaUrl as string | undefined,
          githubUrl: body.githubUrl as string | undefined,
          demoUrl: body.demoUrl as string | undefined,
          featured: (body.featured as boolean) || false,
          sortOrder: (body.sortOrder as number) || 0,
          iconInitials: body.iconInitials as string | undefined,
          iconColor: body.iconColor as string | undefined,
          image: body.image as string | undefined,
          screenshots: body.screenshots ? JSON.stringify(body.screenshots) : undefined,
          techStack: body.techStack ? JSON.stringify(body.techStack) : undefined,
        },
      });

      return reply.status(201).send({ success: true, data: product });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to create product',
      });
    }
  });

  // PUT /api/admin/products/:id
  app.put<{ Params: { id: string }; Body: Record<string, unknown> }>('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const body = request.body;

      const product = await prisma.product.update({
        where: { id },
        data: {
          name: body.name as string | undefined,
          description: body.description as string | undefined,
          status: body.status as string | undefined,
          why: body.why as string | undefined,
          problem: body.problem as string | undefined,
          currentState: body.currentState as string | undefined,
          next: body.next as string | undefined,
          ctaLabel: body.ctaLabel as string | undefined,
          ctaUrl: body.ctaUrl as string | undefined,
          githubUrl: body.githubUrl as string | undefined,
          demoUrl: body.demoUrl as string | undefined,
          featured: body.featured as boolean | undefined,
          sortOrder: body.sortOrder as number | undefined,
          iconInitials: body.iconInitials as string | undefined,
          iconColor: body.iconColor as string | undefined,
          image: body.image as string | undefined,
          screenshots: body.screenshots ? JSON.stringify(body.screenshots) : undefined,
          techStack: body.techStack ? JSON.stringify(body.techStack) : undefined,
        },
      });

      return reply.send({ success: true, data: product });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to update product',
      });
    }
  });

  // DELETE /api/admin/products/:id
  app.delete<{ Params: { id: string } }>('/products/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      await prisma.product.delete({ where: { id } });
      return reply.send({ success: true });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to delete product',
      });
    }
  });

  // ==================== ESSAYS ====================

  // GET /api/admin/essays
  app.get('/essays', async (_request, reply) => {
    try {
      const essays = await prisma.essay.findMany({
        orderBy: { sortOrder: 'asc' },
      });
      return reply.send({ success: true, data: essays });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch essays',
      });
    }
  });

  // POST /api/admin/essays
  app.post<{ Body: Record<string, unknown> }>('/essays', async (request, reply) => {
    try {
      const body = request.body;
      const slug = body.slug as string || generateSlug(body.title as string);

      const essay = await prisma.essay.create({
        data: {
          slug,
          title: body.title as string,
          summary: body.summary as string,
          content: body.content as string,
          featured: (body.featured as boolean) || false,
          sortOrder: (body.sortOrder as number) || 0,
        },
      });

      return reply.status(201).send({ success: true, data: essay });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to create essay',
      });
    }
  });

  // PUT /api/admin/essays/:id
  app.put<{ Params: { id: string }; Body: Record<string, unknown> }>('/essays/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      const body = request.body;

      const essay = await prisma.essay.update({
        where: { id },
        data: {
          title: body.title as string | undefined,
          summary: body.summary as string | undefined,
          content: body.content as string | undefined,
          featured: body.featured as boolean | undefined,
          sortOrder: body.sortOrder as number | undefined,
        },
      });

      return reply.send({ success: true, data: essay });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to update essay',
      });
    }
  });

  // DELETE /api/admin/essays/:id
  app.delete<{ Params: { id: string } }>('/essays/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      await prisma.essay.delete({ where: { id } });
      return reply.send({ success: true });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to delete essay',
      });
    }
  });

  // ==================== CONTACT SUBMISSIONS ====================

  // GET /api/admin/messages
  app.get('/messages', async (_request, reply) => {
    try {
      const messages = await prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return reply.send({ success: true, data: messages });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch messages',
      });
    }
  });

  // PUT /api/admin/messages/:id/read
  app.put<{ Params: { id: string } }>('/messages/:id/read', async (request, reply) => {
    try {
      const { id } = request.params;
      const message = await prisma.contactSubmission.update({
        where: { id },
        data: { read: true },
      });
      return reply.send({ success: true, data: message });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to mark message as read',
      });
    }
  });

  // DELETE /api/admin/messages/:id
  app.delete<{ Params: { id: string } }>('/messages/:id', async (request, reply) => {
    try {
      const { id } = request.params;
      await prisma.contactSubmission.delete({ where: { id } });
      return reply.send({ success: true });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Failed to delete message',
      });
    }
  });
};
