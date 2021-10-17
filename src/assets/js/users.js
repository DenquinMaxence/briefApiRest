const mainUsers = document.querySelector('.users');

fetch('https://reqres.in/api/users')
	.then((res) => res.json())
	.then((result) => {
		console.log(result);
		const users = result.data;

		if (users.length > 0) {
			mainUsers.innerHTML = '';

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
                            <button>Modifier</button>
                            <button>Supprimer</button>
                        </div>
                    </div>
                `;

				mainUsers.innerHTML += htmlDiv;
			});
		}
	});
