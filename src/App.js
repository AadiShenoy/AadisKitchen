import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import ScrollToTop from "./components/ScrollToTop";
import RecipeDetail from "./pages/RecipeDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setRecipe } from "../src/actions/action";

function App() {
  const dispatch = useDispatch();
  const fetchitem = async () => {
    const ms = Date.now();
    const data = await fetch(
      "https://aadishenoy.github.io/Food-JSON/dataFile.json?dummy=" + ms
    );
    const jdata = await data.json();
    dispatch(setRecipe(jdata));
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
    localStorage.setItem("primaryColor", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/detail" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
