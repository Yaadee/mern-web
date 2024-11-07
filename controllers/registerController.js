const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Address = require("../models/address");

const handleRegistration = async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    password,
    gender,
    address,
    dateOfBirth,
    isVolunteer,
    organization,
    organizationDescription,
    createdAt,
  } = req.body;

  if (
    !firstName ||
    // !middleName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !gender ||
    // !address||
    !dateOfBirth
    // isVolunteer === undefined ||
    // !organization ||
    // !organizationDescription ||
    // !createdAt
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const validatePhone = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please provide valid email address" });
  }
  if (!validatePhone.test(phoneNumber)) {
    return res
      .status(400)
      .json({ message: "Phone number should be 10 digits long" });
  }

  if (!address || address.length === 0) {
    return res
      .status(400)
      .json({ message: "At least one address is required" });
  }
  try {
    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    }).exec();
    if (userExists) {
      return res.status(409).json({
        message: "User already exists with this email address or phone number ",
      });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);
    // Create the address document(s)
    const addressRecords = await Address.insertMany(address);

    // Extract the ObjectIds from the newly created address documents
    const addressIds = addressRecords.map((addr) => addr._id);

    // Create new user
    const result = new User({
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      password: hashedPwd,
      gender,
      address: addressIds,
      dateOfBirth,
      isVolunteer,
      organization,
      organizationDescription,
      createdAt,
    });
    await result.save();

    // Create JWT token (optional)
    const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with success message and token
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleRegistration;
