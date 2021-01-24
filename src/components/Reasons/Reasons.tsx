import React from "react";
import "./Reasons.css";
import Image1 from "../../assets/image-1.png";
import Image2 from "../../assets/image-2.png";
import Image3 from "../../assets/image-3.png";

const Reasons: React.FC<{}> = () => {
  return (
    <div>
      <div className="col-md-12" id="reasonDiv">
        <div className="row">
          <p className="reasons-question">Why should you have a cat?</p>
          <p className="reasons-answer">
            Having a cat around you can actually trigger the release of calming
            chemicals in your body which lower your stress and anxiety levels.
          </p>
          <img src={Image2} alt="Cat-2" className="secondCat" />
          <img src={Image3} alt="Cat-3" className="thirdCat" />
          <img src={Image1} alt="Cat-1" className="firstCat" />
        </div>
      </div>
    </div>
  );
};

export default Reasons;
