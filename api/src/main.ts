import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables from root .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Also try local .env
dotenv.config();

import { buildApp } from './app';

const PORT = parseInt(process.env['PORT'] || '3000', 10);
const HOST = process.env['HOST'] || '0.0.0.0';

async function main() {
  const app = await buildApp();

  try {
    await app.listen({ port: PORT, host: HOST });
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Products API: http://localhost:${PORT}/api/products`);
    console.log(`Essays API: http://localhost:${PORT}/api/essays`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
