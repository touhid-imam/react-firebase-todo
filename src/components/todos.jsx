import React from "react";

const Todos = ({
  todos,
  onEditForm,
  onEditChange,
  onClose,
  editForm,
  onEditClick,
  onDelete,
  loading,
}) => {
  if (loading) {
    return (
      <div className="col-md-12 mt-5">
        <div className="list-wrapper d-flex justify-content-center">
          <div
            className="spinner-grow text-secondary"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="col-md-12 mt-4">
      <div className="list-wrapper d-flex justify-content-center">
        <ul style={{ width: 800 }} className="list-group">
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className="list-group-item d-flex justify-content-between"
              >
                {editForm.id === todo.id && (
                  <form className="d-flex" onSubmit={onEditForm}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        name={todo.id}
                        value={editForm.text}
                        onChange={onEditChange}
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-secondary btn-sm rounded-0"
                    >
                      Save
                    </button>
                  </form>
                )}
                {!(editForm.id === todo.id) && (
                  <div
                    className={
                      todo.close
                        ? "text-wrap text-decoration-line-through"
                        : "text-wrap"
                    }
                  >
                    {todo.text}
                  </div>
                )}
                <div className="button-group">
                  <label
                    className="btn btn-primary btn-sm me-2"
                    htmlFor="complete"
                  >
                    <input
                      type="checkbox"
                      id="complete"
                      value={todo.close}
                      onChange={() => onClose(todo)}
                    />
                  </label>
                  <button
                    onClick={() => onEditClick(todo)}
                    className="btn btn-secondary btn-sm me-2"
                  >
                    <i className="fa fa-edit"></i>
                  </button>
                  <button
                    onClick={() => onDelete(todo)}
                    className="btn btn-danger btn-sm"
                  >
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
