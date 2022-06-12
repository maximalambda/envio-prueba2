import { useEffect, useState } from "react";
import { getAll, filter, deleteUser } from "./services/UserService";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

import { Link } from "react-router-dom";
import "./App.css";
function App() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [nationality, setNationality] = useState("");
  const [listNationality, setListNationality] = useState([]);
  const [age, setAge] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [toDelete, setToDelete] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      const data = await getAll();
      setUsers(data.results);
      const countries = data.results.map((item) => {
        return item.location.country;
      });
      const uniqueCountries = [...new Set(countries)];
      setListNationality(uniqueCountries);
    };
    fetchAll();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    let json = {
      name: name ? name : "",
      male: male ? male : "",
      female: female ? female : "",
      nationality: nationality === "default" ? "" : nationality,
      age: age ? age : "",
    };
    const response = await filter(json);
    console.log(response);
    setUsers(response.results);
  };
  const handleMaleClick = () => {
    if (male) {
      setMale(false);
    } else {
      setMale(true);
      setFemale(false);
    }
  };
  const handleFemaleClick = () => {
    if (female) {
      setFemale(false);
    } else {
      setFemale(true);
      setMale(false);
    }
  };
  const onItemCheck = (e, selectedItem) => {
    console.dir(e.target.checked);
    var res;
    if (e.target.checked === false) {
      const newSelecteItems = selectedItems.filter((item) => {
        return item.login.uuid !== selectedItem.login.uuid;
      });
      setSelectedItems(newSelecteItems);
    }
    if (e.target.checked === true) {
      res = selectedItems.concat(selectedItem);
      console.log(res);
      setSelectedItems(res);
    }

    const exportIDs = res.map((item)=>{
      return item.login.uuid;
    })
    setSelectedIds(exportIDs);
  };

  const handleProcess = () => {
    setModal(!modal);

    setTimeout(() => {
      const obj = {'ids': selectedIds};
      const params = new URLSearchParams(obj).toString();
      var uri = `http://127.0.0.1:8000/api/csv/export?${params}`;
      var link = document.createElement("a");
      if (typeof link.download === "string") {
        link.href = uri;
        link.setAttribute("download", true);

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);
      } else {
        window.open(uri);
      }
      setModal(false);
    }, "1000");
  };
  const toggle = () => setModal(!modal);
  const toggle2 = () => setModalDelete(!modalDelete);
  const handleDeleteUser = async (id) => {
    setToDelete(id)
    setModalDelete(!modalDelete);

  };
  const handleDeleteUserConfirmation = async () =>{
    const response = await deleteUser(toDelete);
    setUsers(response.results);
    setModalDelete(!modalDelete);
  }
  return (
    <div className="App">
      <nav className="navbar bg-light mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Usuarios
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <div className="col-lg-12 mb-2">
                <button
                  onClick={() => setOpen(!open)}
                  className="btn btn-primary btn-lg"
                >
                  Filtros
                </button>
              </div>

              {open && (
                <div className="filters--togglable  col-lg-12 mb-2">
                  <div className="card">
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <p className="text-center">Filtros</p>
                        <div className="form-group">
                          <label htmlFor="nombre">Nombre</label>
                          <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Introduce un nombre"
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            value={name}
                          />
                        </div>
                        <div className="row my-2">
                          <div className="col">
                            <button
                              type="button"
                              className={`form-control btn btn-primary ${
                                male ? "active" : ""
                              }`}
                              onClick={handleMaleClick}
                            >
                              Hombre
                            </button>
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              className={`form-control btn btn-success ${
                                female ? "active" : ""
                              }`}
                              onClick={handleFemaleClick}
                            >
                              Mujer
                            </button>
                          </div>
                        </div>
                        <select
                          className="form-select"
                          defaultValue={"default"}
                          onChange={(e) => setNationality(e.target.value)}
                        >
                          <option value={"default"}>Nacionalidades</option>
                          {listNationality &&
                            listNationality.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                        </select>
                        <div className="form-group">
                          <label htmlFor="correo">Edad</label>
                          <input
                            type="text"
                            className="form-control"
                            id="edad"
                            placeholder="Introduce un edad"
                            onChange={(e) => {
                              setAge(e.target.value);
                            }}
                            value={age}
                          />
                        </div>
                        <button className="btn btn-lg btn-success my-2">
                          Filtrar
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {selectedItems.length > 0 && (
                  <button className="btn btn-warning" onClick={handleProcess}>
                    Descarga CSV
                  </button>
                )}

                <Modal isOpen={modal} toggle={toggle}>
                  <ModalHeader toggle={function noRefCheck() {}}>
                    Procesando
                  </ModalHeader>
                  <ModalBody>
                    <Spinner>Loading...</Spinner>
                  </ModalBody>
                </Modal>
                <Modal isOpen={modalDelete} toggle={toggle2}>
                  <ModalHeader toggle={function noRefCheck() {}}>
                    Estas seguro que quieres borrar este registro?
                  </ModalHeader>
                  <ModalBody>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="primary"
                      onClick={() => setModalDelete(!modalDelete)}
                    >
                      Cancelar
                    </Button>{" "}
                    <Button color="danger" onClick={handleDeleteUserConfirmation}>Borrar</Button>
                  </ModalFooter>
                </Modal>
                {/* {selectedItems.length > 0 && (
                  <CSVLink className="btn btn-danger" data={csv}>
                    Convertir a CSV
                  </CSVLink>
                )} */}
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th></th>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.map((item, index) => (
                          <tr key={item.login.uuid} className="table--row">
                            <th scope="row">
                              <input
                                type="checkbox"
                                className="form-check-input"
                                id="rowcheck{user.id}"
                                onChange={(e) => onItemCheck(e, item)}
                              />
                            </th>
                            <td>{index + 1}</td>
                            <td>
                              {item.name.first} {item.name.last}
                            </td>
                            <td>{item.email}</td>
                            <td>
                              <button
                                onClick={() =>
                                  handleDeleteUser(item.login.uuid)
                                }
                                className="btn btn-danger me-2 ms-2  my-2 deleteButton"
                              >
                                Borrar
                              </button>
                              <Link
                                className="btn btn-success"
                                to={`users/${item.login.uuid}`}
                              >
                                Ver Usuario
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
