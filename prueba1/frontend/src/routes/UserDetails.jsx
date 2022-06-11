import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../services/UserService";

const UserDetails = () => {
  let { id } = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUserById = async (id) => {
      const response = await getUserById(id);
      console.log(response.results);
      setUser(response.results);
    };
    fetchUserById(id);
  }, []);

  return (
    <div className="container">
      <nav className="navbar bg-light mb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Usuarios
          </a>
        </div>
      </nav>
      <div className="row">
        <div className="col-lg-12">
          <Link className="btn btn-success mb-2" to={`/`}>
            Volver
          </Link>
          <div className="card">
            <div className="card-body">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Country</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Photo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {user?.name?.first} {user?.name?.last}
                    </td>
                    <td>{user.gender}</td>
                    <td>{user?.location?.country}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>
                      <img src={user?.picture?.thumbnail} alt="image" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
