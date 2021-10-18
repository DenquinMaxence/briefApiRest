const newUserForm = document.getElementById('newUserForm');
const counterTitle = document.getElementsByTagName('h1').item(1);
const counterRedirect = document.getElementById('counter');
const jsonContainer = document.getElementById('json-container');
const jsonResult = document.getElementById('json-result');

// Allows you to make JSON more visually pleasing, code found on : http://jsfiddle.net/unLSJ/
const library = {
	replacer: function (match, pIndent, pKey, pVal, pEnd) {
		const key = '<span class=json-key>';
		const val = '<span class=json-value>';
		const str = '<span class=json-string>';
		let r = pIndent || '';
		if (pKey) r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
		if (pVal) r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
		return r + (pEnd || '');
	},
	prettyPrint: function (obj) {
		var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
		return JSON.stringify(obj, null, 3)
			.replace(/&/g, '&amp;')
			.replace(/\\"/g, '&quot;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(jsonLine, library.replacer);
	},
};

newUserForm.addEventListener('submit', (e) => {
	e.preventDefault();

	const formData = new FormData(newUserForm);
	const dataToInsert = {
		avatar: 'http://lorempixel.com/128/128/',
	};

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
