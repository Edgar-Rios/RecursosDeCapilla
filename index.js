const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const nochePelisRouter = require('./routes/nochePelis');


app.set('views', path.resolve(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.resolve(__dirname, 'src')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use(express.static(path.join(__dirname, 'src')));

// Simple middleware logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Home route
app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width,initial-scale=1"/>
                <title>Home - Express</title>
                <style>
                    body { font-family: Arial, Helvetica, sans-serif; padding: 2rem; }
                    header { margin-bottom: 1.5rem; }
                </style>
            </head>
            <body>
                <header>
                    <h1>Welcome to the Home Page</h1>
                    <p>This is a basic Express.js home route.</p>
                </header>
                <main>
                    <a href="/about">About</a>
                </main>
            </body>
        </html>
    `);
});

app.use('/noche-pelis', nochePelisRouter);

// Example additional route
app.get('/about', (req, res) => {
    res.send({ app: 'VotacionActividadJAS', env: process.env.NODE_ENV || 'development' });
});

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});