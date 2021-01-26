import React, { CSSProperties } from "react";
import "./Hero.css";
import HeroCat from "../../assets/hero-cat.png";
import HeroDog from "../../assets/hero-dog.jpg";
import CatWikiLogo from "../../assets/catwikilogo.svg";
import DogWikiLogo from "../../assets/dogwikilogo.png";
import { IHeroProps } from "../../model/IHeroProps";
import AutoComplete from "../AutoComplete/AutoComplete";
import { IAutoCompleteProps } from "../../model/IAutoCompleteProps";

const Hero: React.FC<IHeroProps> = (props: IHeroProps) => {
  const catStyle: CSSProperties = {
    backgroundImage: `url(${HeroCat})`,
  };

  const dogStyle: CSSProperties = {
    backgroundImage: `url(${HeroDog})`,
  };

  const autoCompleteProps: IAutoCompleteProps = {
    breedNames: props.breedNames,
    pet: props.pet
  };

  return (
    <div
      className="hero-image"
      style={props.pet.name === "cat" ? catStyle : dogStyle}
    >
      <div>
        <img
          src={props.pet.name === "cat" ? CatWikiLogo : DogWikiLogo}
          alt="logo"
          className="logo-image"
        />
        <p className="know-more">Get to know more about your pet's breed</p>
        <AutoComplete {...autoCompleteProps} />
      </div>
    </div>
  );
};

export default Hero;
