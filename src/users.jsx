import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [ data, setData ] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((res) => setData(res.data))
      .catch((error) => console.error(error));
  }, [setData]);

  return (
    <div>
      {data.map((u) => (
        <div key={u.id}>
          <h1>{u.name}</h1>
          <p>{u.email}</p>
        </div>
      ))}
    </div>
  );
}
