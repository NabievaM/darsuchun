const fs = require("fs").promises;

class io {
    constructor(dir) {
        this.dir = dir;
    }
    async read() {
        const data = await fs.readFile(this.dir, "utf-8");

        return data.length ? JSON.parse(data) : [];
    }
    async write(data) {
        await fs.writeFile(this.dir, JSON.stringify(data, null, 2), "utf8");
    }
}
module.exports = io;