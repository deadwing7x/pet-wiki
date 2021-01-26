import React from "react";
import { Spinner } from "react-bootstrap";
import { IInfoDivProps } from "../../model/IInfoDivProps";
import "./InfoDiv.css";

const InfoDiv: React.FC<IInfoDivProps> = (props: IInfoDivProps) => {
  const pet: string = props.pet.name;
  const url: string = `/${pet}-wiki/list-breeds`;

  return (
    <div className="info-div">
      <p className="searched-breeds">Most Searched Breeds</p>
      <p className="breed-count-info">
        {props.pet.name === "cat" ? "66+" : "172+"} Breeds For You to discover
      </p>
      <div className="row">
        {props.isLoading ? (
          <div className="loading">
            Loading... <Spinner animation="border"></Spinner>
          </div>
        ) : (
          <div className="col-md-12" id="breedDiv">
            {props.pet.name === "cat"
              ? props.randomCatBreeds.map((breed) => {
                  return (
                    <img
                      key={breed.id}
                      className="breed-image col-md-4"
                      src={breed.image.url}
                      alt={breed.name}
                      title={breed.name}
                    />
                  );
                })
              : props.randomDogBreeds.map((breed) => {
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
      <a
        className="see-more"
        href={url}
        target="_blank"
        rel="noreferrer noopener"
      >
        SEE MORE <i className="fa fa-arrow-right"></i>
      </a>
    </div>
  );
};

export default InfoDiv;
