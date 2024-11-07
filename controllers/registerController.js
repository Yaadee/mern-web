const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Address = require("../models/Address");

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

  // Required fields validation
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !gender ||
    !dateOfBirth
    // !address ||
    // address.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  // Validation for email and phone
  const validatePhone = /^\d{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json({ message: "Please provide a valid email address" });
  }

  if (!validatePhone.test(phoneNumber)) {
    return res
      .status(400)
      .json({ message: "Phone number should be 10 digits long" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({
      $or: [{ email: email }, { phoneNumber: phoneNumber }],
    }).exec();
    if (userExists) {
      return res.status(409).json({
        message: "User already exists with this email address or phone number",
      });
    }

    // Hash the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // Create the new user without addresses initially
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      password: hashedPwd,
      gender,
      dateOfBirth,
      isVolunteer,
      organization,
      organizationDescription,
      createdAt,
    });

    // Save user to get the user's ID
    const savedUser = await newUser.save();

    // Save each address with the user's ID
    const savedAddresses = await Promise.all(
      address.map(async (addr) => {
        const newAddress = new Address({
          ...addr,
          user: savedUser._id, // Set the user ID in each address
        });
        return await newAddress.save();
      })
    );

    // Update the user with the address IDs
    savedUser.address = savedAddresses.map((addr) => addr._id);
    await savedUser.save();

    // Create JWT token (optional)
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Respond with success message and token
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: savedUser,
      addresses: savedAddresses,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = handleRegistration;
