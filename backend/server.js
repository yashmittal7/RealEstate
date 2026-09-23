const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");
//const User = require("./models/User");
const propertyRoutes = require("./routes/propertyRoutes");
const aiRoutes = require("./routes/aiRoutes");
connectDB();

const app = express();

app.use(
  cors({
    origin: "https://estate-hu.netlify.app",
  })
);
app.use(express.json());

app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.send("Real Estate API Running");
});
app.use("/api/properties", propertyRoutes);
app.use("/api/ai", aiRoutes);

/*app.get("/test-user", async (req, res) => {
  const user = await User.create({
    name: "Test User",
    email: "test@gmail.com",
    password: "123456",
  });

  res.json(user);
});
*/

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});