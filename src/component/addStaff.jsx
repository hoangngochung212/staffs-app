import React from "react";
import { Button, Modal } from "react-bootstrap";
export default function AddStaff({
  handleCreate,
  handleAddChange,
  handleClose,
  handleShow,
  show,
  data,
}) {
  return (
    <div className="a" style={{ marginBottom: "12px", height: "38px" }}>
      <Button variant="success" onClick={handleShow} style={{ float: "right" }}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form action="#">
          <Modal.Header closeButton style={{ textAlign: "center" }}>
            <Modal.Title>Thêm nhân viên</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="name">Tên nhân viên</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={data.name}
                required
                onChange={(e) => handleAddChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={data.email}
                required
                onChange={(e) => handleAddChange(e)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="text"
                id="phone"
                name="phone"
                data={data.phone}
                className="form-control"
                required
                onChange={(e) => handleAddChange(e)}
                onInput={
                  (data.phone = data.phone
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1"))
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">Tuổi</label>
              <input
                type="text"
                id="age"
                name="age"
                value={data.age}
                className="form-control"
                required
                onChange={(e) => handleAddChange(e)}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={(e) => handleCreate(e)}>
              Save
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}
