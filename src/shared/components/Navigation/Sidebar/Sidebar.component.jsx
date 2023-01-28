import React from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./Sidebar.styles.css";

// Sidebar Component
// receives props
// uses CSSTransition library for sidebar
// returns a portal hooked into public index.html that houses sidebar content
const Sidebar = ({ show, onClick, children }) => {
  const content = (
    <CSSTransition
      in={show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="sidebar" onClick={onClick}>
        {children}
      </aside>
    </CSSTransition>
  );

  return createPortal(content, document.getElementById("sidebar-hook"));
};

export default Sidebar;
