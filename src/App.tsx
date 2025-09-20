import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Results from "./pages/Results";

function App() {
  return (
    <div className="min-h-screen bg-black-darkest text-white-custom">
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
