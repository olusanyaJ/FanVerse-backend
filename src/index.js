const app = require("./app");
const { PORT } = process.env;

const startApp = () => {
  app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
};

startApp();
