import { useState, useCallback, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Aos from "aos";
import "aos/dist/aos.css";

export default function ChiefCard({ chief }) {
  const [load, setLoad] = useState(false);
  const onLoad = useCallback(() => {
    setLoad(true);
  }, []);

  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  return (
    <div className="chief-card" data-aos="zoom-in">
      <img
        src={chief.img}
        className="img"
        alt=""
        onLoad={onLoad}
        style={{ display: load ? "block" : "none" }}
      />
      {!load && (
        <div className="img">
          <CircularProgress className="loader" />
        </div>
      )}
      <div className="chief-card-info">
        <h3 className="chief-card-name">{chief.name}</h3>
        <p className="chief-recipe-count">
          Channel: <b>{chief.channel}</b>
        </p>
        <p className="cheif-icons">
          <a href={chief.yt} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faYoutube} style={{ color: "red" }} />
          </a>
          <a href={chief.insta} target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faInstagram} style={{ color: "purple" }} />
          </a>
        </p>
      </div>
    </div>
  );
}
