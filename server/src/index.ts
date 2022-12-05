import express from  "express";
 import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

interface Reaction {
    [reaction: string]: number;
}

interface IPost {
    id: string;
    title: string;
    date: Date;
    user: number;
    content: string;
}

const posts: IPost[] = [{
    id: uuidv4(),
    title: 'hi im a title',
    date: new Date(),
    content: 'hi im content',
    user: 1,
}];

interface User {
    id: number;
    name: string;
}

const users: User[] = [
    { id: 0, name: 'Donkey Kong', },
    { id: 1, name: 'Diddy Kong' }
]

const findPost = (id: string) => posts.filter(currentPost => currentPost.id === id);

app.get('/posts', (req, res) => {
    return res.status(200).send(posts);
});

app.get('/post/:id', (req, res) => {
    const { id } = req.params;

    const foundPost = findPost(id);
    return res.status(200).send({ post: foundPost });
});

 app.post('/posts', (req, res) => {
    const { title, content, user } = req.body

     const newPost = {
        id: uuidv4(),
         title,
         content,
         user,
         date: new Date()
     }

     setTimeout(() => {
         posts.push(newPost);
         }, 1000);
    return res.status(202).end();
 });

app.get('/users', (req, res) => {
    return res.status(200).json(users);
});

// start the Express server
app.listen( port, () => {
//    console.log( `server started at http://localhost:${ port }` );
} );