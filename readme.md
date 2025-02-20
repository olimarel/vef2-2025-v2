brew services start postgresql
psql postgres
vef2_2025

npm run dev

or for production:
npm start

Populate db
node src/seed.js

view db:
psql -d vef2_2025


public.categories_id_seq