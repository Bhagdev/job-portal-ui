import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function JobsPagination({ currentPage, setPage, hasNextPage, totalPages }) {
  function adjustPage(amount) {
    setPage(prevPage => prevPage + amount)
  }

  let items = [];
  for (let page = 1; page <= totalPages; page++) {
    items.push(
      <Pagination.Item key={page} active={page === currentPage} onClick={() => setPage(page)}>
        {page}
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <Pagination>{items}</Pagination>
    </div>

  )
}
