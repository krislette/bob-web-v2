import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Results from "./pages/Results";

function App() {
  return (
    <div className="bg-color-white">
      <BrowserRouter>
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Results />} path="/results" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
