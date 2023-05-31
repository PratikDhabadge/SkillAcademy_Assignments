var clicked=false;
var inputName= document.getElementById("name");
var errorMsg= document.getElementsByClassName("err-msg")

var enterElement= document.getElementById("enter-btn")
enterElement.addEventListener('click', inputHandler)


var pipesButton=document.getElementById('item-1')
pipesButton.addEventListener('click', pipesProblemHandler)

var probabilityButton=document.getElementById('item-2')
probabilityButton.addEventListener('click', probabiltyHandler)

var probOnAgeButton=document.getElementById('item-3')
probOnAgeButton.addEventListener('click', problemOnAgesHandler)

var profitButton=document.getElementById('item-4')
profitButton.addEventListener('click', profitLossHandler)

var tryNowButton=document.getElementById('trynow-btn')
tryNowButton.addEventListener('click', focusHandler)

var userName;

function focusHandler(){
    inputName.focus();
}

function inputHandler(){
    
    localStorage['myName']= userName= inputName.value.trim();

    if(userName!==''){
        inputName.className="name"
        alert("Response received!");
        clicked=true;
    }else{
        inputName.className= "error";
        alert("Name cannot be empty")
    }
    console.log(userName)
    inputName.value=''
    
}
function pipesProblemHandler(){
    if(clicked){
        window.open('/component/pipesCisterns/index.html');

    } else{
        inputName.className= "error"
        errorMsg.IN=""
    }
}
function probabiltyHandler(){
    if(clicked){
        window.open('/component/probability/index.html')
    } else{
        inputName.className= 'error';

    }
}
function problemOnAgesHandler(){
    if(clicked){
        window.open('/component/problemOnAges/index.html')
    } else{
        inputName.className= 'error';
    }
}
function profitLossHandler(){
    if(clicked){
        window.open('/component/profitLoss/index.html')
    } else{
        inputName.className= 'error';
    }
}



