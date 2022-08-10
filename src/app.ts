const startApp = async () => {
	const container: HTMLElement = document.querySelector('[data-sink]')!;
	const nextBtn: HTMLElement = document.querySelector('[data-nextbtn]')!;
	const prevBtn = document.querySelector('[data-prevbtn]')!;
	let pageNumber: number = 1;

	interface IUser {
		id: string;
		age: number;
		gender: 'male' | 'female';
		row: number;
	}

	const showResult = (users: IUser[]): void => {
		let newUsers: any = [];

		users.forEach((user) => {
			const output = `
        <tr data-entryid="${user.id}">
          <td>${user.row}</td>
          <td>${user.gender}</td>
          <td>${user.age}</td>
        </tr>
      `;
			newUsers.push(output);
		});
		container.innerHTML = newUsers.join('');
	};

	const getUsers = async (page: number = 1): Promise<void> => {
		const response: Response = await fetch(`https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${page}`);
		const data = await response.json();
		const { results } = data;
		const firstPage = results[0][page];
		// firstPage.map((user: IUser) => {
		showResult(firstPage);
		// });
	};

	nextBtn.addEventListener('click', () => {
		pageNumber = pageNumber + 1;
		getUsers(pageNumber);
	});

	prevBtn.addEventListener('click', () => {
		pageNumber = pageNumber - 1;
		getUsers(pageNumber);
	});

	console.log(pageNumber);

	getUsers();
};

document.addEventListener('DOMContentLoaded', startApp);
