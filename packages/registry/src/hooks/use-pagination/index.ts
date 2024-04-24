import { useState } from "react";

interface IUsePagination {
  contentPerPage: number;
  count: number;
}

function usePagination({ contentPerPage, count }: IUsePagination) {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;

  const changePage = (direction: 'next' | 'previous') => {
    return () => {
      setPage(prevPage => {
        if (direction === 'next') {
          if (prevPage === pageCount) return prevPage;

          return prevPage++;
        }

        if (direction === 'previous') {
          if (prevPage === 1) return prevPage;

          return prevPage--;
        }

        return prevPage;
      });
    }
  };

  const jumpToPage = (pageNumber: number) => {
    if (pageNumber > pageCount) return setPage(pageCount);

		if (pageNumber < 1) return setPage(1);

		setPage(pageNumber);
  };

  return {
    totalPages: pageCount,
    nextPage: changePage('next'),
    prevPage: changePage('previous'),
    setPage: jumpToPage,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};


export default usePagination;