import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Components/Header";

export default function AddUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email) return;

    try {
      const res = await axios.post("http://localhost:5000/users", {
        name,
        email,
      });
      console.log(res.data);

      navigate("/");
    } catch (err) {
      console.error(err);
    }

    setName("");
    setEmail("");
  };

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
          Create
        </button>
      </form>
    </div>
    </div>
  );
}