const express = require("express");
const io = require("./utils/io");
const Blog = require("./models/blog");

const Blogs = new io("./database/blog.json");

const app = express();

app.use(express.json());

app.post("/blog", async(req, res) => {
    const { title, description } = req.body;
    if ((!title, description))
        return res
            .status(400)
            .json({ message: "Title and Description is required" });

    const blogs = await Blogs.read();
    const id = (blogs[blogs.lengtn - 1].id || 0) + 1;

    const newBlog = new Blog(id, title, description);

    const data = blogs.lengtn ? [...blogs, newBlog] : [newBlog];

    await Blogs.write(data);
    res.status(201).json({ message: "Successfully created" });
});

app.get("/blogs", async(req, res) => {
    const blogs = await Blogs.read();

    res.json({ blogs });
});

app.put("/blog/:id", async(req, res) => {
    const { id } = req.params;

    const { title, description } = req.body;
    const blogs = await Blogs.read();
    const findBlog = blogs.find((blog) => blog.id == id);

    if (!findBlog) return res.status(404).json({ message: "404 NOT FOUND" });
    findBlog.title = title ? title : findBlog.title;
    findBlog.description = description ? description : findBlog.description;

    await Blogs.write(blogs);
    res.json({ message: "Successfully updated" });
});

app.delete("/blog/:id", async(req, res) => {
    const { id } = req.params;

    const blogs = await Blogs.read();

    const findBlog = blogs.find((blog) => blog.id == id);
    if (!findBlog) return res.status(404).json({ message: "404 NOT FOUND" });

    const filterBlogs = blogs.filter((blog) => blog.id != id);

    await Blogs.write(filterBlogs);

    res.json({ message: "Successfully Deleted" });
});

app.listen(6000, () => {
    console.log("Server listening on port:6000");
});