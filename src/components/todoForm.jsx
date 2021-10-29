import React from "react";

const TodoForm = ({ clock, onSubmit, input, onInput }) => {
  return (
    <div className="col-md-12 d-flex justify-content-center">
      <div style={{ width: 800 }} className="card">
        <div className="row">
          <div className="col-md-4">
            <img
              className="img-fluid rounded-start h-100"
              src={clock}
              alt="image"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <div className="cart-title">
                <h3 className="text-uppercase text-secondary mb-4">
                  React Todo App
                </h3>
              </div>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Todo"
                    name="text"
                    value={input}
                    onChange={(e) => onInput(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-secondary mt-3 w-100">
                  Add Todo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
