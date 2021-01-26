import React, { useEffect, useState } from "react";
import { ICatBreedInfo } from "../../model/IBreedInfo";
import "./ListBreeds.css";

const ListBreeds: React.FC<{}> = () => {
  const [breeds, setBreeds] = useState<ICatBreedInfo[]>([]);
  const getBreeddUrl = "/.netlify/functions/breeds";

  useEffect(() => {
    let breedsStorage: any = sessionStorage.getItem("breeds");

    if (breedsStorage) {
      const breeds: ICatBreedInfo[] = JSON.parse(breedsStorage);

      const breedWithImages: ICatBreedInfo[] = breeds.filter(
        (breed) => breed.image !== undefined
      );

      setBreeds(breedWithImages);
    } else {
      fetch(getBreeddUrl)
        .then((response) => response.json())
        .then(({ breeds }) => {
          if (breeds) {
            const breedList: ICatBreedInfo[] = breeds;

            sessionStorage.setItem("breeds", JSON.stringify(breedList));

            const breedWithImages: ICatBreedInfo[] = breedList.filter(
              (breed) => breed.image !== undefined
            );

            setBreeds(breedWithImages);
          }
        });
    }
  }, []);

  return (
    <div>
      <p className="list-breeds-text">List of breeds</p>
      <div className="row col-md-12" id="list-breeds">
        {breeds.map((breed: ICatBreedInfo, i: number) => {
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
        })}
      </div>
    </div>
  );
};

export default ListBreeds;
