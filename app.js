//Here we are requiring our two packages we just installed
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


//Creating our app constant by using express
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/wikiDB", {useNewUrlParser: true, useUnifiedTopology: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);





//Here we right our standard get route this
//one is just sending the user
//server here when trying to access the home route

//A specific article// 
app.route("/articles/:articleTitle")
.get(async(req,res)=>{

    try{
    
    const article = await Article.findOne({title: req.params.articleTitle});
    
    res.send(article);
    
    } catch (err) {
    
    console.log(err);
    
    }
    
    })
    
    .put(function(req,res){
        Article.updateOne(
            {title: req.params.articleTitle}, 
            {title: req.body.title, content: req.body.content}
        ).then(function(){
            res.send("Successfuly Updated an article.")
        })
    })

    .patch(function(req,res){
        Article.updateOne(
            {title: req.params.articleTitle},
            {$set: req.body}
        ).then(function(){
            res.send("successfully patched an article ")
        })
    })

    .delete(function(req,res){
        Article.deleteOne({title: req.params.articleTitle}).then(function(){
            res.send("Successfully deleted an article.");
        });
    });




//A specific article//

//All Articles//
app.route("/articles")

    .get(async(req,res)=>{

    try{
    
    const articles = await Article.find({});
    
    res.send(articles);
    
    } catch (err) {
    
    console.log(err);
    
    }
    
    })
    
    .post(function(req,res){
        const newArticle = new Article({
     title: req.body.title,
     content: req.body.content
 });
 newArticle.save().then(function(){
     res.send("Successfully added a new article.")
 });
 
})
    
    .delete(function(req,res){
    Article.deleteMany({}).then(function(){
        res.send("Successfully deleted an article.");
    });
});

//All articles//



//lists on port 3000 and console.log that it has started in terminal
app.listen(3000,function(){
    console.log("Server started on port 3000");
});
