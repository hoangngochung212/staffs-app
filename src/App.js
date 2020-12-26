import React, { useState, useEffect } from "react";
import "./App.css";
import StaffTable from "./component/staff";
import Search from "./component/search";
import Pagination from "./component/pagination";
import AddStaff from "./component/addStaff";
import Export from "./component/export";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import  'bootstrap/dist/css/bootstrap.css';
function App() {
  const [staffs, setSaffs] = useState([]);
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const [addInputEl, setAddInputEl] = useState({
    code: "",
    name: "",
    email: "",
    phone: "",
    age: "",
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    async function fetchStaffList() {
      try {
        const requestUrl = "https://json-server-staffs.herokuapp.com/staffs";
        const response = await fetch(requestUrl);
        const data = await response.json();
        setSaffs(data);
      } catch (erorr) {
        return toastr.error(
          `Lỗi đường dẫn: "${erorr}" , vui lòng kiểm tra lại !`,
          "Thông báo",
          {
            timeOut: 10000,
          }
        );
      }
    }

    fetchStaffList();
  }, [staffs]);

  const handleAddChange = (e) => {
    var result = "NV";
    var characters = "0123456789";
    for (var i = 0; i <= 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * 5));
    }
    const { name, value } = e.target;
    setAddInputEl((prevState) => ({
      ...prevState,
      [name]: value,
      code: result,
    }));
  };

  // create
  async function handleCreate(e) {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const { name, email, phone, age } = addInputEl;

    const check = staffs.some(
      (staff) =>
        staff.email === email || staff.name === name || staff.phone === phone
    );

    if (
      name === "" ||
      phone === "" ||
      age === "" ||
      email === "" ||
      !regexEmail.test(email)
    ) {
      return toastr.warning("Vui lòng nhập đầy đủ thông tin", "Thông báo", {
        timeOut: 2000,
      });
    } else {
      if (check) {
        return toastr.info(
          "Thông tin nhân viên đã tồn tại, vui lòng nhập lại !",
          "Thông báo",
          {
            timeOut: 2000,
          }
        );
      } else {
        try {
          const response = await fetch("https://json-server-staffs.herokuapp.com/staffs", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(addInputEl),
          });

          setShow(false);
          toastr.success("Thêm mới thành công", "Thông báo", {
            timeOut: 2000,
          });

          return response.json();
        } catch (error) {
          return toastr.error(
            "Lỗi đường dẫn , vui lòng kiểm tra lại !",
            "Cảnh báo",
            {
              timeOut: 10000,
            }
          );
        }
      }
    }
  }

  async function handleDelete(staffId) {
    const result = window.confirm("Bạn có chắc chắn muốn xóa ?");
    if (result) {
      try {
        const response = await fetch(
          "https://json-server-staffs.herokuapp.com/staffs/" + staffId,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toastr.success("Xóa thành công", "Thông báo", {
          timeOut: 2000,
        });
        return response.json();
      } catch (error) {
        return toastr.error(
          "Lỗi đường dẫn , vui lòng kiểm tra lại !",
          "Cảnh báo",
          {
            timeOut: 10000,
          }
        );
      }
    }
  }

  const filterSearch = staffs.filter((staff) =>
    staff.name.toLowerCase().includes(search)
  );

  const handleChange = (e) => {
    setCurrentPage(1);
    setSearch(e.target.value.toLowerCase());
  };
  //get current
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentStaffs = filterSearch.slice(indexOfFirstPost, indexOfLastPost);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <React.Fragment>
      <div className="header">
        <h1 style={{ textAlign: "center", textTransform: "uppercase" }}>
          Danh sách nhân viên
        </h1>
      </div>
      <div className="container">
        <Search search={search} handleOnchange={handleChange} />
        <AddStaff
          handleCreate={handleCreate}
          handleAddChange={handleAddChange}
          handleClose={handleClose}
          handleShow={handleShow}
          show={show}
          data={addInputEl}
        />
        <StaffTable
          staffs={currentStaffs}
          handleDelete={handleDelete}
        ></StaffTable>
        <Pagination
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPosts={staffs.length}
          handlePagination={handlePagination}
          handlePageChange={handlePageChange}
        />
        <Export csvData={filterSearch} fileName="file" />
      </div>
    </React.Fragment>
  );
}

export default App;
