const mainUsers = document.querySelector('.users');
const jsonResult = document.getElementById('json-result');

fetch('https://reqres.in/api/users')
	.then((res) => res.json().then((response) => ({ status: res.status, response })))
	.then((result) => {
		const users = result.response.data;
		jsonResult.innerHTML = library.prettyPrint(result);

		if (users.length > 0) {
			users.forEach(({ id, email, last_name, first_name, avatar }) => {
				const htmlDiv = `
                    <div>
                        <p>
                            <strong>${last_name} ${first_name}</strong>
                        </p>
                        <p>${email}</p>
                        <img src="${avatar}" alt="user-${id}-pic">
                        <div class="button">
							<a href="./update.html?user=${id}">
								<button type="button" class="btn btn-sm btn-warning">
									Modifier
								</button>
							</a>
							<button type="button" class="btn btn-sm btn-danger" onClick="deleteUser(${id})">
								Supprimer
							</button>
                        </div>
                    </div>
                `;

				mainUsers.innerHTML += htmlDiv;
			});
		}
	});

const deleteUser = (id) => {
	if (typeof id === 'number' && id >= 1) {
		fetch(`https://reqres.in/api/users/${id}`, {
			method: 'delete',
		}).then((res) => {
			jsonResult.innerHTML = library.prettyPrint({ status: res.status });
		});
	}
};
