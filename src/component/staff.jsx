import React from "react";

export default function StaffTable(props) {
  const { staffs, handleDelete } = props;

  return (
    <React.Fragment>
      <table className="table" id="table-to-xls">
        <thead className="thead-dark">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Mã nhân viên</th>
            <th scope="col">Tên nhân viên</th>
            <th scope="col">Email</th>
            <th scope="col">Số điện thoại</th>
            <th scope="col">Tuổi</th>
            <th scope="col">Tùy chọn</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {staffs.map((staff, index) => (
            <tr key={index} className="__item">
              <th scope="row">{index + 1}</th>
              <td>{staff.code}</td>
              <td>{staff.name}</td>
              <td>{staff.email}</td>
              <td>{staff.phone}</td>
              <td>{staff.age}</td>
              <td
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div className="text-warning">Sửa</div>
                <div
                  className="text-danger"
                  onClick={() => handleDelete(staff.id)}
                >
                  Xóa
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </React.Fragment>
  );
}
