const bcrypt = require("bcrypt");
const User = require("../utils/validationSchema");
const jwt = require("jsonwebtoken");

const handleRegistration = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ message: "Email and password required" });
  }

  try {
    // if user already exists
    const userExists = await User.findOne({ email: user }).exec();
    if (userExists) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hashing password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // Create new user
    const result = await User.create({ email: user, password: hashedPwd });

    // Create JWT token (optional)
    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with success message and token
    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    // Error handling
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleRegistration;
