import { BrowserRouter } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

function App() {
  console.log(process.env.REACT_APP_SERVER_URL);

  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
