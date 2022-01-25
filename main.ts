import newAppContainer from "./infra/containers/app.container";

// Creating the appContainer to get the Router dependency
const appContainer = newAppContainer();

// Listen to the Router requests
appContainer.listen(8000, () => {
  console.log("Server started on port 8000");
});
