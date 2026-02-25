import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Components/Header";

export default function UpdateUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return;

    try {
      const res = await axios.put(`http://localhost:5000/users/${id}`, {
        name,
        email,
      });
      console.log(res.data);
      setName("");
      setEmail("");
      navigate("/", { state: { newUser: res.data } });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        if (res.data) {
          setName(res.data.name);
          setEmail(res.data.email);
        }
        console.log(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div>
        <Header />
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-black/80 flex justify-center flex-col p-10 gap-3 w-1/2 rounded-2xl"
      >
        <label>Full Name:</label>
        <input
          type="text"
          className="border-white border-2 rounded-lg px-5 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          className="border-white border-2 rounded-lg px-5 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="bg-white/80 p-2 rounded-2xl">
          Update
        </button>
      </form>
    </div>
    </div>
  );
}