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

async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
    const formDataJsonString = JSON.stringify(plainFormData);

    const encoded = encodeURIComponent(formDataJsonString);
	const decoded = decodeURIComponent(encoded);
	console.log(formDataJsonString);
	console.log(decoded);

	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Accept": "application/x-www-form-urlencoded",
		},
		body: encoded,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
}

async function handleFormSubmit(event) {
	event.preventDefault();

	const form = event.currentTarget;
	const url = form.action;

	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });

		console.log({ responseData });
	} catch (error) {
		console.error(error);
	}
}

const exampleForm = document.getElementById("answers");
exampleForm.addEventListener("submit", handleFormSubmit);
