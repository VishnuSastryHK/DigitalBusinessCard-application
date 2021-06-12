const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const domPurifier = require('dompurify');
const { JSDOM } = require('jsdom');
const htmlPurify = domPurifier(new JSDOM().window);

//initialize slug
mongoose.plugin(slug);
const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        //default: "Name",
        //required: true,
    },
    img: {
        type: String,
        //default: 'placeholder.jpg',
    },
    company: {
        type: String,
        //required: true,
    },
    designation: {
        type: String,
    },
    phone_no: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    year_of_establishment: {
        type: String,
    },
    description: {
        type: String,
    },
    product_name: {
        type: String,
    },
    product_desc: {
        type: String,
    },
    product_img: {
        type: String,
    },


    timeCreated: {
        type: Date,
        default: () => Date.now(),
    },
    /*snippet: {
        type: String,
    },*/

    slug: { type: String, slug: 'name', unique: true, slug_padding_size: 2 },
});



module.exports = mongoose.model('Blog', blogSchema);