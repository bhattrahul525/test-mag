import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Cards from "./dbCards.js";

const app = express();
const port = process.env.PORT ||3001;
const connection_url= 'mongodb+srv://test:test@cluster0.y6vf3.mongodb.net/Cluster0?retryWrites=true&w=majority';

app.use(cors());
app.use(express.json());

mongoose.connect(connection_url,{
    useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology:true
});

app.get('/',(req,res) => {
    res.status(200).send("Hello world");
});

app.post('/meet-and-greet/cards',(req,res)=>{
    const dbCard = req.body;

    Cards.create(dbCard, (err,data) => {
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }

    });
});

app.get('/meet-and-greet/cards',(req,res)=>{
    Cards.find((err,data)=>{
    if(err){
        res.status(500).send(err);
    }
    else{
        res.status(201).send(data);
    }
})
});

app.listen(port ,()=>console.log("listening to the localhost"));