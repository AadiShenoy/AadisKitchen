import { useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function CustomImage({ imgSrc, pt }) {
  const [load, setLoad] = useState(false);
  const onLoad = useCallback(() => {
    setLoad(true);
  }, []);
  return (
    <div className="custom-image" style={{ paddingTop: pt }}>
      <img
        className="img"
        src={imgSrc}
        alt=""
        onLoad={onLoad}
        style={{ display: load ? "block" : "none" }}
      />
      {!load && <CircularProgress className="img loader" />}
    </div>
  );
}
