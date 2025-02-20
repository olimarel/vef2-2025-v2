import express from 'express';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import questionRouter from './routes/question.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandlers.js';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// Determine the current directory:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set EJS as the view engine
app.set('view engine', 'ejs');
// Configure Express to look for views in src/views:
app.set('views', path.join(__dirname, 'views')); // if server.js is in src/

//app.get('/', (req, res) => {
//  res.render('index');
//});

// Set EJS as view engine
app.set('view engine', 'ejs');

// Parse JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static('public'));

// Routes
app.use('/', indexRouter);
app.use('/questions', questionRouter);

// 404 handler
app.use(notFoundHandler);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
