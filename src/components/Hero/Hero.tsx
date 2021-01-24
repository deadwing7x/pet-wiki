import React, { CSSProperties } from "react";
import "./Hero.css";
import HeroCat from "../../assets/hero-cat.png";
import { IPet } from "../../model/IPet";
import CatWikiLogo from "../../assets/catwikilogo.svg";
import { IHeroProps } from "../../model/IHeroProps";
import AutoComplete from "../AutoComplete/AutoComplete";
import { IAutoCompleteProps } from "../../model/IAutoCompleteProps";

const Hero: React.FC<IHeroProps> = (props: IHeroProps) => {
  const pet: IPet = {
    name: "cat",
  };

  const catStyle: CSSProperties = {
    backgroundImage: `url(${HeroCat})`,
  };

  const dogStyle: CSSProperties = {
    backgroundImage: `url(${HeroCat})`,
    width: 400,
    height: 400,
  };

  const autoCompleteProps: IAutoCompleteProps = {
    breedNames: props.breedNames,
  };

  return (
    <div
      className="hero-image"
      style={pet.name === "cat" ? catStyle : dogStyle}
    >
      <div>
        <img src={CatWikiLogo} alt="logo" className="logo-image" />
        <p className="know-more">Get to know more about your cat breed</p>
        <AutoComplete {...autoCompleteProps} />
      </div>
    </div>
  );
};

export default Hero;
