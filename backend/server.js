const express = require('express');
const mongoose = require('mongoose');
const apikey = require('uuid-apikey');
var cors = require('cors')
//loading environment vairables to hide sensitive info
require('dotenv').config();
const port =process.env.PORT || 3000;
const dburi = process.env.DB_URI;
//loading schema and models for the databse
const customerData = require('./models/customer');
const userData = require('./models/user');


//creating an express object
const app = express();
//initializing all middleware and static files
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
require('./config/mongoose')(app,dburi,port);

  app.get('/',(req,res)=>{
      res.send("hello");
  })

  app.post('/add',(req,res)=>{
    const temp = apikey.create();
    const newUser = new userData({
      name:req.body.name,
      email:req.body.email,
      avalserv:"d,tw,te",
      uuid:temp.uuid,
      apikey:temp.apiKey
    });
    newUser.save()
    .then(result=>{
      console.log("userdata is saved:",result);
      const data={
        apikey:temp.apiKey,
        id:result._id
      }
      res.json(data);
    })
    .catch(err=>{
      console.log("userdata cannot be written:",err);
      const data={
        apikey:"cannot be created",
        id:"cannot be created"
      }
      res.json(data);
  })
  });

  app.post('/content',async (req,res)=>{
    const id = req.body.id;
    const content = req.body.content;
    const filter={_id:id};
    const update = {content:content};
    userData.findOneAndUpdate(filter,update)
    .then(result=>{console.log("updated:",result)})
    .catch(err=>{console.log("cannot update the content:",err)})
  })


  app.post('/user/:user/apiKey/:api',(req,res)=>{
      const api = req.params.api;
      const user = req.params.user;
      const twitter = req.body.twitter;
      const discord = req.body.discord;
      const telegram = req.body.telegram;
      const email = req.body.email;
      let uuid
      try {
           uuid = apikey.toUUID(api);
      }catch(err){
          console.log("error on converting:",err);
      };
      
      const customer = new customerData({
        email:email,
        socialMedia:`${twitter},${discord},${telegram}`,
        uuid:uuid,
        apikey:api
      });

      customer.save()
      .then(result=>{
        const data={
          msg:"thanks for subscribing",
        }
        res.json(data);
      })
      .catch(err=>{
        const data ={
          msg:"error "
        }
        console.log("errror on server coustomers,",err);
        res.json(data);
      })
         
  })