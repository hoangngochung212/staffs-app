import React from "react";

export default function Search(props) {
  const { handleOnchange, search } = props;
  return (
    <div className="seach-items">
      <div className="input-group" style={{ marginTop: " 24px" }}>
        <div className="form-group d-flex" style={{ width: "100%" }}>
          <input
            type="text"
            value={search}
            className="form-control"
            placeholder="Search for names ..."
            onChange={(e) => handleOnchange(e)}
          />
        </div>
      </div>
    </div>
  );
}
