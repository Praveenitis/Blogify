const express = require('express');
const blogModel = require("../models/blogs");
const asyncHandler = require('express-async-handler');
const uploadOnCloudinary = require('../utils/uploadOnCloudinary');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const renderBlogPage = (req , res)=>{
    const user = req.user;
    return res.render("createBlog" , {user:user});
} 

const postBlogHandler = asyncHandler(async(req, res)=>{
    const {title , body} = req.body;
    let coverImageURL = null;

    try {
        if (req.file && req.file.buffer) {
            const fileResponse = await uploadOnCloudinary(req.file.buffer, req.file.originalname);
            coverImageURL = fileResponse && fileResponse.url;
            console.log("CoverImage Url value is : " , coverImageURL);
        }

        const newBlog = await blogModel.create({
            title: title,
            body: body,
            coverImageURL: coverImageURL,
            createdBy: req.user._id,
        });

        return res.redirect("/");
    } catch (error) {
        console.log("Some error happened on our side:", error);
        return res.status(500).render('404');
    }
})

const renderSinglePageBlog = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    try {
        const blogData = await blogModel.findById(id);
        if(!blogData) return res.status(404).render("404");
        return res.render("blog", {blog: blogData});
    } catch (error) {
        return res.status(404).render("404");
    }
        
})

module.exports ={
    renderBlogPage, 
    postBlogHandler,
    renderSinglePageBlog,
}   