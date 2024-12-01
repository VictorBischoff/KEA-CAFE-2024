# Fullstack opgave KEA Victor Simon BACKEND

## Opsætning af projektet
1. lav en .env fil i roden af projektet

```
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3316
DB_USER=admin
DB_PASSWORD=adminadmin
DB_NAME=cafe_finder_db

# JWT Configuration
JWT_SECRET=your_secure_secret_key
JWT_EXPIRES_IN=1d

# CORS Configuration
CORS_WHITELIST=http://localhost:3000, http://localhost:5000

# Logging Configuration
LOG_LEVEL=debug
```

2. Kør `npm install` for at installere alle nødvendige pakker
3. Kør `npx sequelize-cli db:create && npx sequelize-cli db:migrate` for at oprette databasen og køre migrationer
4. Kør ` npx sequelize-cli db:seed:all` for at indsætte mock data i databasen
5. Kør `npm run dev` for at starte serveren

