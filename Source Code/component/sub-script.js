var startButton= document.getElementById('start-btn');
startButton.addEventListener('click', startQuiz);

var count=1;
let shuffleQuestions, currentQuestionIndex
var score=0;
var scoreElement= document.getElementById('score')

var subContainer= document.getElementById("sub-content")

var instructions= document.getElementById("instruction")

var submitButton= document.getElementById('submit-btn');
submitButton.addEventListener('click', submitHandler)

var questionContainerElement=document.getElementById("question-container")
var questionElement= document.getElementById('question');
var answerButton=document.getElementById('ans-btns');

var nextButton= document.getElementById('next-btn');
nextButton.addEventListener('click', ()=> {
    currentQuestionIndex ++
    nextQuestionHandler();
})


window.onload= function(){
    let screenWidth= screen.availWidth;
    if(screenWidth<=1079){
        alert("Please use desktop to take the quiz")
        startButton.setAttribute('disabled','')
    }
}

function startQuiz(){
    startButton.classList.remove('start-btn');
    startButton.classList.add('hide');
    instructions.classList.add('hide')
    console.log("Started")

    shuffleQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide')
    nextQuestionHandler()

    var time = 100, // your time in seconds here
    display = document.querySelector('#timer');
    startTimerHandler(time, display);
}

function nextQuestionHandler(){
    resetStateHandler()
    showQuestion(shuffleQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText= question.question;

    question.answers.forEach( answer => {
        const button= document.createElement('abutton');
        button.innerText= answer.text;
        button.setAttribute('id', 'ans-btn')
        button.classList.add('btn');
        if(answer.correct){
            button.dataset.correct = answer.correct       
        }
        button.addEventListener('click', selectAnswerHandler)
        answerButton.appendChild(button);
    })
    document.getElementById("quesnumber").innerText= parseInt(count) + "/10"
    count ++;
    
}

function resetStateHandler(){
    nextButton.classList.add('hide');
    
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}
function selectAnswerHandler(e){
    var selectedAnswer = e.target
    selectedAnswer.classList.add('select')
    const correct = selectedAnswer.dataset.correct
    
    scoreHandler(correct)

    setStatusClass(document.body, correct)
    Array.from(answerButton.children).forEach( button =>{
        setStatusClass(button, button.dataset.correct)
        button.removeEventListener('click',selectAnswerHandler)
    })

    if(shuffleQuestions.length>currentQuestionIndex + 1){
        nextButton.classList.remove('hide')
    } else if(shuffleQuestions.length === currentQuestionIndex + 1){
        submitButton.classList.remove('hide')
    }
    
}

function scoreHandler(correct){
    if(correct){
        score++
        // console.log(score)
        scoreElement.innerText= score + "/10"
    }
}

function setStatusClass(element, correct){
    clearStatusClass(element)
    
    if(correct){
        element.classList.add('correct');
    } else  {
        element.classList.add('wrong')
    }
}
function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//--------------- Js code for timer--------------
function startTimerHandler(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        localStorage['minutes'] = minutes = minutes < 10 ? "0" + minutes : minutes;
        localStorage['seconds'] = seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer=0
            submitHandler();
            // timer = duration; // uncomment this line to reset timer automatically after reaching 0
        }
    }, 1000);
}

// ------------- Results Page Code-----------

var NoCorrectQuestions= document.getElementById("correct-Que");
var NoWrongQuestions= document.getElementById("wrong-Que");
var percentage= document.getElementById('percentage');
var results= document.getElementById("results")
var nameElement= document.getElementById("username");
var timeElement= document.getElementById('time')
var attemptedQuestion=document.getElementById("attempt")

function submitHandler(){
    
    clearInterval();
    subContainer.classList.add('hide')
    results.classList.remove('hide')
    var myVar= localStorage['myName']
    var minutes=localStorage['minutes']
    var seconds=localStorage['seconds']

    var minVar=1;
    var secVar=40;

    if(minutes>1){
        minVar= 1-minutes;
    } else if(minutes<=1 && seconds>0){
        minVar= 0
        // console.log(minVar)
    }
    
    if(seconds>40){
        secVar= 100-seconds;
    } 
    else if(seconds<=40 && seconds>0){
        secVar= 40-seconds;
    } 

    nameElement.innerText= "User Name : " + myVar
    timeElement.innerText="Time Taken : 0"+ minVar+ ":" + secVar;
    NoCorrectQuestions.innerText= "Correct Questions : " + score;

    var attempt=count-1;
    attemptedQuestion.innerText= "Attepted Questions : " + attempt;

    let wrongQuestion= 10 - score;
    NoWrongQuestions.innerText= "Wrong Questions : " + wrongQuestion;

    let percent= (score/10)*100;
    percentage.innerText= "Percentage : " + percent + "%"

}
