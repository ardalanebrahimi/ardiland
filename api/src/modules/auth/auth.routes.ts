import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authService } from './auth.service';
import { randomUUID } from 'crypto';

interface LoginBody {
  username: string;
  password: string;
}

export const authRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  // POST /api/auth/login
  app.post<{ Body: LoginBody }>('/login', async (request, reply) => {
    try {
      const { username, password } = request.body;

      if (!username || !password) {
        return reply.status(400).send({
          success: false,
          error: 'Bad request',
          message: 'Username and password are required',
        });
      }

      const user = await authService.validateUser(username, password);
      if (!user) {
        return reply.status(401).send({
          success: false,
          error: 'Unauthorized',
          message: 'Invalid credentials',
        });
      }

      const token = randomUUID();
      await authService.createSession(user.id, token);

      return reply.send({
        success: true,
        data: {
          token,
          user: { id: user.id, username: user.username },
        },
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Login failed',
      });
    }
  });

  // POST /api/auth/logout
  app.post('/logout', async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader?.startsWith('Bearer ')) {
        return reply.send({ success: true });
      }

      const token = authHeader.slice(7);
      await authService.deleteSession(token);

      return reply.send({ success: true });
    } catch (error) {
      app.log.error(error);
      return reply.send({ success: true });
    }
  });

  // GET /api/auth/me - Check if authenticated
  app.get('/me', async (request, reply) => {
    try {
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

      return reply.send({
        success: true,
        data: { authenticated: true },
      });
    } catch (error) {
      app.log.error(error);
      return reply.status(500).send({
        success: false,
        error: 'Internal server error',
        message: 'Authentication check failed',
      });
    }
  });
};
