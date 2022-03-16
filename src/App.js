import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import ScrollToTop from "./components/ScrollToTop";
import RecipeDetail from "./pages/RecipeDetail";
import { useEffect, useState } from "react";

function App() {
  const [recipe, setRecipe] = useState([]);

  const fetchitem = async () => {
    const data = await fetch(
      "https://aadishenoy.github.io/Food-JSON/dataFile.json"
    );
    const jdata = await data.json();
    setRecipe(jdata);
  };
  useEffect(() => {
    fetchitem();
    localStorage.setItem(
      "settings",
      JSON.stringify({
        "--background-color": "#fff",
        "--background-light": "#fff",
        "--primary-color": "rgb(255, 0, 86)",
        "--shadow-color": "rgba(0,0,0,0.2)",
        "--text-color": "#0A0A0A",
        "--text-light": "#575757",
        "--font-size": "16px",
        "--animation-speed": 1,
      })
    );
    localStorage.setItem("theme", "light");
    localStorage.setItem("primaryColor", 0);
    localStorage.setItem("fontSize", 1);
    localStorage.setItem("animationSpeed", 1);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes recipe={recipe} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/detail" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
