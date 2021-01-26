/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { ICatBreedInfo } from "../../model/IBreedInfo";
import { IImage } from "../../model/IImage";
import "./Breed.css";

const Breed: React.FC<{}> = () => {
  const [breed, setBreed] = useState<ICatBreedInfo>();
  const [images, setImages] = useState<IImage[]>();
  const getBreeddUrl = "/.netlify/functions/breeds";
  const getImagesUrl = "/.netlify/functions/get-images";
  const match: any = useRouteMatch("/breed/:breedName");
  let nameOfBreed = "";
  if (match) {
    nameOfBreed = match.params.breedName.split(":")[1];
  }

  const getRandomImages = (id: string) => {
    fetch(
      `${getImagesUrl}?` +
        new URLSearchParams({
          size: "full",
          page: "0",
          breed_id: `${id}`,
        })
    )
      .then((response) => response.json())
      .then(({ images }) => {
        if (images) {
          setImages(images);
        }
      });
  };

  useEffect(() => {
    const breedsStorage: any = sessionStorage.getItem("breeds");

    if (breedsStorage) {
      const breeds: ICatBreedInfo[] = JSON.parse(breedsStorage);

      const searchedBreed: ICatBreedInfo = breeds.filter(
        (breed) => breed.name === nameOfBreed
      )[0];

      setBreed(searchedBreed);
    } else {
      fetch(getBreeddUrl)
        .then((response) => response.json())
        .then(({ breeds }) => {
          if (breeds) {
            const breedList: ICatBreedInfo[] = breeds;

            sessionStorage.setItem("breeds", JSON.stringify(breedList));

            const searchedBreed: ICatBreedInfo = breedList.filter(
              (breed) => breed.name === nameOfBreed
            )[0];

            setBreed(searchedBreed);

            getRandomImages(searchedBreed.id);
          }
        });
    }
  }, []);

  return (
    <>
      <div className="row col-md-12" id="breedDiv">
        <div className="col-md-4" id="breedPicDiv">
          <img
            src={breed?.image.url}
            alt={breed?.name}
            className="breedImage"
          />
        </div>
        <div className="col-md-8" id="breedInfoDiv">
          <p className="breed-name">
            {breed?.name}{" "}
            <a
              href={breed?.wikipedia_url}
              rel="noreferrer noopener"
              target="_blank"
            >
              <i className="fa fa-link" aria-hidden="true"></i>
            </a>
          </p>

          <p className="breed-description">{breed?.description}</p>
          <p className="breed-data">
            <b>Temperament:</b> {breed?.temperament}
          </p>
          <p className="breed-data">
            <b>Origin:</b> {breed?.origin}
          </p>
          <p className="breed-data">
            <b>Life Span:</b> {breed?.life_span}
          </p>
          <p className="breed-data">
            <b>Adaptability:</b> {breed?.adaptability}
          </p>
          <p className="breed-data">
            <b>Affection Level:</b> {breed?.affection_level}
          </p>
          <p className="breed-data">
            <b>Child Friendly:</b> {breed?.child_friendly}
          </p>
          <p className="breed-data">
            <b>Grooming:</b> {breed?.grooming}
          </p>
          <p className="breed-data">
            <b>Intelligence:</b> {breed?.intelligence}
          </p>
          <p className="breed-data">
            <b>Health Issues:</b> {breed?.health_issues}
          </p>
          <p className="breed-data">
            <b>Social Needs:</b> {breed?.social_needs}
          </p>
          <p className="breed-data">
            <b>Stranger Friendly:</b> {breed?.stranger_friendly}
          </p>
          <p className="breed-data">
            <b>Dog Friendly:</b> {breed?.dog_friendly}
          </p>
        </div>
      </div>
      <div className="jumbotron">
        <p className="other-images-text">Other Photos</p>
        <div className="row col-md-12" id="other-images">
          {images?.map((image) => {
            return (
              <div className="col-md-3" key={image.id}>
                <img className="other-photos" src={image.url} alt={image.id} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Breed;
