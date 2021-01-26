import React from "react";
import "./Reasons.css";
import CatImage1 from "../../assets/cat-image-1.png";
import CatImage2 from "../../assets/cat-image-2.png";
import CatImage3 from "../../assets/cat-image-3.png";
import DogImage1 from "../../assets/dog-image-1.jpg";
import DogImage2 from "../../assets/dog-image-2.jpeg";
import DogImage3 from "../../assets/dog-image-3.jpeg";
import { IPet } from "../../model/IPet";

const Reasons: React.FC<IPet> = (props: IPet) => {
  return (
    <div>
      <div className="row col-md-12" id="reasonDiv">
        <p className="reasons-question">Why should you have a {props.name}?</p>
        <p className="reasons-answer">
          {props.name === "cat"
            ? `Having a cat around you can actually trigger the release of calming
               chemicals in your body which lower your stress and anxiety levels.`
            : `Having a dog around can lead to lower levels of stress for both adults and kids. 
               They’ve been found to decrease the risk of asthma in children and have been linked to lower blood pressure.`}
        </p>
        {props.name === "cat" ? (
          <>
            <img src={CatImage2} alt="Cat-2" className="secondCat" />
            <img src={CatImage3} alt="Cat-3" className="thirdCat" />
            <img src={CatImage1} alt="Cat-1" className="firstCat" />
          </>
        ) : (
          <>
            <img src={DogImage2} alt="Dog-2" className="secondDog" />
            <img src={DogImage1} alt="Dog-3" className="firstDog" />
            <img src={DogImage3} alt="Dog-1" className="thirdDog" />
          </>
        )}
      </div>
    </div>
  );
};

export default Reasons;
