const { generateToken } = require("../middleware/authMiddleware");
const User = require("../models/user");

const userSignupController = async (req, res) => {
  try {
    //assuming the request body contain the user data
    const data = req.body;

    const adminUser = await User.findOne({ role: "admin" });
    if (data.role === "admin" && adminUser) {
      return res.status(400).json({ error: "admin user already exists" });
    }

    //validate adhar care number must have exact 12xdigit
    if (!/^\d{12}$/.test(data.aadharCardNumber)) {
      return res
        .status(400)
        .json({ error: "Aadhar Card Number must be exactly 12 digits" });
    }

    //check if a user with the same adhar card number already exists
    const existingUser = await User.findOne({
      aadharCardNumber: data.aadharCardNumber,
    });
    if (existingUser) {
      return res.status(400).json({
        error: "User with the same Aadhar Card Number already exists",
      });
    }

    //create a new user
    const newUser = new User(data);

    //save the new user
    const response = await newUser.save();
    console.log("data saved");

    const payload = {
      id: response.id,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

//login route
const userLoginController = async (req, res) => {
  try {
    //extract aadharcardNumber and password for req
    const { aadharCardNumber, password } = req.body;
    //check if aadharcardNumber or password is missing
    if (!aadharCardNumber || !password) {
      return res
        .status(400)
        .json({ error: "aadhar card number and password are required" });
    }

    //find the user by aadharcardNumber
    const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

    //if user does ot exists or password does not match return error
    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(401)
        .json({ error: "invalid Aadhar card number or password" });
    }

    //generate token
    const payload = {
      id: user.id,
    };
    const token = generateToken(payload);
    res.status(200).json({
      success: true,
      message: "logedin",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

//profile Route
const userProfileController = async (req, res) => {
  try {
    const userData = req.user;
    const userId = userData.id;
    const user = await User.findOne({ _id: userId });
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

//profile password change
const userPasswordChangeController = async (req, res) => {
  try {
    //extract id from token
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    //check if current and new password are present
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "both currentPassword and newPassword are required" });
    }
    //find the user by userID
    const user = await User.findById(userId);
    //if user does not exist or password does not match
    if (!user || !(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ error: "invalid current password" });
    }

    //updtae user password
    user.password = newPassword;
    await user.save();

    console.log("password updated");
    res.status(200).json({ message: "password updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

module.exports = {
  userSignupController,
  userLoginController,
  userProfileController,
  userPasswordChangeController,
};
