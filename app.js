const express = require('express');
const fs= require('fs');
const path = require('path');
const port = 80;
const app = express();
const mongoose = require('mongoose');

// EXPRESS RELATED STUFFS
app.use('/static',express.static('static'));// For sering static file

app.use(express.urlencoded());

// PUG RELATED STUFFS
app.set('view engine', 'pug');// Setting template engine for pug



app.set('views',path.join(__dirname,'views'));// Set the views directory

//connecting to the mongodb database

mongoose.connect('mongodb://localhost:27017/ContactsDance',{useNewUrlParser:true});

// classifying the schema of the database
const ContactSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    address: String,
    Description: String
  });

  // classifying the schema to model
  const Contact = mongoose.model('Contact', ContactSchema);

// END POINTS

app.get('/', (req, res)=>{
    const params=``;
    res.status(200).render('home.pug', params);
})
app.get('/about', (req, res)=>{
    const params=``;
    res.status(200).render('index.pug', params);
})
app.get('/contact', (req, res)=>{
    const params=``;
    res.status(200).render('contact.pug', params);
})
app.get('/classinfo', (req, res)=>{
    const params=``;
    res.status(200).render('home.pug', params);
})

app.post('/contact',(req, res)=>{
    var MyContactData = new Contact({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        address: req.body.address,
        Description: req.body.Description
    });
    MyContactData.save().then(()=>{
        res.send("The Data has been added to Database")
        console.log(res.body);
    }).catch(()=>{
        res.status(400).send("Something went wrong the Data has not been saved to Database");
    })
})
// START THE SERVER

app.listen(port, ()=>{
    console.log(`the web app is currently serving on the port ${port}`);
    })