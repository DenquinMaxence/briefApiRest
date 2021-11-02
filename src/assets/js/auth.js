const loginForm = document.getElementById('loginForm');
const counterTitle = document.getElementsByTagName('h1').item(1);
const counterRedirect = document.getElementById('counter');
const jsonContainer = document.getElementById('json-container');
const jsonResult = document.getElementById('json-result');

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const loginFormData = new FormData(loginForm);
	const dataToCheck = {};

	loginFormData.forEach((value, key) => {
		dataToCheck[key] = value;
	});

	fetch('https://reqres.in/api/login', {
		method: 'post',
		body: JSON.stringify(dataToCheck),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json().then((response) => ({ status: res.status, response })))
		.then((result) => {
			jsonContainer.style = 'display: block';
			jsonResult.innerHTML = library.prettyPrint(result);

			if (result.status !== 400) {
				localStorage.setItem('loginToken', result.response.token);

				let counter = 10;
				counterTitle.style = 'display: block';
				setInterval(() => {
					counter--;
					counterRedirect.innerHTML = counter;
					if (counter === 0) window.location = '/briefApiRest/src/pages/users/index.html';
				}, 1000);
			}
		});
});
