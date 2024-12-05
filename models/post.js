/* *Milestone 2*
Per iniziare, creiamo una cartella data o models  in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato.  Importiamo questo file in cima al controller.
Ora passiamo ad implementare le logiche delle nostre CRUD:
- Index dovrà restituire la lista dei post in formato JSON
- Show dovrà restituire un singolo post in formato JSON
- Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.
 */

const myPosts = [
    {
        id: 1,
        title: "Ciambellone",
        content: "Facile e veloce da preparare",
        img: "../public/images/ciambellone.jpeg",
        tags: "dessert, veloce, economico"
    },
    {
        id: 2,
        title: "Crackers alla barbabietola",
        content: "Per uno spuntino salutare",
        img: "../public/images/cracker_barbabietola.jpeg",
        tags: "colore, leggero, barbabietola"
    },
    {
        id: 3,
        title: "Pane fritto dolce",
        content: "Come merenda o dolce a fine pasto",
        img: "../public/images/pane_fritto_dolce.jpeg",
        tags: "dessert, merenda, fritto"
    },
    {
        id: 4,
        title: "Pasta alla barbabietola",
        content: "Gusto e colore in tavola",
        img: "../public/images/pasta_barbabietola.jpeg",
        tags: "colore, barbabietola, estivo"
    },
    {
        id: 5,
        title: "Torta paesana",
        content: "Ricetta tradizionale della nonna",
        img: "../public/images/torta_paesana.jpeg",
        tags: "dessert, tradizione, cioccolato"
    },
];


module.exports = myPosts;