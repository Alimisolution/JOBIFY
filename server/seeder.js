const user = await User.findOne(req.user._id);
if (user) {
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }
  const updateUser = await user.save();
  res.status(200).json({
    _id: updateUser._id,
    name: updateUser.name,
    email: updateUser.email,
    isAdmin: updateUser.isAdmin,
  });