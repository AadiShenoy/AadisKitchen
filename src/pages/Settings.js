import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDark, setLight } from "../actions/action";

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

  const light = useSelector((state) => state.category.light);
  const dark = useSelector((state) => state.category.dark);

  const handleLight = (event) => {
    if (event.target.checked) {
      dispatch(setLight(true));
      dispatch(setDark(false));
      changeTheme(0);
    } else {
      changeTheme(1);
      dispatch(setLight(false));
      dispatch(setDark(true));
    }
  };

  const handleDark = (event) => {
    if (event.target.checked) {
      dispatch(setLight(false));
      dispatch(setDark(true));
      changeTheme(1);
    } else {
      changeTheme(0);
      dispatch(setLight(true));
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
            style={{ marginLeft: "0px" }}
            className="form-label"
            control={
              <Switch checked={light} onChange={handleLight} color="warning" />
            }
            label="Light"
            labelPlacement="start"
          />
          <FormControlLabel
            className="form-label"
            control={
              <Switch checked={dark} onChange={handleDark} color="warning" />
            }
            label="Dark"
            labelPlacement="start"
          />
        </FormGroup>
        </div>
      </div>
      <div className="section d-block settings-div" >
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
