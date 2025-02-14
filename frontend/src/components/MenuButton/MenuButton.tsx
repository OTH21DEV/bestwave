import React from "react";
import "./menuButton.css";
import { SetIsMenuBtnClicked,Matches } from "../../types";

type MenuButtonProps = {
  setIsMenuBtnClicked: SetIsMenuBtnClicked;
  matches: Matches;
};

const MenuButton: React.FC<MenuButtonProps> = ({ setIsMenuBtnClicked, matches }) => {
  return (
    <>
      {matches && (
        <div className="home__menu-button" onClick={() => setIsMenuBtnClicked((prevState) => !prevState)}>
          <div className="home__menu-button-line"></div>
          <div className="home__menu-button-line"></div>
          <div className="home__menu-button-line"></div>
        </div>
      )}
    </>
  );
};

export default MenuButton;
