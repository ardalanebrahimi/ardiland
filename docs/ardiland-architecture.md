# Architecture Requirements Document (ARD)
## Ardiland Website — Technical Architecture

**Version:** 1.0  
**Author:** Ardalan Ebrahimi  
**Status:** Ready for Development

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Monorepo                           │
├─────────────────────┬───────────────────────────────────┤
│   apps/web          │   apps/api                        │
│   (Angular 18+)     │   (Node.js + Express/Fastify)     │
├─────────────────────┼───────────────────────────────────┤
│   libs/shared       │   libs/api-interfaces             │
│   (Types, Utils)    │   (DTOs, Contracts)               │
└─────────────────────┴───────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   (Database)    │
                    └─────────────────┘
```

### 1.2 Technology Decisions

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Monorepo | Nx | Proven Angular support, task caching, dependency graph |
| Frontend | Angular 18+ | Familiar stack, signals for reactivity, SSR support |
| Backend | Node.js + Fastify | Performance, TypeScript native, lightweight |
| Database | PostgreSQL | Reliable, JSON support for flexible content |
| ORM | Prisma | Type-safe, great DX, migration support |
| Styling | Tailwind CSS | Utility-first, consistent with prototype |
| Deployment | Docker + Railway/Vercel | Simple, scalable |

---

## 2. Monorepo Structure

```
ardiland/
├── apps/
│   ├── web/                    # Angular frontend
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── core/       # Singleton services, guards, interceptors
│   │   │   │   ├── shared/     # Shared components, pipes, directives
│   │   │   │   ├── features/   # Feature modules
│   │   │   │   │   ├── home/
│   │   │   │   │   ├── products/
│   │   │   │   │   ├── essays/
│   │   │   │   │   ├── about/
│   │   │   │   │   ├── contact/
│   │   │   │   │   └── admin/  # P1
│   │   │   │   ├── app.component.ts
│   │   │   │   ├── app.config.ts
│   │   │   │   └── app.routes.ts
│   │   │   ├── assets/
│   │   │   ├── styles/
│   │   │   └── environments/
│   │   ├── project.json
│   │   └── tailwind.config.js
│   │
│   └── api/                    # Node.js backend
│       ├── src/
│       │   ├── modules/
│       │   │   ├── products/
│       │   │   │   ├── products.controller.ts
│       │   │   │   ├── products.service.ts
│       │   │   │   └── products.routes.ts
│       │   │   ├── essays/
│       │   │   ├── contact/    # P1
│       │   │   └── auth/       # P1
│       │   ├── shared/
│       │   │   ├── middleware/
│       │   │   ├── plugins/
│       │   │   └── utils/
│       │   ├── database/
│       │   │   ├── prisma/
│       │   │   │   ├── schema.prisma
│       │   │   │   ├── migrations/
│       │   │   │   └── seed.ts
│       │   │   └── client.ts
│       │   ├── app.ts
│       │   └── main.ts
│       ├── project.json
│       └── tsconfig.json
│
├── libs/
│   ├── shared/                 # Shared across apps
│   │   ├── types/
│   │   │   ├── product.types.ts
│   │   │   ├── essay.types.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── slug.utils.ts
│   │   │   └── date.utils.ts
│   │   └── constants/
│   │       └── status.constants.ts
│   │
│   └── api-interfaces/         # API contracts
│       ├── dto/
│       │   ├── product.dto.ts
│       │   └── essay.dto.ts
│       └── responses/
│           └── api-response.ts
│
├── tools/                      # Build/dev scripts
├── nx.json
├── package.json
├── tsconfig.base.json
└── docker-compose.yml
```

---

## 3. Frontend Architecture (Angular)

### 3.1 Module Structure

Using standalone components (Angular 18+ pattern):

```typescript
// app.routes.ts
export const appRoutes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.component') },
  { path: 'products', loadChildren: () => import('./features/products/products.routes') },
  { path: 'thinking', loadChildren: () => import('./features/essays/essays.routes') },
  { path: 'about', loadComponent: () => import('./features/about/about.component') },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component') },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.routes'), canActivate: [authGuard] },
];
```

### 3.2 State Management

Signal-based state for simplicity (no NgRx for v1):

```typescript
// core/services/products.service.ts
@Injectable({ providedIn: 'root' })
export class ProductsService {
  private http = inject(HttpClient);
  
  private productsSignal = signal<Product[]>([]);
  private loadingSignal = signal(false);
  private errorSignal = signal<string | null>(null);
  
  products = this.productsSignal.asReadonly();
  loading = this.loadingSignal.asReadonly();
  error = this.errorSignal.asReadonly();
  
  featuredProducts = computed(() => 
    this.productsSignal().filter(p => p.featured).slice(0, 4)
  );
  
  loadProducts(): void {
    this.loadingSignal.set(true);
    this.http.get<Product[]>('/api/products').subscribe({
      next: (products) => {
        this.productsSignal.set(products);
        this.loadingSignal.set(false);
      },
      error: (err) => {
        this.errorSignal.set(err.message);
        this.loadingSignal.set(false);
      }
    });
  }
}
```

### 3.3 Component Patterns

```typescript
// features/products/product-card/product-card.component.ts
@Component({
  selector: 'ard-product-card',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent],
  template: `
    <a [routerLink]="['/products', product().slug]" 
       class="block p-6 border border-gray-200 rounded-xl hover:border-gray-300 transition-all group">
      <div class="flex items-start justify-between mb-3">
        <h3 class="font-medium text-gray-900">{{ product().name }}</h3>
        <ard-status-badge [status]="product().status" />
      </div>
      <p class="text-sm text-gray-600 mb-4">{{ product().description }}</p>
      <span class="text-sm text-gray-500 group-hover:text-gray-700">Learn more →</span>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
}
```

### 3.4 SSR Configuration

Using Angular Universal for SEO:

```typescript
// app.config.server.ts
export const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideClientHydration(),
  ]
};
```

---

## 4. Backend Architecture (Node.js)

### 4.1 Fastify Setup

```typescript
// src/app.ts
import Fastify from 'fastify';
import cors from '@fastify/cors';
import { productsRoutes } from './modules/products/products.routes';
import { essaysRoutes } from './modules/essays/essays.routes';

export async function buildApp() {
  const app = Fastify({ logger: true });
  
  await app.register(cors, { origin: process.env.FRONTEND_URL });
  
  // Routes
  await app.register(productsRoutes, { prefix: '/api/products' });
  await app.register(essaysRoutes, { prefix: '/api/essays' });
  
  return app;
}
```

### 4.2 Module Pattern

```typescript
// src/modules/products/products.routes.ts
import { FastifyPluginAsync } from 'fastify';
import { ProductsService } from './products.service';

export const productsRoutes: FastifyPluginAsync = async (app) => {
  const service = new ProductsService();
  
  app.get('/', async () => {
    return service.findAll();
  });
  
  app.get<{ Params: { slug: string } }>('/:slug', async (request) => {
    return service.findBySlug(request.params.slug);
  });
  
  // Admin routes (P1)
  app.post('/', { preHandler: [authMiddleware] }, async (request) => {
    return service.create(request.body);
  });
};
```

### 4.3 Service Layer

```typescript
// src/modules/products/products.service.ts
import { prisma } from '../../database/client';
import { Product, CreateProductDto } from '@ardiland/api-interfaces';

export class ProductsService {
  async findAll(): Promise<Product[]> {
    return prisma.product.findMany({
      orderBy: [{ featured: 'desc' }, { sortOrder: 'asc' }],
    });
  }
  
  async findBySlug(slug: string): Promise<Product | null> {
    return prisma.product.findUnique({ where: { slug } });
  }
  
  async findFeatured(limit = 4): Promise<Product[]> {
    return prisma.product.findMany({
      where: { featured: true },
      take: limit,
      orderBy: { sortOrder: 'asc' },
    });
  }
  
  async create(data: CreateProductDto): Promise<Product> {
    return prisma.product.create({ data });
  }
}
```

---

## 5. Database Schema

### 5.1 Prisma Schema

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Product {
  id           String        @id @default(uuid())
  slug         String        @unique
  name         String
  description  String
  status       ProductStatus
  why          String        @db.Text
  problem      String        @db.Text
  currentState String        @db.Text @map("current_state")
  next         String        @db.Text
  ctaLabel     String?       @map("cta_label")
  ctaUrl       String?       @map("cta_url")
  githubUrl    String?       @map("github_url")
  featured     Boolean       @default(false)
  sortOrder    Int           @default(0) @map("sort_order")
  createdAt    DateTime      @default(now()) @map("created_at")
  updatedAt    DateTime      @updatedAt @map("updated_at")

  @@map("products")
}

model Essay {
  id        String   @id @default(uuid())
  slug      String   @unique
  title     String
  summary   String
  content   String   @db.Text
  featured  Boolean  @default(false)
  sortOrder Int      @default(0) @map("sort_order")
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  @@map("essays")
}

model ContactSubmission {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now()) @map("created_at")

  @@map("contact_submissions")
}

enum ProductStatus {
  live
  beta
  in_progress
  experiment
}
```

---

## 6. API Contracts

### 6.1 Endpoints

```
Public Endpoints
────────────────
GET    /api/products              → List all products
GET    /api/products/featured     → List featured products
GET    /api/products/:slug        → Get product by slug

GET    /api/essays                → List all essays
GET    /api/essays/featured       → List featured essays
GET    /api/essays/:slug          → Get essay by slug

POST   /api/contact               → Submit contact form (P1)

Admin Endpoints (P1)
────────────────────
POST   /api/auth/login            → Authenticate
POST   /api/products              → Create product
PUT    /api/products/:id          → Update product
DELETE /api/products/:id          → Delete product
POST   /api/essays                → Create essay
PUT    /api/essays/:id            → Update essay
DELETE /api/essays/:id            → Delete essay
```

### 6.2 Response Format

```typescript
// libs/api-interfaces/responses/api-response.ts
export interface ApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}
```

---

## 7. Deployment Architecture

### 7.1 Docker Setup

```dockerfile
# apps/api/Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nx build api --prod

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist/apps/api ./
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "main.js"]
```

```yaml
# docker-compose.yml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ardiland
      POSTGRES_USER: ardiland
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  api:
    build:
      context: .
      dockerfile: apps/api/Dockerfile
    environment:
      DATABASE_URL: postgresql://ardiland:${DB_PASSWORD}@db:5432/ardiland
      FRONTEND_URL: ${FRONTEND_URL}
    ports:
      - "3000:3000"
    depends_on:
      - db

volumes:
  postgres_data:
```

### 7.2 Environment Configuration

```
# .env.example
DATABASE_URL=postgresql://user:password@localhost:5432/ardiland
FRONTEND_URL=http://localhost:4200
JWT_SECRET=your-secret-key
NODE_ENV=development
```

---

## 8. Development Workflow

### 8.1 Nx Commands

```bash
# Development
nx serve web              # Start Angular dev server
nx serve api              # Start API dev server
nx run-many -t serve      # Start both

# Building
nx build web --prod       # Production build
nx build api --prod

# Testing
nx test web               # Unit tests
nx e2e web-e2e            # E2E tests

# Database
npx prisma migrate dev    # Run migrations
npx prisma db seed        # Seed data
npx prisma studio         # Database GUI
```

### 8.2 Git Workflow

```
main           → Production
├── develop    → Integration
    ├── feature/home-page
    ├── feature/products-crud
    └── fix/mobile-nav
```

---

## 9. Security Considerations

### 9.1 Headers (Helmet-style)

```typescript
app.register(helmet, {
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});
```

### 9.2 Rate Limiting

```typescript
app.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
});
```

### 9.3 Input Validation

Using Zod for request validation:

```typescript
const createProductSchema = z.object({
  name: z.string().min(1).max(100),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().min(1).max(200),
  status: z.enum(['live', 'beta', 'in_progress', 'experiment']),
  // ...
});
```

---

## 10. Monitoring & Observability

### 10.1 Logging

Structured JSON logging with Pino (Fastify default):

```typescript
app.log.info({ productId: id }, 'Product created');
```

### 10.2 Health Check

```typescript
app.get('/health', async () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  database: await checkDatabaseConnection(),
}));
```

---

## 11. Future Considerations

### Scalability Path
- CDN for static assets
- Redis for caching (if needed)
- Database read replicas (if traffic grows)

### Feature Additions
- CMS integration (Strapi, Payload) if content complexity grows
- Search (Algolia, Meilisearch) if content volume grows
- i18n support when translations needed

---

**End of Architecture Document**
