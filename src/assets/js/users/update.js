const updateUserForm = document.getElementById('updateUserForm');
const counterTitle = document.getElementsByTagName('h1').item(1);
const counterRedirect = document.getElementById('counter');
const jsonContainer = document.getElementById('json-container');
const jsonResult = document.getElementById('json-result');

updateUserForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const urlParams = new URLSearchParams(window.location.search);
	if (urlParams.has('user')) {
		const id = parseInt(urlParams.get('user'));

		if (typeof id === 'number' && id >= 1) {
			const formData = new FormData(updateUserForm);
			const dataToUpdate = {};

			formData.forEach((value, key) => {
				dataToUpdate[key] = value;
			});

			fetch(`https://reqres.in/api/users/${id}`, {
				method: 'PUT',
				body: JSON.stringify(dataToUpdate),
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
		}
	}
});
