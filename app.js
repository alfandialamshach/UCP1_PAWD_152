const express = require('express');
const app = express();

const dokterrayRoutes = require('./routes/dokter.js');

require('dotenv').config();
const port = process.env.PORT;
const db = require('./database/db');
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session');
const methodOverride = require('method-override');
const dokterRoutes = require('./routes/dokter.js');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware.js');

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.json());




// Middleware untuk mendukung HTTP PUT dan DELETE
app.use(methodOverride('_method'));
// Konfigurasi express-session
app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

app.use('/dokter', dokterRoutes);
app.use('/', authRoutes);
app.use('/dokterlist', dokterrayRoutes);

app.set('view engine', 'ejs');
app.set('views', './views');




app.get('/dokter', (req, res) => {
    res.render('',{
        layout: 'layouts/main-layout'
    });
});

app.get('/',isAuthenticated, (req, res) => {
    res.render('index',{
        layout: 'layouts/main-layout'
    });
});






app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});