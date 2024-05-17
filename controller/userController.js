const { generateToken } = require("../middleware/authMiddleware");



const userSignupController =async (req,res)=>{
try {
  //assuming the request body contain the user data
   const data = req.body

   const adminUser = await User.findOne({role: "admin"})
   if(data.role ==="admin" && adminUser){
    return res.status(400).json({error : "admin user already exists"})
   }

   //validate adhar care number must have exact 12xdigit
   if (!/^\d{12}$/.test(data.aadharCardNumber)) {
    return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
}

//check if a user with the same adhar card number already exists
const existingUser = await User.findOne({aadharCardNumber
  :data.aadharCardNumber})
  if(existingUser){
    return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
  }
  
  //create a new user
  const newUser = new User(data)

  //save the new user
  const response = await newUser.save()
  console.log("data saved");

  const payload = {
    id : response.id
  }
  console.log(JSON.stringify(payload));
  const token = generateToken(payload)
  res.status(200).json({response:response, token:token})

} catch (error) {
  console.log(error);
  res.status(500).json({error:"internal server error"})
}
}



//login route
const userLogin =async (req,res)=>{
try {
  //extract aadharcardNumber and password for req
  const {aadharCardNumber, password} = req.body
  //check if aadharcardNumber or password is missing
  if(!aadharCardNumber || !password){
    return res.status(400).json({error:'aadhar card number and password are required'})
  }

  //find the user by aadharcardNumber
  const user = await User.findOne({aadharCardNumber:aadharCardNumber})

  //if user does ot exists or password does not match return error
  if(!user || !(await user.comparePassword(password))){
    return res.status(401).json({error:"invalid Aadhar card number or password"})

  }

  //generate token
  const payload = {
   id : user.id
  }
  const token : generateToken(payload)
  res.json(token)


} catch (error) {
  console.log(error);
  res.status(500).json({error:"internal server error"})
}
}

