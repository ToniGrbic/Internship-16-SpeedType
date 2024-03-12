import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import Practice from "./pages/Practice";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Home />} />
        <Route path="/new-game" element={<NewGame />} />
        <Route path="/practice" element={<Practice />} />
      </Route>
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
