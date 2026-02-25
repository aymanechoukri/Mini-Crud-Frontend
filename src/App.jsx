import { BrowserRouter, Route, Routes } from "react-router-dom";
import Users from "./users";
import AddUsers from "./AddUsers";
import UpdateUsers from "./UpdateUsers";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/addusers" element={<AddUsers />} />
          <Route path="/update/:id" element={<UpdateUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
