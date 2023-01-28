import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Backdrop from "../../UIElements/Backdrop/Backdrop.component";
import MainHeader from "../MainHeader/MainHeader.component";
import NavLinks from "../NavLinks/NavLinks.component";
import Sidebar from "../Sidebar/Sidebar.component";

import "./MainNav.styles.css";

// MainNav Component
// handles sidebarIsOpen state
// renders SideBar, Backdrop, MainHeader and NavLinks Components based on screen width
const MainNav = () => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const openSidebarHandler = () => {
    setSidebarIsOpen(true);
  };

  const closeSidebarHandler = () => {
    setSidebarIsOpen(false);
  };

  return (
    <Fragment>
      {sidebarIsOpen && <Backdrop onClick={closeSidebarHandler} />}

      <Sidebar show={sidebarIsOpen} onClick={closeSidebarHandler}>
        <nav className="main-nav__sidebar-nav">
          <NavLinks />
        </nav>
      </Sidebar>

      <MainHeader>
        <button className="main-nav__menu-btn" onClick={openSidebarHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-nav__title">
          <Link to="/">Share Space</Link>
        </h1>
        <nav className="main-nav__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </Fragment>
  );
};

export default MainNav;
