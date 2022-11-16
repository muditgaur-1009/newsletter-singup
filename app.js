
const express = require("express");
const bodyparser=require("body-parser")
const request=require("request");
const { json } = require("body-parser");
const https=require("https");
const { url } = require("inspector");
const { dirname } = require("path");




const app=express();


app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",function(req,res){

    const firstName=req.body.fname;
    const lastName=req.body.lname;
    const email=req.body.email;

    console.log(firstName,lastName,email);
    const data={
        members:[{
            email_address:email,
            status:"subscribed",
            merge_fields:{
              FNAME:firstName,
              LNAME: lastName
            }
        }]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us18.api.mailchimp.com/3.0/lists/1f49b251de";
    const options ={
        method:"post",
        auth:"mudit1:a290a5d1c5192f6e38e14dddded8fbfa-us18"
    }
    const request=https.request(url,options,function(response){

         if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.send(__dirname+"/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();




    app.post("/failure",function(req,res){
        res.redirect("/");
    })
});
app.listen(process.env.PORT || 3000, function() {
    console.log("server has been started at port 3000.")
})




// api key
// a290a5d1c5192f6e38e14dddded8fbfa-us18

// audience id 
// 1f49b251de