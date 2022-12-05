"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const uuid_1 = require("uuid");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080; // default port to listen
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const posts = [{
        id: (0, uuid_1.v4)(),
        title: 'hi im a title',
        date: new Date(),
        content: 'hi im content',
        user: 1,
    }];
const users = [
    { id: 0, name: 'Donkey Kong', },
    { id: 1, name: 'Diddy Kong' }
];
const findPost = (id) => posts.filter(currentPost => currentPost.id === id);
app.get('/posts', (req, res) => {
    return res.status(200).send(posts);
});
app.get('/post/:id', (req, res) => {
    const { id } = req.params;
    const foundPost = findPost(id);
    return res.status(200).send({ post: foundPost });
});
app.post('/posts', (req, res) => {
    const { title, content, user } = req.body;
    const newPost = {
        id: (0, uuid_1.v4)(),
        title,
        content,
        user,
        date: new Date()
    };
    setTimeout(() => {
        posts.push(newPost);
    }, 1000);
    return res.status(202).end();
});
app.get('/users', (req, res) => {
    return res.status(200).json(users);
});
// start the Express server
app.listen(port, () => {
    //    console.log( `server started at http://localhost:${ port }` );
});
//# sourceMappingURL=index.js.map