const text = document.getElementById("text");
var count = 0;
function create(val,count)
{
    let el={};
    el.value=val;
    el.completed=false;
    // count++;
    // if(count==null)
    // {
    //     count=1;
    // }
    el.id=++count;
    return el;
}

function insert(el){
    let task=document.createElement("div");
    task.setAttribute("class","tasks");
    task.setAttribute("id",el.id);

    let s1=document.createElement("div");
    s1.innerText=el.value;
    s1.style.overflowWrap = "break-word";
    s1.style.width = "75%";

    let s2=document.createElement("div");
    let bx=document.createElement("INPUT");
    bx.setAttribute("class","icon bx");
    bx.setAttribute("type", "checkbox");
    bx.addEventListener('change', bxEvent);
    bx.setAttribute("id","bx"+el.id);
        

    let ed=document.createElement("a");
    ed.setAttribute("class","icon fa fa-edit");
    ed.setAttribute("href","#");
    ed.addEventListener("click",editFunction);


    let cr=document.createElement("a");
    cr.setAttribute("class","icon fa fa-times");
    cr.setAttribute("href","#");
    cr.addEventListener("click",crossFunction);

    s2.appendChild(bx);
    s2.appendChild(ed);
    s2.appendChild(cr);
    s2.style.float="right";

    task.setAttribute("class","tasks");
    task.appendChild(s1);
    task.appendChild(s2);

    let hr=document.createElement("hr");
    hr.setAttribute("id","hr"+el.id);


    let f=document.getElementById("list");
    f.appendChild(task);
    f.appendChild(hr);


    //completed
    if(el.completed)
    {
        let a=document.getElementById(el.id);
        a.firstChild.setAttribute("class","del");
        document.getElementById("bx"+el.id).checked=true;
    }
    
}
function crossFunction(event)
{
    let x=event.target.parentNode.parentNode;
    let y=x.parentNode;
    
    for(let j=0;j<arr.length;j++)
    {
        if(arr[j].id==x.id)
        {
            // console.log(true);
            // console.log(arr[j].id);
            // console.log(x.id);

            arr.splice(j,1);
            save();
            break;
        }
    }
    // console.log(x);
    // console.log(x);
    // console.log(y);
    y.removeChild(x);
    let temp=document.getElementById("hr"+x.id);
    y.removeChild(temp);
    

}
function bxEvent(event)
{
    let t=event.target;
    let p=t.parentNode.parentNode;
    let f=p.firstChild;
    if (event.target.checked) 
    {
        f.setAttribute("class","del");
        // console.log(p);
        for(let j=0;j<arr.length;j++)
        {
            // console.log(arr[j]);
            if(arr[j].id==p.id)
            {
                arr[j].completed=true;
                save();
                break;
            }
        }
    } 
    else
    {
        f.setAttribute("class","undel");
        for(let j=0;j<arr.length;j++)
        {
            if(arr[j].id==p.id)
            {
                arr[j].completed=false;
                save();
                break;
            }
        }
    
    }
    

}
function editFunction(event)
{
    let t=event.target.parentNode.parentNode;
    let p=t.firstChild;
    console.log(p);
    let txt=p.innerText;
    let res=prompt("Enter New Value:",`${txt}`);
    if(res==undefined)
    {
        return;
    }


    let flag=0;
    for(let k=0;k<res.length;k++)
    {
        if(res[k]!=" ")
        {
            flag=1;
            break;
        }

    }
    if(flag==0)
    {
        return;
    }


    p.innerText=res;
    for(let j=0;j<arr.length;j++)
    {
        if(arr[j].id==t.id)
        {
            arr[j].value=res;
            save();
            break;
        }
    }
}
function savetodo(el,callback){
    var request = new XMLHttpRequest();

    request.open("POST","./savetodo");
    request.setRequestHeader("Content-Type","application/json");
    request.send(JSON.stringify(el));
    request.addEventListener("load",()=>{
        // insert(el);
        // console.log(request.status);
        callback();
    });
}
function gettodo(callback){
    var request = new XMLHttpRequest();
    request.open("get","./gettodo");
    request.send();
    request.addEventListener("load",function(){
        callback(JSON.parse(request.responseText));
    });
}
function input(event){
    if(event.code=="Enter"){
        // console.log("enter");
        let val = text.value;
        let flag = 0;
        for(let k=0;k<val.length;k++)
        {
            if(val[k]!=" ")
            {
                flag=1;
                break;
            }

        }
        if(flag==0){
            event.preventDefault(); 
            text.value = null;
        }
        else{
            gettodo(function(todos){
                if(todos.length == 0){
                    count = 1;
                    // console.log(count);
                }
                else{
                   count = todos[todos.length-1].id +1; 
                //    console.log(count);
                }
            })
            // console.log(count);
            let el = create(val,count);
            event.preventDefault();
            console.log(el);
            savetodo(el,function(){
                insert(el);
            });
            // insert(el);
            text.value = null;
        }
        
    }
}




let arr = [];

gettodo(function(todos){
    arr = todos;
    todos.forEach(function(todo){
        let el = todo;
        count = todo.id;
        insert(el);
    })
})
text.addEventListener("keydown",input);