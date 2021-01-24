import React from "react";
import { Spinner } from "react-bootstrap";
import { IInfoDivProps } from "../../model/IInfoDivProps";
import "./InfoDiv.css";

const InfoDiv: React.FC<IInfoDivProps> = (props: IInfoDivProps) => {
  return (
    <div className="info-div">
      <p className="searched-breeds">Most Searched Breeds</p>
      <p className="breed-count-info">66+ Breeds For You to discover</p>
      <div className="row">
        {props.isLoading ? (
          <div className="loading">
            Loading... <Spinner animation="border"></Spinner>
          </div>
        ) : (
          <div className="col-md-12" id="breedDiv">
            {props.randomBreeds.map((breed) => {
              return (
                <img
                  key={breed.id}
                  className="breed-image col-md-4"
                  src={breed.image.url}
                  alt={breed.name}
                  title={breed.name}
                />
              );
            })}
          </div>
        )}
      </div>
      <div className="see-more">
        SEE MORE <i className="fa fa-arrow-right"></i>
      </div>
    </div>
  );
};

export default InfoDiv;