//alert('helo')


//CRUD>> create
//      read
//      update
//      delete
let cl=console.log;

const stdform=document.getElementById('stdform');
const fnamecontrol=document.getElementById('fname');
const lnamecontrol=document.getElementById('lname');
const emailcontrol=document.getElementById('email');
const contactcontrol=document.getElementById('contact');
const info=document.getElementById('info');
let submitbtn=document.getElementById('submitbtn');
let updatebtn=document.getElementById('updatebtn');

let stdarray=[];

function uuid(mask = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") {
    return `${mask}`.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  

const onstdedit=(ele)=>{ 
    //cl(`edited ${ele.getAttribute('data-id')}`)
   let getId=ele.getAttribute('data-id');
   localStorage.setItem('getId', getId)
    cl(getId)  //we want object,we have a array ans one condition
    stdarray=JSON.parse(localStorage.getItem('stdarray'));
    updatebtn.classList.remove('d-none');
    submitbtn.classList.add('d-none');

    //let reqobj=stdarray.filter(ele=>ele.id === getId);
    let reqobj=stdarray.find((ele)=>ele.id === getId);
    cl(reqobj)
    fnamecontrol.value=reqobj.fname;
    lnamecontrol.value=reqobj.lname;
    emailcontrol.value=reqobj.email;
    contactcontrol.value=reqobj.contact;
}

const onstddelete=(ele)=>{
    let getdeleteId=ele.getAttribute('data-id');
    cl(getdeleteId)
    cl(stdarray)
    stdarray=stdarray.filter((ele) => {
       return ele.id!=getdeleteId
    })
     cl(stdarray);
     localStorage.setItem('stdarray', JSON.stringify(stdarray));
     templating(stdarray)
}

const createtr=(obj)=>{
    let tr=document.createElement('tr');
    tr.innerHTML=`
    <td>${stdarray.length}</td>
    <td>${obj.fname}</td>
    <td>${obj.lname}</td>
     <td>${obj.email}</td>
    <td>${obj.contact}</td>
    <td>${obj.id}</td>
    
    <td><button class="btn btn-primary" data-id="${obj.id}" onclick="onstdedit(this)">Edit</button></td>
   <td><button class="btn btn-danger" data-id="${obj.id}" onclick="onstddelete(this)">Delete</button></td>
    `;
    info.append(tr);
}


const onstdsubmit=(e) => {
    e.preventDefault();
    //cl(e)
    let obj={
        fname:fnamecontrol.value,
        lname:lnamecontrol.value,
        email:emailcontrol.value,
        contact:contactcontrol.value,
        id:uuid()


    };
    
    stdarray.push(obj);     //1
    localStorage.setItem('stdarray', JSON.stringify(stdarray));
    createtr(obj);
    e.target.reset();
};

const onstdupdate=(e)=>{
    let getId=localStorage.getItem('getId')
    //cl(getId);
    //cl(stdarray)
    stdarray.forEach((ele)=>{
        if(ele.id===getId){
            ele.fname=fnamecontrol.value;
            ele.lname=lnamecontrol.value;
            ele.email=emailcontrol.value;
            ele.contact=contactcontrol.value;
        }
    });
    cl(stdarray)
    localStorage.setItem('stdarray', JSON.stringify(stdarray))
    templating(stdarray)
    stdform.reset();
    updatebtn.classList.add('d-none');
    submitbtn.classList.remove('d-none');
};


function templating(arr){
    let result="";
    arr.forEach((std,i)=>{
        result+=`
       <tr>
        <td>${i+1}</td>
       <td>${std.fname}</td>
        <td>${std.lname}</td>
       <td>${std.email}</td>
       <td>${std.contact}</td>
       
       <td><button class="btn btn-primary" data-id="${std.id}" onclick="onstdedit(this)">Edit</button></td>
       <td><button class="btn btn-danger deletebtn" data-id="${std.id}" onclick="onstddelete(this)">Delete</button></td>
        </tr>
        
        `;
    });
    info.innerHTML=result;
}

//on page refresh>>is there data in local storage then get that data and create tr using 
//templating function
if(localStorage.getItem('stdarray')){
    stdarray=JSON.parse(localStorage.getItem('stdarray'))
    templating(stdarray)
}



stdform.addEventListener('submit', onstdsubmit);
updatebtn.addEventListener('click', onstdupdate);