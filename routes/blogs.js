//blog routes

const express = require('express');
const Blog = require('./../models/Blog');
const router = express.Router();
const multer = require('multer');

//define storage for the images

const storage = multer.diskStorage({
    //destination for files
    destination: function(request, file, callback) {
        callback(null, './public/uploads/images');
    },

    //add back the extension
    filename: function(request, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
});

//upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024 * 1024 * 3,
    },
});

router.get('/new', async(request, response) => {

    let blog = new Blog({
        name: "Name", //request.body.name,
        company: "", //request.body.company,
        designation: "", //request.body.designation,
        phone_no: "", //request.body.phone_no,
        address: "", //request.body.address,
        img: "", //request.file.filename,
        year_of_establishment: "", //request.body.year_of_establishment,
        description: "", //request.body.description,
        product_name: "", //request.body.product_name,
        product_desc: "", // request.body.product_desc,
        product_img: "", //request.file.filename,
    });

    try {
        blog = await blog.save();
        var id = blog._id;
        response.redirect(`/blogs/addPersonal/${blog.id}`);
        //response.redirect('blogs/editAbout/:id');
        //response.redirect(`blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
    }
});

router.get('/addPersonal/:id', async(request, response) => {
    let blog = await Blog.findById(request.params.id);
    response.render('addPersonal', { blog: blog });
});

router.put('/addPersonal/:id', upload.single('img'), async(request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.name = request.body.name;
    blog.company = request.body.company;
    blog.designation = request.body.designation;
    blog.phone_no = request.body.phone_no;
    blog.email = request.body.email;
    blog.address = request.body.address;
    blog.img = request.file.filename;


    try {
        blog = await blog.save();
        //redirect to the view route
        response.redirect(`/blogs/editAbout/${blog.id}`);
        //response.redirect("/blogs/index");
        //response.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
        response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
    }
});

router.get('/editPersonal/:id', async(request, response) => {
    let blog = await Blog.findById(request.params.id);
    response.render('editPersonal', { blog: blog });
});

router.put('/editPersonal/:id', /*upload.single('img'), */ async(request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.company = request.body.company;
    blog.name = request.body.name;
    blog.designation = request.body.designation;
    blog.phone_no = request.body.phone_no;
    blog.email = request.body.email;
    blog.address = request.body.address;
    //blog.img = request.file.filename;


    try {
        blog = await blog.save();
        var id = blog._id;
        //redirect to the view route
        response.redirect(`/blogs/editAbout/${blog.id}`);
        //response.redirect("/blogs/index");
        //response.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
        response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
    }
});

router.get('/editAbout/:id', async(request, response) => {
    let blog = await Blog.findById(request.params.id);
    response.render('editAbout', { blog: blog });
});

router.put('/editAbout/:id', async(request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.year_of_establishment = request.body.year_of_establishment;
    blog.description = request.body.description;

    try {
        blog = await blog.save();
        response.redirect(`/blogs/editProduct/${blog.id}`);
        //redirect to the view route
        //response.redirect("/blogs/index");
        //response.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
        response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
    }
});

router.get('/editProduct/:id', async(request, response) => {
    let blog = await Blog.findById(request.params.id);
    response.render('editProduct', { blog: blog });
});


router.put('/editProduct/:id', upload.single('productimg'), async(request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    console.log(request.body);
    console.log(request.file);
    blog.product_name = request.body.product_name;
    blog.product_desc = request.body.product_desc;
    blog.product_img = request.file.filename;
    try {
        blog = await blog.save();
        //redirect to the view route
        response.redirect(`/blogs/show/${blog.id}`);
        //response.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
        response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
    }
});

router.get('/show/:id', async(request, response) => {
    let blog = await Blog.findById(request.params.id);
    response.render('show', { blog: blog });
});

//view route
router.get('/:slug', async(request, response) => {
    let blog = await Blog.findOne({ slug: request.params.slug });

    if (blog) {
        response.render('show', { blog: blog });
    } else {
        response.redirect('/');
    }
});



//route that handles new post - main
router.post('/', upload.single('image'), async(request, response) => {
    console.log(request.file);
    console.log(request.body);
    let blog = new Blog({
        name: request.body.name,
        company: request.body.company,
        designation: request.body.designation,
        phone_no: request.body.phone_no,
        address: request.body.address,
        img: request.file.filename,
        year_of_establishment: "", //request.body.year_of_establishment,
        description: "", //request.body.description,
        product_name: "", //request.body.product_name,
        product_desc: "", // request.body.product_desc,
        product_img: "", //request.file.filename,
    });

    try {
        blog = await blog.save();
        //response.redirect('blogs/editAbout/:id');
        //response.redirect(`blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
    }
});





// route that handles edit view
router.get('/edit/:id', async(request, response) => {
    let blog = await Blog.findById(request.params.id);
    response.render('edit', { blog: blog });
});

//route to handle updates
router.put('/:id', async(request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.name = request.body.name;
    blog.company = request.body.company;
    blog.designation = request.body.designation;
    blog.phone_no = request.body.phone_no;
    blog.address = request.body.address;

    try {
        blog = await blog.save();
        //redirect to the view route
        response.redirect(`/blogs/${blog.slug}`);
    } catch (error) {
        console.log(error);
        response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
    }
});

///route to handle delete
router.delete('/:id', async(request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.redirect('/');
});

module.exports = router;