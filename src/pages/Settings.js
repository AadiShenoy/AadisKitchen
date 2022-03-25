import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDark } from "../actions/action";
import { MaterialUISwitch } from "../components/Switch";

export default function Settings() {
  const dispatch = useDispatch();
  const [settings, setSettings] = useState(localStorage.getItem("settings"));
  useEffect(() => {
    const root = document.documentElement;
    for (let key in settings) {
      root.style.setProperty(key, settings[key]);
    }
  }, [settings]);

  const themes = [
    {
      "--background-color": "#fff",
      "--background-light": "#fff",
      "--shadow-color": "rgba(0,0,0,0.2)",
      "--text-color": "#0A0A0A",
      "--text-light": "#575757",
    },
    {
      "--background-color": "rgb(29, 29, 29)",
      "--background-light": "rgb(77, 77, 77)",
      "--shadow-color": "rgba(0,0,0,0.2)",
      "--text-color": "#ffffff",
      "--text-light": "#eceaea",
    },
  ];

  function changeTheme(i) {
    const _theme = { ...themes[i] };
    localStorage.setItem("theme", i === 0 ? "light" : "dark");
    let _settings = { ...settings };
    for (let key in _theme) {
      _settings[key] = _theme[key];
    }
    setSettings(_settings);
    localStorage.setItem("settings", _settings);
  }

  function changeColor(i) {
    const _color = primaryColors[i];
    let _settings = { ...settings };
    _settings["--primary-color"] = _color;
    setPrimaryColor(i);
    localStorage.setItem("primaryColor", i);
    setSettings(_settings);
    localStorage.setItem("settings", _settings);
  }

  const primaryColors = [
    "rgb(255, 0, 86)",
    "rgb(33, 150, 243)",
    "rgb(255, 193, 7)",
    "rgb(0, 200, 83)",
    "rgb(156, 39, 176)",
  ];

  const [primaryColor, setPrimaryColor] = useState(
    Number(localStorage.getItem("primaryColor"))
  );

  const dark = useSelector((state) => state.category.dark);

  const handleDark = (event) => {
    if (event.target.checked) {
      dispatch(setDark(true));
      changeTheme(1);
    } else {
      changeTheme(0);
      dispatch(setDark(false));
    }
  };

  return (
    <div className="settings-div">
      <div className="section d-block">
        <h2>Background</h2>
        <div className="options-container">
          <FormGroup aria-label="position" row>
            <FormControlLabel
              control={<MaterialUISwitch checked={dark} onChange={handleDark}/>}
              label={dark?"Dark":"Light"}
              labelPlacement="start"
              style={{marginLeft:0}}
             
            />
          </FormGroup>
        </div>
      </div>
      <div className="section d-block settings-div">
        <h2>Font color</h2>
        <div className="options-container">
          {primaryColors.map((color, index) => (
            <div
              key={index}
              className="option light"
              style={{ backgroundColor: color }}
              onClick={() => changeColor(index)}
            >
              {primaryColor === index && (
                <div className="check">
                  <FontAwesomeIcon icon={faCheck} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
