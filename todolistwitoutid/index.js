

// textarea = document.querySelector("#taskin");
// textarea.addEventListener('input', autoResize, false);          
// function autoResize() {
//         this.style.height = 'auto';
//     this.style.height = this.scrollHeight + 'px';
// }
let i = 0;
let task = document.getElementById("taskin");
task.addEventListener("keydown", function (event) {
    if (event.code == "Enter") {
        let s = document.getElementById("taskin").value;
        if (s.length != 0) {
            if (s[0] != " " && s[0] != "\n") {
                submit();

            }

        }
        event.preventDefault();

        // console.log(event);
        document.getElementById("taskin").value = "";
    }

})

function submit() {
    let store = document.getElementById("taskin").value;

    adddata(store);
    getdata(store, false);
}
function adddata(store) {
    let task;
    if (localStorage.getItem("task") == null) {
        task = [];
    }
    else {
        task = JSON.parse(localStorage.getItem("task"));
    }
    let res = { value: store, complete: false ,id: i};
    i++;
    task.push(res);
    localStorage.setItem("task", JSON.stringify(task));
}

function getdata(store, v) {
    let u = document.getElementById("record");
    let l = document.createElement("li");
    a = document.createElement("a");
    a.innerText = store;
    a.setAttribute("class", "icon");
    if (v == true) {
        a.setAttribute("class", "an")
    }
    l.appendChild(a);
    let c = document.createElement("i");
    c.setAttribute("class", "close fa fa-close");
    c.setAttribute("id", "close");
    l.appendChild(c);
    let ch = document.createElement("input");
    ch.setAttribute("type", "checkbox");
    ch.setAttribute("class", "check")
    if (v == true) {
        ch.setAttribute("checked", "true");
    }
    l.appendChild(ch);
    let e = document.createElement("i");
    e.setAttribute("class", "fa fa-edit");
    e.setAttribute("id", "edit");
    l.appendChild(e); h = document.createElement("hr");
    l.appendChild(h);
    u.appendChild(l);


}
function load() {
    for (let i = 0; i < task.length; i++) {
        getdata(task[i].value, task[i].complete);
    }
}
if (localStorage.getItem("task") == null) {
    task = [];
}
else {
    task = JSON.parse(localStorage.getItem("task"));
}
// load();

let record = document.getElementById("record");
record.addEventListener('click', function (e) {
    const item = e.target;
    if (item.classList[0] == "close") {
        deletecurtask(item.parentElement);
        item.parentElement.remove();
    }
    if (item.classList[0] == "fa") {
        const text = item.parentElement.childNodes;
        // console.log(item.parentElement.childNodes);
        let v = window.prompt("enter updated task", text[0].innerText);
        let temp = text[0].innerText;
        if (v.length != 0) {
            text[0].innerText = v;

            let tasks;
            tasks = JSON.parse(localStorage.getItem("task"));
            // tasks[tasks.indexOf(temp)] = text[0].innerText;
            let idx;
            for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].value == temp) {
                    idx = i;
                    break;
                }
            }
            tasks[idx].value = v;
            localStorage.setItem("task", JSON.stringify(tasks));
        }
    }
    if (item.classList[0] == "check") {
        const text = item.parentElement.childNodes;
        console.log(item.parentElement);
        let temp = text[0].innerText;
        // fcheck();
        console.log(temp);
        item.parentElement.setAttribute("class","an"); 
        let tasks;
        if (localStorage.getItem("task") == null) {
            tasks = [];
        }
        else {
            tasks = JSON.parse(localStorage.getItem("task"));
        }
        let idx;
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].value == temp) {
                idx = i;
                break;
            }
        }
        // console.log(idx);
        tasks[idx].complete = true;
        localStorage.setItem("task", JSON.stringify(tasks));
    }
})

function deletecurtask(task) {
    let tasks;
    if (localStorage.getItem("task") == null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem("task"));
    }
    // const taskindex = task.lastChild.innerText;
    // console.log(tasks);
    // console.log(tasks.indexOf(tasks.value==task.innerText));
    // tasks.splice(tasks.indexOf(task.innerText),1);
    let idx;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].value == task.innerText) {
            idx = i;
            break;
        }
    }
    console.log(idx);
    tasks.splice(idx, 1)
    localStorage.setItem("task", JSON.stringify(tasks));
}

load();
let elems = document.getElementsByClassName("check");
// Array.from(elems).forEach(v => v.addEventListener('change', function(){
//     // this.parentNode.classList.toggle('an');
//     elems[i].setAttribute("class","an");
//   }));
// for(let i=0;i<elems.length;i++){
//     // console.log(elems[i].checked);
//     elems[i].setAttribute("class","an");
// }

// function fcheck(){
//     Array.from(elems).forEach(v => v.addEventListener('change', function () {
//     // this.parentNode.classList.toggle('an');
//     this.parentNode.setAttribute("class","an");
//     console.log(this.parentNode.innerText);
//     let tasks;
//     if (localStorage.getItem("task") == null) {
//         tasks = [];
//     }
//     else {
//         tasks = JSON.parse(localStorage.getItem("task"));
//     }
//     let idx;
//     for (let i = 0; i < tasks.length; i++) {
//         if (tasks[i].value == this.parentNode.innerText) {
//             idx = i;
//             break;
//         }
//     }
//     // console.log(idx);
//     tasks[idx].complete = true;
//     localStorage.setItem("task", JSON.stringify(tasks));
// }));
// }

