import React from "react";

export default function Pagination(props) {
  const {
    postsPerPage,
    totalPosts,
    handlePagination,
    currentPage,
    handlePageChange,
  } = props;
  const pageNumbers = [];
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination ">
        <li
          className={`page-item ${currentPage === 1 ? "disabled" : ""} `}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <a className="page-link" href="!#" tabIndex="-1">
            Previous
          </a>
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === number ? "active" : ""}`}
            onClick={() => handlePagination(number, index)}
          >
            <span className="page-link">{number}</span>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          } `}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="page-link" tabIndex="-1">
            Next
          </span>
        </li>
      </ul>
    </div>
  );
}
