// const jwt = require('jsonwebtoken');
const login = (req, res) => {
  const { email, password } = req.body;

  if (email !== "admin@gmail.com" || password !== "admin@123") {
    return res.status(401).send({ message: "Invalid credentials" });
  } else {
    console.log("good to go");
    return res.send({message: "welcome admin"})
  }

  // const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
  // res.json({ token });
};

module.exports = { login };
