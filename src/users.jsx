import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Components/Header";

export default function Users() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/users/${id}`);
      console.log(res.data);

      setData((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Header />
    <div className="p-5">
      {data.length === 0 ? (
        <p>No users found</p>
      ) : (
        data.map((u) => (
          <div
            key={u.id}
            className="flex items-center justify-between border p-3 mb-3 rounded"
          >
            <div>
              <h2 className="font-bold">{u.name}</h2>
              <p>{u.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(u.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
              <Link
                to={`/update/${u.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Update
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
    </div>
  );
}