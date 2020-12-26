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
            <a href="!#" className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          } `}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <a className="page-link" href="!#" tabIndex="-1">
            Next
          </a>
        </li>
      </ul>
    </div>
  );
}
