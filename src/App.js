import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Settings from "./pages/Settings";
import RecipeDetail from "./pages/RecipeDetail";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRecipe, setCount } from "../src/actions/action";
import { db, remoteConfig } from "./firebase-config";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { fetchAndActivate, getValue } from "firebase/remote-config";

function App() {
  const dispatch = useDispatch();
  const recipeCollectionRef = collection(db, "recipe");
  const countCollectionRef = collection(db, "totalCount");
  const [adminAuthCred, setAdminAuthCred] = useState({});

  const fetchitem = async () => {
    const data = await getDocs(
      query(recipeCollectionRef, orderBy("sortId", "desc"))
    );
    dispatch(
      setRecipe(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };
  
  const fetchCount = async () => {
    const countData = await getDocs(countCollectionRef);
    dispatch(setCount(countData.docs.map((doc) => ({ ...doc.data() }))[0].count));
  };

  const handleFetch = async () => {
    await fetchAndActivate(remoteConfig).then(() => {
      setAdminAuthCred(JSON.parse(getValue(remoteConfig, "admin_cred")._value));
    });
  };

  useEffect(() => {
    fetchitem();
    fetchCount();
    handleFetch();
    localStorage.setItem(
      "settings",
      JSON.stringify({
        "--background-color": "#fff",
        "--background-light": "#fff",
        "--primary-color": "rgb(255, 0, 86)",
        "--shadow-color": "rgba(0,0,0,0.2)",
        "--text-color": "#0A0A0A",
        "--text-light": "#575757",
      })
    );
    localStorage.setItem("primaryColor", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      {/* <ScrollToTop /> */}
      <Navbar />
      <div className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route
            path="/settings"
            element={<Settings adminAuthCred={adminAuthCred} />}
          />
          <Route path="/detail" element={<RecipeDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
