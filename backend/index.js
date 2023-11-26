const express = require('express')
const app = express()
const cors = require('cors')

let users= [];

app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(express.json())

app.post("/register", async (req, res) => {
    console.log(req.body)

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

    res.send({
        status: "Saved",
        message: "User has been saved"
    })

})

app.listen(3000);
console.log("app running at http://localhost:3000");