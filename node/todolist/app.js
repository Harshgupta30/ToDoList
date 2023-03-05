var express = require('express');
var port = 3000;
var app = express();
const fs = require('fs');
app.use(express.static("todolist/public"));
app.use(express.json());
app.get('/gettodo',(req,res)=>{
    fs.readFile("todolist/data.json",(err,data)=>{
        let todos;
        if(data.length===0){
            todos = [];
        }
        else{
            todos = JSON.parse(data);
        }
        res.json(todos);
    })
})
app.post("/savetodo",(req,res)=>{
    // console.log(req.body);
    // res.end();
    
        fs.writeFile("todolist/data.json",JSON.stringify(req.body),(err)=>{
            res.end();
        })

})

app.listen(port,()=>{
    console.log(`server started at http://localhost:3000`)
})