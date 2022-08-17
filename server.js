const express = require('express');
const { indexOf } = require('lodash');
const port = process.env.PORT || 3001;
const data = require('./books.json')
const app = express();
app.use(express.json())


app.get("/books", function (req, res) { readBooks(req, res) })

app.post("/books", function (req, res){createBooks(req, res)});

app.put("/books/:id", function (req, res){updateBooks(req, res)});

app.delete("/books/:id", (req, res) => {deleteBooks(req, res)});




////---- Create Functions ----///

function readBooks(req, res) {
    res.setHeader("Content-Type", "application/json")
    res.send(data)
};


function createBooks(req, res) {
   if(invalidReq(req)){
    res.status(400);
    res.send("invalid request");
    return;
   };
let newBook = {
    id : req.body.id,
    title: req.body.title,
    author: req.body.author
}
data.push(newBook);
res.status(200);
res.send("book created");
};


function updateBooks(req, res) {
 if (invalidReq(req)){
    res.status(400);
    res.send("invalid request");
    return;
 };
  
 const bookToUpdate = data.find(books => books.id == req.params.id);
 if (typeof bookToUpdate  == 'undefined'){
    res.status(404);
    res.send("the book wasn't found");
    return;
 };
 bookToUpdate.title = req.body.title;
 bookToUpdate.author = req.body.author;
 res.send('the book updated successfully ');

};

function deleteBooks(req,res){
    const bookToDelete = data.find(books => books.id == req.params.id);
 if (typeof bookToDelete  == 'undefined'){
    res.status(404);
    res.send("the book wasn't found");
    return;
 };

 data.splice(data.indexOf(bookToDelete),1);
 res.send("the Book was deleted successfully")
}


function invalidReq(req){
    if (typeof req.body == "undefined" || typeof req.body.title == "undefined" || typeof req.body.author == "undefined") {
        return true
    } else {
        return false
    }
}

    app.listen(port, () =>
        console.log(`app is listen to the port ${port}`))
