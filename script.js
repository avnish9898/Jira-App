let filterColor = document.querySelectorAll(".filter");
let modalColors = document.querySelectorAll(".modal-color");
let mainContainer = document.querySelector(".main-container");
let modalContainer = document.querySelector(".modal_container");
let taskBox = document.querySelector(".task_box");
let plusBtn = document.querySelector(".plus");
let crossBtn=document.querySelector(".cross")
let filterContainers = document.querySelectorAll(".filter_color-container");
let modalFlag = false;
let iColor = "black";
let colors = ["pink", "blue", "green", "black"];
let allTasks = [];
let del=false;
let edit=false;
let editBtn=document.querySelector(".lock")
let ticketDesc=document.querySelector(".ticket_desc")

// init 
if (localStorage.getItem("allTasks")) {
    let strArr = localStorage.getItem("allTasks");
    allTasks = JSON.parse(strArr);
    // ??
    for (let i = 0; i < allTasks.length; i++) {
        createTicketFromLocalStorage(allTasks[i]);
    }

}

function createTicketFromLocalStorage(taskObj) {
    let { id, color, task } = taskObj;
    let taskContainer = document.createElement("div");
    taskContainer.setAttribute("class", "ticket_container");
    taskContainer.innerHTML = `<div class="ticket_color ${color}"></div>
        <div class="ticket_desc_container">
        <div class="ticket_id">#${id}</div>
        <div class="ticket_desc">${task}</div>
        </div>`;
    mainContainer.appendChild(taskContainer);
    // cleanup code
    addFunctionality(taskContainer);
}


for (let i = 0; i < filterColor.length; i++) {
    filterColor[i].addEventListener("click", function() {
        let classes = filterColor[i].getAttribute("class");
        // console.log(classes);
        let color = strArr[1];
        let mainClasses = mainContainer.getAttribute("class");
        let mainCArr = mainClasses.split(" ");
        mainCArr[1] = color;
        mainClasses = mainCArr.join(" ");
        mainContainer.setAttribute("class", mainClasses);
    })
}
plusBtn.addEventListener("click", function() {
    modalContainer.style.display = "flex";
})
taskBox.addEventListener("keydown", function(e) {
    if (e.key == "Enter" && taskBox.value != "") {
        let taskContainer = document.createElement("div");
        let task = taskBox.value;
        taskContainer.setAttribute("class", "ticket_container");
        let id = Math.random().toString(32).slice(2);
        taskContainer.innerHTML = `<div class="ticket_color ${iColor}"></div>
        <div class="ticket_desc_container">
        <div class="ticket_id">#${id}</div>
        <div class="ticket_desc">${task}</div>
        </div>`;
        mainContainer.appendChild(taskContainer);
        // cleanup code
        let ticketObj = {}
        ticketObj.task = task;
        ticketObj.color = iColor;
        ticketObj.id = id;
        allTasks.push(ticketObj);
        let strArr = JSON.stringify(allTasks);
        localStorage.setItem('allTasks', strArr);

        modalContainer.style.display = "none";
        taskBox.value = "";
        iColor = "black";
        addFunctionality(taskContainer);

      
        
    }
})
for (let i = 0; i < modalColors.length; i++) {
    modalColors[i].addEventListener("click", function() {
        let color = modalColors[i].classList[1];
        iColor = color;
        // remove everyone
        for (let j = 0; j < modalColors.length; j++) {
            modalColors[j].classList.remove("border");
        }
        // add 
        modalColors[i].classList.add("border");

    })
}

function addFunctionality(taskContainer) {
    let ticketColor = taskContainer.querySelector(".ticket_color");
    ticketColor.addEventListener("click", function() {
        let cColor = ticketColor.classList[1];
        let idx = colors.indexOf(cColor);
        let newIdx = (idx + 1) % 4;
        let newColor = colors[newIdx];
        ticketColor.classList.remove(cColor);
        ticketColor.classList.add(newColor);
        let ticketIdElem = taskContainer.querySelector(".ticket_id");
        let id = ticketIdElem.innerText;
        id = id.slice(1);
        // alert(ticketId.innerText);
        // local add
        for (let i = 0; i < allTasks.length; i++) {
            if (allTasks[i].id == id) {
                allTasks[i].color = newColor
                let strArr = JSON.stringify(allTasks);
                localStorage.setItem('allTasks', strArr);
            }
        }

    })


}
crossBtn.addEventListener("click",function(){
    if(del==false){
        del=true;
        crossBtn.style.color="white"
     
    }
    else{
        crossBtn.style.color="black"
        del=false;
    }
    //removing element \
    let ticketContainerApp=document.querySelectorAll(".ticket_container")
for(let i=0;i<ticketContainerApp.length;i++){
    ticketContainerApp[i].addEventListener("click",function(){
        if(del){
           
            ticketContainerApp[i].remove();
            let idd=ticketContainerApp[i].children[1].children[0].innerText.substring(1)
            let strArr = localStorage.getItem("allTasks");
            allTasks = JSON.parse(strArr);
            for(let i=0;i<allTasks.length;i++){
                if(allTasks[i].id==idd){
                    allTasks.splice(i,1);
                }
            }
            let ans=JSON.stringify(allTasks);
            localStorage.setItem("allTasks",ans)
            
        }
    })
}
})

// *********edit content****************
editBtn.addEventListener("click",function(){
    if(edit==false){
        edit=true;
        editBtn.style.color="white"
    }
    else{
        edit=false;
        editBtn.style.color="black"
    }
    let ticketContainerApp=document.querySelectorAll(".ticket_desc")
    for(let i=0;i<ticketContainerApp.length;i++){
    ticketContainerApp[i].addEventListener("click",function(){
        if(edit){
           ticketContainerApp[i].contentEditable =true;
            edit=false;    
        }
    })
}
})

// ****filtering Logic************
let prevColor = null;
for (let i = 0; i < filterContainers.length; i++) {

    filterContainers[i].addEventListener("click", function() {

        let child = filterContainers[i].children[0];
        let color = child.classList[1];
        if (prevColor == color) {
            let ticketContainers = document.querySelectorAll(".ticket_container");
            for (let j = 0; j < ticketContainers.length; j++) {
                ticketContainers[j].style.display = "block";
            }
            prevColor = null;
        } else {
            let ticketContainers = document.querySelectorAll(".ticket_container");
            for (let j = 0; j < ticketContainers.length; j++) {
                let ticketColor = ticketContainers[j].children[0];
                let mycolor = ticketColor.classList[1];
                if (mycolor == color) {
                    ticketContainers[j].style.display = "block";
                } else {
                    ticketContainers[j].style.display = "none";
                }
            }
            prevColor = color;
        }


    })
}

