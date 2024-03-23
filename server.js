const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./members');
const app = express();
// init middleware
app.use(logger);
// Handlebars Middlewares
app.engine('handlebars', engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
// Body parser middleware
app.use(express.json()); // for parsing json data in req.body
app.use(express.urlencoded({extended: false})); // for parsing form data in server-rendered forms
// Home page route in case of server-side files rendering using handlebar
app.get('/', (req, res)=> {
    //   res.send('<h1>Hello World!!</h1>');
    // res.sendFile(path.join(__dirname, 'public', 'index.html'));
       
      res.render('index', {
        title: 'Member App',
        members
      });
    });
// set static folder in case of using express for creating api for frontend
app.use(express.static(path.join(__dirname, 'public')));


// members api routes
app.use('/api/members/', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
