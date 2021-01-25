/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import InfoDiv from "../InfoDiv/InfoDiv";
import { IBreedInfo } from "../../model/IBreedInfo";
import { IInfoDivProps } from "../../model/IInfoDivProps";
import { IHeroProps } from "../../model/IHeroProps";

const MainContent: React.FC<{}> = () => {
  const [breeds, setBreeds] = useState<IBreedInfo[]>([]);
  const [randomBreeds, setRandomBreeds] = useState<IBreedInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [breedNames, setBreedNames] = useState<string[]>([]);
  let infoDivProps: IInfoDivProps;
  let heroDivProps: IHeroProps;

  useEffect(() => {
    const apiUrl = "/.netlify/functions/breeds";

    let breedsStorage = sessionStorage.getItem("breeds");

    const names: string[] = [];

    if (breedsStorage) {
      let random: IBreedInfo[] = [];
      const breeds: IBreedInfo[] = JSON.parse(breedsStorage);

      for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * 16);

        if (!random.includes(breeds[index])) {
          random.push(breeds[index]);
        } else {
          random.push(breeds[index + 1]);
        }
      }

      breeds.forEach((breed: any) => {
        names.push(breed.name);
      });

      setBreedNames(names);

      setRandomBreeds(random);

      setIsLoading(false);
    } else {
      fetch(apiUrl)
        .then((response) => response.json())
        .then(({ breeds }) => {
          if (breeds) {
            setBreeds(breeds);
            sessionStorage.setItem("breeds", JSON.stringify(breeds));
            let random: IBreedInfo[] = [];

            for (let i = 0; i < 4; i++) {
              let index = Math.floor(Math.random() * 16);

              if (!random.includes(breeds[index])) {
                random.push(breeds[index]);
              } else {
                random.push(breeds[index + 1]);
              }
            }

            breeds.forEach((breed: any) => {
              names.push(breed.name);
            });

            setBreedNames(names);

            setRandomBreeds(random);

            setIsLoading(false);
          }
        });
    }
  }, []);

  infoDivProps = {
    randomBreeds: randomBreeds,
    isLoading: isLoading,
  };

  heroDivProps = {
    breedNames: breedNames,
  };

  return (
    <>
      <Hero {...heroDivProps} />
      <InfoDiv {...infoDivProps} />
    </>
  );
};

export default MainContent;
