import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Results from "./pages/Results";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="min-h-screen">
      {/* Main website */}
      <BrowserRouter>
        <Routes>
          <Route element={<Landing />} path="/" />
          <Route element={<Results />} path="/results" />
        </Routes>
      </BrowserRouter>

      {/* Analytics */}
      <Analytics />
    </div>
  );
}

export default App;
