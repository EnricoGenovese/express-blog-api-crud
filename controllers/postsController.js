/**Milestone 1*
Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.
All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).
Poi torniamo sul file delle rotte. Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.
Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.
Se tutto funziona, passiamo alla prossima milestone
*/

const posts = require("../models/posts.js") // --> link to the db folder; export the one needed

// Funzioni

function index(req, res) {
    const postTitle = req.query.title; // --> query string: .../posts?title=[title or part of title]
    console.log(postTitle);
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
    }
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
    } else {    // --> if post does not exist
        res.json({
            success: false,
            messegge: "Post not found!"
        });
    }
};

function store(req, res) {
    res.send("New post created!");
};

function update(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (post) {
        res.send("Item fully modified");
    } else {    // --> if post does not exist
        res.send("Cannot update what doe not exist")
    }
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
    if (index !== -1) {
        res.status(204) // --> no content
        posts.splice(index, 1);
        console.log(posts);
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