const express = require('express');
const app = express();

require('dotenv').config();
const port = process.env.PORT;
const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware.js');

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.json());

// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use('/', authRoutes);


app.set('view engine', 'ejs');


app.get('/',isAuthenticated, (req, res) => {
    res.render('index',{
        layout: 'layouts/main-layout'
    });
});

app.get('/pengeloladdokter', (req, res) => {
    res.render('pengeloladokter'); // Render pengeloladdokter.ejs
});




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});