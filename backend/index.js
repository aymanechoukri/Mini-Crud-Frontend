import express from "express";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors())
app.use(express.json());

//METHODE GET
app.get("/users", (req, res) => {
  const user = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));
  res.json(user);
});

//METHODE POST
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Name and email are required" });
  }

  if (typeof name !== "string" || typeof email !== "string") {
    return res.status(400).json({ message: "Invalid data type" });
  }

  if (email.includes("@") === false) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

  const newID = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUSers = {
    id: newID,
    name,
    email,
  };

  users.push(newUSers);

  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));

  res.status(201).json(newUSers);
});

//METHODE DELETE
app.delete("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

  const updatedUsers = users.filter((u) => u.id !== id);

  if (users.length === updatedUsers.length) {
    return res.status(404).json({ message: `User with id ${id} not found` });
  }

  fs.writeFileSync("./data/users.json", JSON.stringify(updatedUsers, null, 2));

  res
    .status(200)
    .json({ message: `User with id ${id} deleted`, users: updatedUsers });
});

//METHODE PUT
app.put("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  const users = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (name && typeof name !== "string") {
    return res.status(400).json({ message: "Invalid name type" });
  }

  if (email && typeof email !== "string") {
    return res.status(400).json({ message: "Invalid email type" });
  }

  if (email && !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }
  if (name) user.name = name;
  if (email) user.email = email;

  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));

  res.status(200).json({ message: "User updated", user });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
