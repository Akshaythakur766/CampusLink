import bcrypt from "bcryptjs";

// Hash Password
 const hashPassword = async (password:string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare Passwords
 const comparePassword = async (password:string, hashedPassword:string) => {
  return await bcrypt.compare(password, hashedPassword);
};

// // Hashing before saving user
// const hashedPassword = await hashPassword(req.body.password);

// // Comparing passwords during login
// const isMatch = await comparePassword(req.body.password, user.password);

export {hashPassword , comparePassword}