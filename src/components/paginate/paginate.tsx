import React from "react";
import ReactPaginate from 'react-paginate';
import './reactPaginate.css'
type PaginateProps = {
  handleClick: (data: {selected: number}) => void
  pageCount: number
  initialPage: number
}
const Paginate:React.FC <PaginateProps> = ({pageCount, initialPage, handleClick}) => {
 return (
    <ReactPaginate
    previousLabel={'prev'}
    nextLabel={'next'}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={3}
    onPageChange={handleClick}
    containerClassName={'pagination'}
    activeClassName={'active'}
    initialPage={initialPage}
  />
 )
}

export default Paginate