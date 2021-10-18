const mainUsers = document.querySelector('.users');
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

fetch('https://reqres.in/api/users')
	.then((res) => res.json().then((response) => ({ status: res.status, response })))
	.then((result) => {
		const users = result.response.data;
		jsonResult.innerHTML = library.prettyPrint(result);

		if (users.length > 0) {
			users.forEach(({ id, email, last_name, first_name, avatar }) => {
				console.log(id, email, last_name, first_name, avatar);
				const htmlDiv = `
                    <div>
                        <p>
                            <strong>${last_name} ${first_name}</strong>
                        </p>
                        <p>${email}</p>
                        <img src="${avatar}" alt="user-${id}-pic">
                        <div class="button">
							<a href="#" class="btn btn-sm btn-warning">Modifier</a>
							<a href="#" class="btn btn-sm btn-danger">Supprimer</a>
                        </div>
                    </div>
                `;

				mainUsers.innerHTML += htmlDiv;
			});
		}
	});
