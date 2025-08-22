## Routing

$$
app.get("/user", async (req, res) => {
 const userEmail = req.body.emailId;

  try {
   console.log(userEmail);

    const user = await User.findOne({ emailId: userEmail });
   // if (user.length === 0) {
   //   res.status(400).send("User not exist");
   // } else {
   //   res.send(user);
   // }
   res.send(user);
 } catch (err) {
   res.send("something went wrong!");
 }
});


$$  app.delete("/user", async (req, res) => {
 const userId = req.body.userId;

  try {
   console.log(userId);
   const deleteById = await User.findByIdAndDelete(userId);

    res.send("User Data deleted successfully");
 } catch (error) {
   res.send("Something went wrong");
 }
});

// Updating the Document
app.patch("/user/:userId", async (req, res) => {
 const userId = req.params.userId;
 const data = req.body;

  try {
   const ALLOWED = ["displayPic", "about", "age", "skills"];

    const isAllowed = Object.keys(data).every((k) => ALLOWED.includes(k));
   if (!isAllowed) {
     throw new Error("Not Allowed to update");
   }
   if (data?.skills.length > 10) {
     throw new Error("Skills cannot be more than 10");
   }

    const user = await User.findByIdAndUpdate(userId, data);

    res.send("Updated Successfully");
 } catch (error) {
   res.status(400).send("Something went wrong " + error.message);
 }
});
$$
