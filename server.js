const express = require('express');


//bring in mongoose
const mongoose = require('mongoose');

const blogRouter = require('./routes/blogs');
const fileRouter = require('./routes/fileRoutes');
const Blog = require('./models/Blog')
const app = express();

//connect to mongoose
mongoose.connect('mongodb://localhost/crudblog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});


//bring in method-override

const methodOverride = require('method-override');



//set template engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(methodOverride('_method'))

//route for the index
app.get('/', async(request, response) => {

    let blogs = await Blog.find().sort({ timeCreated: "desc" })

    response.render('index', { blogs: blogs });
});

app.use(express.static('public'));
app.use('/blogs', blogRouter);
//app.use('/fileRoutes', fileRouter);

//listen port
app.listen(5001);