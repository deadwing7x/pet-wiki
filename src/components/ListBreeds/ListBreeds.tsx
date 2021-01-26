/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { ICatBreedInfo, IDogBreedInfo } from "../../model/IBreedInfo";
import { IPet } from "../../model/IPet";
import "./ListBreeds.css";

const ListBreeds: React.FC<IPet> = (props: IPet) => {
  const [catBreeds, setCatBreeds] = useState<ICatBreedInfo[]>([]);
  const [dogBreeds, setDogBreeds] = useState<IDogBreedInfo[]>([]);
  const pet: string = props.name === "cat" ? "cat" : "dog";
  const getBreeddUrl = `/.netlify/functions/${pet}-breeds`;
  useEffect(() => {
    let breedsStorage: any = sessionStorage.getItem(`${pet}-breeds`);

    if (breedsStorage) {
      if (pet === "cat") {
        const breeds: ICatBreedInfo[] = JSON.parse(breedsStorage);

        const breedWithImages: ICatBreedInfo[] = breeds.filter(
          (breed) => breed.image !== undefined
        );

        setCatBreeds(breedWithImages);
      } else if (pet === "dog") {
        const breeds: IDogBreedInfo[] = JSON.parse(breedsStorage);

        const breedWithImages: IDogBreedInfo[] = breeds.filter(
          (breed) => breed.image !== undefined
        );

        setDogBreeds(breedWithImages);
      }
    } else {
      fetch(getBreeddUrl)
        .then((response) => response.json())
        .then(({ breeds }) => {
          if (breeds) {
            if (pet === "cat") {
              const breedList: ICatBreedInfo[] = breeds;

              sessionStorage.setItem(
                `${pet}-breeds`,
                JSON.stringify(breedList)
              );

              const breedWithImages: ICatBreedInfo[] = breedList.filter(
                (breed) => breed.image !== undefined
              );

              setCatBreeds(breedWithImages);
            } else if (pet === "dog") {
              const breedList: IDogBreedInfo[] = breeds;

              sessionStorage.setItem(
                `${pet}-breeds`,
                JSON.stringify(breedList)
              );

              const breedWithImages: IDogBreedInfo[] = breedList.filter(
                (breed) => breed.image !== undefined
              );

              setDogBreeds(breedWithImages);
            }
          }
        });
    }
  }, []);

  return (
    <div>
      <p className="list-breeds-text">List of breeds</p>
      <div className="row col-md-12" id="list-breeds">
        {pet === "cat"
          ? catBreeds.map((breed: ICatBreedInfo, i: number) => {
              return (
                <>
                  <div className="col-md-4" id="breed-image-div">
                    <img
                      src={breed.image.url}
                      alt={breed.image.id}
                      className="breed-images"
                    />
                  </div>
                  <div className="col-md-8" id="breed-info-div">
                    <p className="breed-name">
                      {breed?.name}
                      <a
                        href={breed?.wikipedia_url}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        <i className="fa fa-link" aria-hidden="true"></i>
                      </a>
                    </p>
                    <p className="breed-description">{breed?.description}</p>
                  </div>
                </>
              );
            })
          : dogBreeds.map((breed: IDogBreedInfo) => {
              return (
                <>
                  <div className="col-md-4" id="breed-image-div">
                    <img
                      src={breed.image.url}
                      alt={breed.image.id}
                      className="breed-images"
                    />
                  </div>
                  <div className="col-md-8" id="breed-info-div">
                    <p className="breed-name">{breed?.name}</p>
                  </div>
                </>
              );
            })}
      </div>
    </div>
  );
};

export default ListBreeds;
