let arr = [];
const myform = document.getElementById("myform");
myform.addEventListener('submit', (e) => {
    e.preventDefault();
    var newform = new FormData(myform);

    myform.reset();
    var request = new XMLHttpRequest();
    request.open('POST', '/up', true);
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            el = JSON.parse(this.responseText);
            console.log(el);
            insert(el);
        }
    }
    request.send(newform); 
})
function savetodo() {
    let xyz = JSON.stringify(arr);
    let req = new XMLHttpRequest();
    req.open("POST", "/update");
    req.setRequestHeader("Content-Type", "application/json");
    req.addEventListener("load", function (response) {
    });
    req.send(xyz);
}
function crossFunction(event) {
    let x = event.target.parentNode.parentNode;
    let y = x.parentNode;
    var request = new XMLHttpRequest();
    request.open('get', './gettodo');
    request.addEventListener("load", function (response) {
        arr = JSON.parse(request.responseText);
        for (let j = 0; j < arr.length; j++) {
            // console.log(arr);
            if (arr[j].id == x.id) {
                arr.splice(j, 1);
                savetodo();
                break;
            }
        }
    })
    request.send();
    // for (let j = 0; j < arr.length; j++) {
    //     console.log(arr);
    //     if (arr[j].id == x.id) {
    //         arr.splice(j, 1);
    //         savetodo();
    //         break;
    //     }
    // }
    y.removeChild(x);
    let temp = document.getElementById("hr" + x.id);
    y.removeChild(temp);
}
function bxEvent(event) {
    // console.log(arr);
    let t = event.target;
    let p = t.parentNode.parentNode;
    let f = p.firstChild;
    if (event.target.checked) {
        f.setAttribute("class", "del");
        // console.log(p);
        var request = new XMLHttpRequest();
        request.open('get', './gettodo');
        request.addEventListener("load", function (response) {
            arr = JSON.parse(request.responseText);
            for (let j = 0; j < arr.length; j++) {
                // console.log(arr[j]);
                if (arr[j].id == p.id) {
                    arr[j].completed = true;
                    savetodo();
                    break;
                }
            }
        })
        request.send();
        // for (let j = 0; j < arr.length; j++) {
        //     // console.log(arr[j]);
        //     if (arr[j].id == p.id) {
        //         arr[j].completed = true;
        //         savetodo();
        //         break;
        //     }
        // }
    }
    else {
        f.setAttribute("class", "undel");
        var request = new XMLHttpRequest();
    request.open('get','./gettodo');
    request.addEventListener("load",function(response){
        arr = JSON.parse(request.responseText);
        for (let j = 0; j < arr.length; j++) {
            if (arr[j].id == p.id) {
                arr[j].completed = false;
                savetodo();
                break;
            }
        }
    })
    request.send();
        // for (let j = 0; j < arr.length; j++) {
        //     if (arr[j].id == p.id) {
        //         arr[j].completed = false;
        //         savetodo();
        //         break;
        //     }
        // }
    }
}
function insert(el) {
    let task = document.createElement("div");
    task.setAttribute("class", "tasks");
    task.setAttribute("id", el.id);
    let s1 = document.createElement("div");
    s1.innerText = el.task;
    s1.style.overflowWrap = "break-word";
    s1.style.width = "75%";
    let s2 = document.createElement("div");
    let im = document.createElement("img");
    im.setAttribute("src", `${el.image}`);
    im.setAttribute("class", "imc");
    let bx = document.createElement("INPUT");
    bx.setAttribute("class", "icon bx");
    bx.setAttribute("type", "checkbox");
    bx.addEventListener('change', bxEvent);
    bx.setAttribute("id", "bx" + el.id);
    let cr = document.createElement("a");
    cr.setAttribute("class", "icon fa fa-times");
    cr.setAttribute("href", "#");
    cr.addEventListener("click", crossFunction);
    s2.appendChild(im);
    s2.appendChild(bx);
    s2.appendChild(cr);
    s2.style.float = "right";
    task.setAttribute("class", "tasks");
    task.appendChild(s1);
    task.appendChild(s2);
    let hr = document.createElement("hr");
    hr.setAttribute("id", "hr" + el.id);
    let f = document.getElementById("list");
    f.appendChild(task);
    f.appendChild(hr);
    if (el.completed) {
        let a = document.getElementById(el.id);
        a.firstChild.setAttribute("class", "del");
        document.getElementById("bx" + el.id).checked = true;
    }
}
function load() {
    for (let i = 0; i < arr.length; i++) {
        insert(arr[i]);
    }
}
function gettodo() {
    var request = new XMLHttpRequest();
    request.open('get', './gettodo');
    request.addEventListener("load", function (response) {
        arr = JSON.parse(request.responseText);
        load();
    })
    request.send();
}

gettodo();