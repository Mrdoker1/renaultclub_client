import { BrowserRouter, HashRouter } from "react-router-dom";

const selectRouter = () => {
  if (process.env.NODE_ENV === "production") {
    return HashRouter;
  }
  return BrowserRouter;
};

export default selectRouter;
