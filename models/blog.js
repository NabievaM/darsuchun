class Blog {
    constructor(id, title, description, views) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.views = views;
        this.created_at = new Date();
    }
}
module.exports = Blog;