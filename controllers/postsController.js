/**Milestone 1*
Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.
All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).
Poi torniamo sul file delle rotte. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.
Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.
Se tutto funziona, passiamo alla prossima milestone
*/
/*
### Bonus
- Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag
- In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.
-Create router, controller e model per un'altra risorsa a vostra discrezione (es. commenti, utenti, ...)
*/

const posts = require("../models/post.js") // --> link to the models folder; export the one needed

// Funzioni

function index(req, res) {
    const postTitle = req.query.title; // --> query string: .../posts?title=[title or part of title]
    // const postTag = req.query.tag;
    //
    let response = {
        totalPosts: posts.length,
        data: [...posts]
    };
    //
    if (postTitle) {
        response.data = posts.filter((post) =>
            post.title.toLowerCase().includes(postTitle.toLowerCase())
        );
        //    
        if (response.data.length < 1) { // --> if post does not exist
            res.status(404);
            response = {
                error: 404,
                message: "Post not found",
            };
        }
    };
    res.json(response);
};

function show(req, res) {  // --> @ .../posts/[id]
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    //
    if (post) {
        res.json({
            success: true,
            post,
        });
        //
    } else {    // --> if post does not exist
        res.json({
            success: false,
            messegge: "Post not found!"
        });
    }
};

function store(req, res) {
    let newId = 0;
    for (let i = 0; i < posts.length; i++) {
        if (posts[i].id > newId) {
            newId = posts[i].id
        };
    };
    newId += 1;
    //
    // console.log(req.headers["content-type"]);
    //
    const newPost = {
        id: newId,
        title: req.body.title,          // "title": "Crostata integrale ai mirtilli",
        content: req.body.content,      // "content": "Per una dolce pausa",
        img: req.body.img,              // "img": "../pubic/images/crostata_integrale_mirtilli",
        tags: req.body.tags             // "tags": ["estate, frutta, integrale"]
    };
    posts.push(newPost);
    console.log(posts);
    res.status(201).json(newPost);
};

function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        res.status(404).json({ success: false, message: "The post does not exist" })
        return;
    }
    // post.title = req.body.title;
    // post.content = req.body.content;
    // post.img = req.body.tags;
    // post.tags = req.body.tags;
    for (key in post) {
        if (key !== "id") {
            post[key] = req.body[key];
        }
    }
    console.log(posts);
    res.json(post);
};

function modify(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send("Item patched")
    } else {    // --> if post does not exist
        res.send("Cannot patch what does not exist")
    }

};

function destroy(req, res) {
    const id = parseInt(req.params.id);
    const index = posts.findIndex(item => item.id === id);
    //
    if (index !== -1) {
        posts.splice(index, 1);
        res.sendStatus(204) // --> no content
        console.log(posts);
        //
    } else { // --> if post does not exist
        res.status(404);
        res.json({
            error: 404,
            message: "Cannot destroy what does not exist"
        });
    };
};

module.exports = {
    index,
    show,
    store,
    update,
    modify,
    destroy
}; // --> functions exported