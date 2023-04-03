var express = require('express');
var port = 3000;
var app = express();
var count = 0;
const fs = require('fs');
const multer = require('multer')
const upload = multer({ dest: 'mtodolist/uploads' })
app.use(express.static("mtodolist/public"));
app.use(express.json());
app.use(express.static("./mtodolist/uploads"));
// app.get('/',(req,res)=>{
//     res.send(index.html);
// })
app.post('/update', (req, res) => {
    fs.writeFile("mtodolist/data.json", JSON.stringify(req.body), (err) => {
        res.end();
    })
})


app.get('/gettodo', (req, res) => {
    fs.readFile("mtodolist/data.json", (err, data) => {
        let arr;
        if (data.length === 0) {
            arr = [];
        }
        else {
            arr = JSON.parse(data);
        }
        res.json(arr);
    })
})
app.post("/up", upload.single("itask"), (req, res) => {
    // console.log(req.body.task);
    // console.log(req.file);
    let f = false;
    const task = req.body.task;
    const image = req.file.filename;
    for(let i=0;i<task.length;i++){
        if(task[i]!=" "){
            f = true;
        }
    }
    if(f==false){
        return;
    }
    let arr;
    fs.readFile("mtodolist/data.json", (err, data) => {
        if (data.length === 0) {
            arr = [];
            const temp = { "id": count, "task": task, "image": image, "completed": false };
            arr.push(temp);
            fs.writeFile("mtodolist/data.json", JSON.stringify(arr), (err) => {
                res.send(temp);
            })
        }
        else {
            arr = JSON.parse(data);
            if (arr.length === 0) {
                const temp = { "id": count, "task": task, "image": image, "completed": false };
                arr.push(temp);
                fs.writeFile("mtodolist/data.json", JSON.stringify(arr), (err) => {
                    res.send(temp);
                })
            }
            else {
                // console.log(typeof (arr));
                // count = arr[-1].id+1;
                // console.log(arr[arr.length-1].id);
                count = arr[arr.length - 1].id + 1;
                const temp = { "id": count, "task": task, "image": image, "completed": false };
                arr.push(temp);
                fs.writeFile("mtodolist/data.json", JSON.stringify(arr), (err) => {
                    res.send(temp);
                })
            }

        }
    })
})


app.listen(port, () => {
    console.log(`server started at http://localhost:3000`)
})