let question1 = new Question(
    "JavaScript Supports _____", 
    ["Functions", "XHTML", "CSS", "HTML"], 
    "Functions"
);

let questions = [ 
    question1,
    new Question('Javascript is an _______ language?', ["Object-Based", "Object-Oriented", "Procedural", "None of the above"], 'Object-Oriented'),
    new Question('Which of the following keywords is used to define a variable in Javascript?', ["var", "let", "Both A and B", "None of the above"], 'Both A and B'),
    new Question('How to stop an interval timer in Javascript?', ["ClearInterval", "ClearTimer", "IntervalOver", "None of the above"], 'ClearInterval'),
    new Question('What keyword is used to declare an asynchronous function in Javascript?', ["async", "await", "setTimeout", "None of the above"], 'async'),
    new Question('How do we write a comment in javascript?', ["/* */", "//", "#", "$$"], '//'),
    new Question('Which of the following are not server-side Javascript objects?', ["Date", "FileUpload", "Function", "All of the above"], 'All of the above'),
    new Question('Which of the following is not a Javascript framework?', ["Node", "Vue", "React", "cassandra"], 'cassandra'),
    new Question('Which of the following are closures in Javascript?', ["Functions", "variables", "Objects", "All of the above"], 'All of the above'),
    new Question('Which function is used to serialize an object into a JSON string in Javascript?', ["stringify()", "parse()", "convert()", "None of the above"], 'stringify()')

];

function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.index = 0;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.index];
}

Quiz.prototype.checkForCorrectAnswer = function(answer){
    if(this.getQuestionByIndex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.index++;
}

Quiz.prototype.isEnded = function(){
    return this.index === this.questions.length;
}

function Question(questionText, choices, answer) {
    this.text = questionText;
    this.choices = choices;
    this.answer = answer; 
}

Question.prototype.isCorrectAnswer = function(choice){
    return this.answer === choice;
}

function loadQuestions() {
    if(quiz.isEnded()) {
        showFinalScores();
    }else{
        let element = document.getElementById('question');
        element.innerHTML = quiz.getQuestionByIndex().text;

        let answers = quiz.getQuestionByIndex().choices;
        for(let i=0; i < answers.length; i++) {
            let eachChoiceElement = document.getElementById('choice'+i);
            eachChoiceElement.innerHTML = answers[i];

            let eachButtonElement = document.getElementById('btn'+i);
            eachButtonElement.onclick = function(){
                quiz.checkForCorrectAnswer(answers[i]);
                loadQuestions();
            };
        }
        showProgress();
    }
}

let quiz = new Quiz(questions);
loadQuestions();

function showFinalScores() {
    let completeHTML = 
    `<h1> Result </h1>
     <h2 id='score'> Your scores : ${quiz.score} </h2>
     <h3>And mark percentage is : ${quiz.score/questions.length*100}% </h3>
    `;
    let quizCanvas  = document.getElementById('quiz');
    quizCanvas.innerHTML = completeHTML;
}

function showProgress() {
    let questNo = quiz.index + 1;
    let element = document.getElementById('progress');
    element.innerHTML = 'Question '+ questNo + ' of '+quiz.questions.length;
}