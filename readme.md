# data-paginate
this is pagination hook with array of data

import React from 'react';
import { usePagination } from 'data-paginate';

const data = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    // Add more items as needed
];

function MyComponent() {
    const limit = 10; // Number of items per page
    const { paginatedData, page, totalPages, nextPage, prevPage, goToPage } = usePagination(data, limit);

    return (
        <div>
            <ul>
                {paginatedData.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
            <div>
                <button onClick={prevPage} disabled={page === 1}>
                    Previous
                </button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <button onClick={nextPage} disabled={page === totalPages}>
                    Next
                </button>
            </div>
            <div>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => goToPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MyComponent;

# Props
PaginatedComponent Props
paginatedData: Array of items to display on the current page.
page: Current page number.
totalPages: Total number of pages.
onNextPage: Function to handle next page navigation.
onPrevPage: Function to handle previous page navigation.
onGoToPage: Function to handle navigating to a specific page.
usePagination Hook Parameters
data: Array of items to paginate.
limit: Number of items per page.
initialPage: Initial page number (default: 1).
usePagination Hook Return Value
paginatedData: Array of items for the current page.
page: Current page number.
totalPages: Total number of pages.
nextPage: Function to navigate to the next page.
prevPage: Function to navigate to the previous page.
goToPage: Function to navigate to a specific page.
