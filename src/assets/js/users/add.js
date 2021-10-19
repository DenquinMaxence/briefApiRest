const newUserForm = document.getElementById('newUserForm');
const counterTitle = document.getElementsByTagName('h1').item(1);
const counterRedirect = document.getElementById('counter');
const jsonContainer = document.getElementById('json-container');
const jsonResult = document.getElementById('json-result');

newUserForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(newUserForm);
	const dataToInsert = {};

	formData.forEach((value, key) => {
		dataToInsert[key] = value;
	});

	fetch('https://reqres.in/api/users', {
		method: 'POST',
		body: JSON.stringify(dataToInsert),
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then((res) => res.json().then((response) => ({ status: res.status, response })))
		.then((result) => {
			jsonContainer.style = 'display: block';
			jsonResult.innerHTML = library.prettyPrint(result);

			let counter = 10;
			counterTitle.style = 'display: block';
			setInterval(() => {
				counter--;
				counterRedirect.innerHTML = counter;
				if (counter === 0) window.location = '/src/pages/users/index.html';
			}, 1000);
		});

	newUserForm.reset();
});
