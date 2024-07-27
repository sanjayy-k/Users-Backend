const bodyparser=require('body-parser')
const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')

const{Login}=require('./sample(schema).js')
const app=express()
app.use(bodyparser.json())
app.use(cors())

async function connecttodb(){
    try{
        await mongoose.connect('mongodb+srv://sanjay:sanjay29@sanjay.z0v9yfy.mongodb.net/SAMPLE?retryWrites=true&w=majority&appName=sanjay')
        app.listen(3000,function(){
            console.log('Listening to 3000');
        })
    }
    catch(error){
         console.log(error);   
    }
}
connecttodb()



app.post('/add-user',async function(req,res){
    try{
        const user=await Login.find({"emailId":req.body.emailId})
        if(user.length===0){
        await Login.create({
            "emailId":req.body.emailId,
            "password":req.body.password
        })
        res.status(201).json({
            "Message":"Success"
        })
    }
    else{
        res.status(409).json({
            "message":"user already exist"
    })
    }
    
    }
    catch(error){
       res.status(500).json({
        "Message":error
       })
    }
})





app.get('/get-user',async function(req,res){
    try{
    const d=await Login.find()
     res.status(200).json(d)
    }
    catch(error){
        res.status(500).json({
            "Message":error
        })
    }
})

//JWT Token generating and send to user:
app.post('/validate-user', async function(req, res) {
    try {
        const user = await Login.findOne({ "emailId": req.body.emailId, "password": req.body.password });
        if (user.length === 0) { // Check if user array is empty
            return res.status(401).json({
                "status": "failure",
                "message": "User does not exist or invalid credentials"
            });
        } else {
            res.status(200).json({
                "status": "success",
                "message": "User found and credentials are correct"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            "message": "Authentication failed"
        });
    }
});
//npx nodemon sample.js