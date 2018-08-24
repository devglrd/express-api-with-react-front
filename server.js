import express from 'express';
import bodyParser from 'body-parser';
import connectToDb from './db/connect';
import Author from "./db/models/author";
import cuid from 'cuid';

//route
import posts from './routes/posts.routes';
import author from './routes/authors.routes';
/*

NOTES IMPORTANTE -----------

app.get('url', (req, res) => {}

req correspond a la requetes :
            - pour les paramettres passé dans l'url il faut faire req.params.{paramettre}
            - pour les données passé dans le body il faut faire req.body.{obj}
 */


let app = express();

connectToDb();
let port = 9000;
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");
    next();
});

app.get('/', (req, res) => res.send("Hello world !"));
app.use('/api/posts/', posts);
app.use('/api/authors/', author);

app.get('/api/example/:_id', async (req, res) => {
    const autjorId = req.params._id;

    const user = await Author.findById(autjorId).populate('posts');
    res.status(200).json({user});
})
app.listen(port, () => console.log(`Hey from server, run on ${port}`));