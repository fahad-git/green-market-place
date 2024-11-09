const Blog = require("../models/BlogModel");

exports.getBlogs = async (req, res) => {
  try {
        const blogResponse = await Blog.find({});
        res.status(200).json(blogResponse);
    } catch(error){
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Failed to get blogs"});
    }
};

exports.getBlog = async (req, res) => {
    const blogId = req.params.blogId;
    try {
        const blogResponse = await Blog.findById({_id: blogId});
        res.status(200).json(blogResponse);
    } catch(error){
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Failed to get blog."});
    }
};

exports.createBlog = async (req, res) => {
    const {title, author, imageFile, content, userId} = req.body;
    const publishedDate = Date.now();
    const updatedDate = "";
    
    const blog = new Blog({title, author, content, imageFile, content, publishedDate, updatedDate, authorId: userId});
    
    try {
        const blogRes = await blog.save()
        res.status(200).send({ message: "Blog created successfully", blog: blogRes });
    } catch(error){
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Failed to create blog."});
    }
};

exports.updateBlog = async (req, res) => {
    const {title, author, imageFile, content} = req.body;
    const blogId = req.params.blogId;
    const updatedDate = Date.now();

    try {
        const blogResponse = await Blog.findByIdAndUpdate({ "_id": blogId }, { "$set": {"title": title, "author": author, "imageFile": imageFile, "content": content, "updatedDate": updatedDate}});
        res.status(200).send({ message: "Blog updated successfully", blog: blogResponse });
    } catch(error){
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Failed to update blog."});
    }
};

exports.deleteBlog = async (req, res) => {
    const blogId = req.params.blogId;    
    try {
        const blogResponse = await Blog.findByIdAndDelete({_id: blogId});
        res.status(200).send({ message: "Blog deleted successfully", blog: blogResponse });
    } catch(error){
        console.log(`Error: ${error.message}`);
        res.status(500).json({message: "Failed to delete blog."});
    }
};