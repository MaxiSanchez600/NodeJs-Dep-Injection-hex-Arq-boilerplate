import newAppContainer from "./infra/containers/app.container";

const port = process.env.PORT || 8000;

// Creating the appContainer to get the Router dependency
const appContainer = newAppContainer();

// Listen to the Router requests
appContainer.listen(port, () => {
  console.log("Server started on port 8000");
});
