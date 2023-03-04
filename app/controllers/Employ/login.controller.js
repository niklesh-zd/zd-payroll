const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const login = (req, res) => {
  const secretKey = crypto.randomBytes(64).toString('hex');
  const { email, password } = req.body;

  if (email !== "admin@gmail.com" || password !== "admin@123") {
    return res.status(401).send({ message: "Invalid credentials" });
  } else {
    console.log("good to go");
    // return res.send({message: "welcome admin"})
    const token = jwt.sign({ email }, secretKey, { expiresIn: '7d' });
    res.send({ token });
  }

};

module.exports = { login };
