import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NewGame from "./pages/NewGame";
import Practice from "./pages/Practice";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Practice />} />
        <Route path="/new-game" element={<NewGame />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
