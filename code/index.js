const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect('mongodb://nosql:27017/instaclone', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'Connection Error!'));
db.once('open', () => console.log('Connexion Exitosa!'));

const app = express();

app.use(cors());
app.use(express.json());

const postSchema = mongoose.Schema({
    caption: String
});

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => res.json({message: 'ok'}))

// new Post({caption: "Test..."}).save()

// /api/posts GET - Obtener una lista;
app.get('/api/posts', async (req, res) => res.json(await Post.find().exec()));
// /api/posts POST - Crear un objeto nuevo;
app.post('/api/posts', async (req, res) => {
    // req.params.id
    const data = req.body;
    let post = new Post(data);
    await post.save();
    return res.json(post);
});
// /api/posts/:id GET - Obtener detalle de un objeto
// /api/posts/:id PUT - Editar un objeto
// /api/posts/:id DELETE - Eliminar un objeto





app.listen(3009, () => console.log('Funciona'));