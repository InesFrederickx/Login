const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient } = require('mongodb')

require('dotenv').config()

const client = new MongoClient(process.env.FINAL_URL)

let users= [];

app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(express.json())

app.get("/testMongo", async (req,res) => {
    try{
        //Connect to the db
        await client.connect();

        //Retrieve the users collection data
        const colli = client.db('loginsystem').collection('users');
        const users = await colli.find({}).toArray();

        //Send back the data with the response
        res.status(200).send(users);
    }catch(error){
        console.log(error)
        res.status(500).send({
            error: 'Something went wrong!',
            value: error
        });
    }finally {
        await client.close();
    }
})

app.post("/register", async (req, res) => {

    //Checking for empty fields
    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(401).send({
            status: "Bad Request",
            message: "One or more of these fields are missing: username, email, password"
        })
        return
    }

    //Save to users array
    users.push({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })

    //Send back response when user is saved
    res.send({
        status: "Saved",
        message: "User has been saved"
    })

})

app.post("/login", async (req, res) => {

    //Checking for empty fields
    if(!req.body.email || !req.body.password){
        res.status(401).send({
            status: "Bad Request",
            message: "One or more of these fields are missing: email, password"
        })
        return
    }

    //Check for the users in the array
    let user = users.find(element => element.email == req.body.email)
    if(user){
        //User found --> compare passwords
        if(user.password == req.body.password){
            res.status(200).send({
                status: "Authentication succesfull",
                message: "You are logged in!"
            })
        } else{
            //Password is incorrect
            res.status(401).send({
                status: "Authentication error",
                message: "Password is incorrect!"
            })
        }
    } else{
        //No user --> send back error
        res.status(401).send({
            status: "Authentication error",
            message: "No user with this email has been found! Make sure you register first."
        })
    }
})

app.listen(3000);
console.log("app running at http://localhost:3000");