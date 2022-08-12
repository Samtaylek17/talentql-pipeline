const startApp = async () => {
	const container: HTMLElement = document.querySelector('[data-sink]')!;
	const nextBtn: HTMLElement = document.querySelector('[data-nextbtn]')!;
	const prevBtn = document.querySelector('[data-prevbtn]')!;
	const pageLabel = document.querySelector('[data-pageview]')!;

	/* It's defining the page number as 1. */
	let pageNumber: number = 1;

	/* It's defining the shape of the data that we're going to be getting back from the API. */
	interface IUser {
		id: string;
		age: number;
		gender: 'male' | 'female';
		row: number;
	}

	/**
	 * It takes an array of users, loops through them, and then pushes the output to a new array
	 * @param {IUser[]} users - IUser[] - this is the array of users that we're going to be looping
	 * through.
	 */
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

	/**
	 * We're using the fetch API to make a request to the randomapi.com API, and then we're using the
	 * response to get the data, and then we're using the data to get the results, and then we're using
	 * the results to get the first page, and then we're using the first page to show the result
	 * @param {number} [page=1] - number = 1
	 */
	const getUsers = async ({ page }: { page: number }): Promise<void> => {
		if (page === 1) {
			prevBtn.setAttribute('disabled', 'true');
		} else {
			prevBtn.removeAttribute('disabled');
		}
		const response: Response = await fetch(`https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84&page=${page}`);
		const data = await response.json();
		const { results } = data;
		const firstPage = results[0][page];

		showResult(firstPage);

		pageLabel.innerHTML = `Showing Page ${page}`;
	};

	/* It's adding an event listener to the next button, and when the next button is clicked, it's
  going to increment the page number by 1, and then it's going to call the getUsers function and pass
  in the page number. */
	nextBtn.addEventListener('click', () => {
		pageNumber = pageNumber + 1;
		getUsers({ page: pageNumber });
	});

	/* It's adding an event listener to the previous button, and when the previous button is clicked, it's
  going to decrement the page number by 1, and then it's going to call the getUsers function and pass
  in the page number. */
	prevBtn.addEventListener('click', () => {
		pageNumber = pageNumber - 1;
		getUsers({ page: pageNumber });
	});

	getUsers({ page: 1 });
};

document.addEventListener('DOMContentLoaded', startApp);
