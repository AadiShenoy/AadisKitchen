import { useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";
export default function CustomImage({ imgSrc, pt }) {
  const [load, setLoad] = useState(false);
  const onLoad = useCallback(() => {
    setLoad(true);
  }, []);
  return (
    <motion.div className="custom-image" style={{ paddingTop: pt }}
    initial={{scale:1}}
    whileHover={{scale:1.1}}
    transition={{duration:0.5}}
    >
      <motion.img
        className="img"
        src={imgSrc}
        alt=""
        onLoad={onLoad}
        style={{ display: load ? "block" : "none" }}
      />
      {!load && <CircularProgress className="img loader" />}
    </motion.div>
  );
}
