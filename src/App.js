import * as React from 'react'
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import EditProduct from "./components/edit.component"
import CreateProduct from "./components/create.component"
import ProductList from "./components/list.component"


function App() {
  return (
    <Router>

      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link active" to={"/"}>Products List</Link>
              </li>
              
              <li className="nav-item">
                <Link className="nav-link active" to={"/product/create"}>Create</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/product/create" element={<CreateProduct />}></Route>
        <Route path="/product/edit/:id" element={<EditProduct />}></Route>

      </Routes>

    </Router>

  );
}

export default App;