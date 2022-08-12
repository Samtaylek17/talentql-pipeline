This app was created to show a simple frontend application for paginated data. The app intends to do the following.

1.  Fetches (randomised) data from `https://randomapi.com/api/8csrgnjw?key=LEIX-GF3O-AG7I-6J84` which can be paged by
    appending `&page=N` where N is the page you want to fetch. E.g appending `&page=1` retrieves the first page, while
    `&page=4` retrieves the 4th page.

2.  Displays the fetched data in a HTML table with 5 rows (the API only returns 5 records), and allows the user to page
    next/previous with buttons in the UI

#### Implementation Guidelines (How does it work)

1. Create a function that accepts page number as parameters. Using the fetch API, we'll make a request to the
   randomapi.com API, which returns and two rows of records

2. We create a function that accepts an object (the record array returned from the API) loops through the array and set
   the result into a table row with an anttribute of data entryid which is the id of each record.

3. Using the query selector to select the next and previous, added an onclick event listener on the buttons, which
   fetches the next set of data based on the current page we are (check the pageNumber variable declared). pageNumber
   increases by 1 for the next button and decreases by 1 for the previous button.

4. A label is displayed to show the current page we are each time the table records change.

5. The Previous button is disabled for pageNumber = 1
