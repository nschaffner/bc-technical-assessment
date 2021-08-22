const section = document.querySelector('section');

let requestURL = 'https://app.blockclinical.com/api/recruit/questions';
let request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
    const techQuestions = request.response;
    populateQuestions(techQuestions);
}

function populateQuestions(obj) {
    const numQuestions = obj['data']['info']['questions']
                
    for (let i = 0; i < numQuestions.length; i++) {
        var numQuest = 'question' + (i+1);
        document.getElementById(numQuest).innerHTML = 'Question ' + numQuestions[i].id + ': ' + numQuestions[i].question;
    }
}