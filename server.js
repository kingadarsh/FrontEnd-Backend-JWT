const express=require("express");
const jwt=require("jsonwebtoken");
const cors=require("cors");


const app = express();
const JWT_SECRET="Adarsh";

app.use(express.json());
app.use(cors())
app.use(express.static("public")); 


// ---------------------------------------
const UserList=[];
// ---------------------------------------



app.use("/me",(req,res,next)=>{
    const token = req.headers.token;
    try{
        if(token){
            const decodeduser=jwt.verify(token,JWT_SECRET)
            req.user=decodeduser;
            req.username=decodeduser.username;
            next();
        }
        else{
            res.status(401).json({
                message:"You were not able to Log IN"
            })
        }
    }
    catch(err){
        res.status(401).json({
            message:"Invalid Token"
        })
    }
})


app.post("/signup",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    
    UserList.push({
        username:username,
        password:password
    });

    res.json({
        message:"You are signed up"
    })

})

app.post("/signin",(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    let Founduser=null;

    for(let i =0;i<UserList.length;i++){
        if(username===UserList[i].username && password===UserList[i].password){
            Founduser=UserList[i];
        }
    }

    if(Founduser){
        const token=jwt.sign({
            username:username
        },JWT_SECRET);

        res.json({
            token:token
        });
    }
    else{
        res.json({
            message:"Incorrect Credentials"
        });
       
    }


})

app.get("/me",(req,res)=>{
    const currentuser=req.username;

    let Founduser=null;
    for(let i =0;i<UserList.length;i++){
        if(currentuser===UserList[i].username){
            Founduser=UserList[i];
        }
    }
    if(Founduser){
        res.status(200).json({
            username:Founduser.username,
            password:Founduser.password
        });
    }
    else{
        res.status(404).json({
            message: "User not found"
        });
    }

})


app.listen(3000,()=>{
    console.log("Serving on port 3000");
})