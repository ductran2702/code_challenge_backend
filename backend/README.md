# Express TypeScript CRUD Server

## Requirements
- Node.js (v14+)
- npm
- PostgreSQL (local or remote instance)

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure PostgreSQL:**
   - Create a database (default: `testdb`).
   - Ensure a user with access (default: `postgres`/`password`).
   - You can override connection settings with environment variables:
     - `PGUSER` (default: `postgres`)
     - `PGHOST` (default: `localhost`)
     - `PGDATABASE` (default: `testdb`)
     - `PGPASSWORD` (default: `password`)
     - `PGPORT` (default: `5432`)

   Example using a `.env` file (create in `backend/`):
   ```env
   PGUSER=youruser
   PGHOST=localhost
   PGDATABASE=yourdb
   PGPASSWORD=yourpassword
   PGPORT=5432
   ```

3. **Build and run the server:**
   - For development (auto-reload):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm run build
     npm start
     ```

4. **Health check:**
   - Visit [http://localhost:3000/health](http://localhost:3000/health)

5. **API Documentation:**
   - Swagger UI is available at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
   - Interactive documentation for all CRUD endpoints
   - Test API endpoints directly from the browser

## Next Steps
- Implement CRUD endpoints in `src/`.
- Add database schema migrations or table creation logic as needed. 

## Using Docker Compose

1. Build and start the services:
   ```bash
   docker-compose up --build
   ```
   This will start both the backend server and a PostgreSQL database.

2. The backend will be available at [http://localhost:3000](http://localhost:3000)

3. The database will be available on port 5432 (default credentials are set in `docker-compose.yml`).

4. To stop the services:
   ```bash
   docker-compose down
   ``` 