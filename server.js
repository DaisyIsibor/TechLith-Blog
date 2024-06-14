// All connections to the PORT 3001 and all requires
require('dotenv').config(); // Load environment variables from .env file
const path = require('path');
const express = require('express');
const session = require('express-session');
const sequelize = require('./config/connection');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers,
    partialsDir: path.join(__dirname, 'views/partials')
 });

const sess = {
secret: 'Super secret secret',
cookie: {maxAge: 400000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',},
resave: false,
saveUninitialized: true,
store: new SequelizeStore({
    db: sequelize
})
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
app.listen(PORT, () => console.log(`Now listening on port http://localhost:${PORT}`));
// app.listen(PORT, () => console.log('Now listening'));
});

// Log database credentials
console.log("Database user:", process.env.DB_USER);
console.log("Database password:", process.env.DB_PASSWORD);