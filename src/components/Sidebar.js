import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

import { useEffect, useRef } from "react";

export default function Sidebar({ links, close }) {
  const location = useLocation();

  let sideBarRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (!sideBarRef.current.contains(e.target)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="sidebar" onClick={close} ref={sideBarRef}>
      {links.map((link) => (
        <Link
          to={link.path}
          className={
            location.pathname === link.path
              ? "sidebar-link active"
              : "sidebar-link"
          }
          key={link.name}
        >
          <FontAwesomeIcon icon={link.icon} />
          {link.name}
        </Link>
      ))}
    </div>
  );
}
