import User, { UserType } from "../../models/user"

export const registerUser = async (userData: UserType) => {
  let user = await User.findOne({ email: userData.email });
  if (!user) {
    user = new User(userData);
    return await user.save();
  }
}