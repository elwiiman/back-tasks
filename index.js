const express = require("express");
const connectDB = require("./config/db");
const http = require("http");

//creating the server
const app = express();

//connect to database
connectDB();

//Enable express.json
app.use(express.json({ extended: true }));

//app port
const PORT = process.env.PORT;

//import routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/tasks", require("./routes/tasks"));

//define main page
app.get("/", (req, res) => {
  res.send("Hello World");
});

// CREATE SERVER
let server = http.createServer(app);

//HANDLE ERRORS
server.on("error", (error) => {
  if (error.syscall !== "listen") {
    console.log(error);
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(`Port ${process.env.PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`Port ${process.env.PORT} is already in use`);
      process.exit(1);
      // process.kill(process.pid);
      break;
    default:
      throw error;
  }
});

//run the app //
server.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT}`);
});
