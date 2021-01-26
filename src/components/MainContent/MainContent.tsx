/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Hero from "../Hero/Hero";
import InfoDiv from "../InfoDiv/InfoDiv";
import { ICatBreedInfo, IDogBreedInfo } from "../../model/IBreedInfo";
import { IInfoDivProps } from "../../model/IInfoDivProps";
import { IHeroProps } from "../../model/IHeroProps";
import { IPet } from "../../model/IPet";

const MainContent: React.FC<IPet> = (props: IPet) => {
  const [breeds, setBreeds] = useState<ICatBreedInfo[]>([]);
  const [randomCatBreeds, setRandomCatBreeds] = useState<ICatBreedInfo[]>([]);
  const [randomDogBreeds, setRandomDogBreeds] = useState<IDogBreedInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [breedNames, setBreedNames] = useState<string[]>([]);
  let infoDivProps: IInfoDivProps;
  let heroDivProps: IHeroProps;

  useEffect(() => {
    const pet: string = props.name === "cat" ? "cat" : "dog";

    const apiUrl = `/.netlify/functions/${pet}-breeds`;

    let breedsStorage = sessionStorage.getItem(`${pet}-breeds`);

    const names: string[] = [];

    if (breedsStorage) {
      if (props.name === "cat") {
        let random: ICatBreedInfo[] = [];
        const breeds: ICatBreedInfo[] = JSON.parse(breedsStorage);

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

        setRandomCatBreeds(random);
      } else if (props.name === "dog") {
        let random: IDogBreedInfo[] = [];
        const breeds: IDogBreedInfo[] = JSON.parse(breedsStorage);

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

        setRandomDogBreeds(random);
      }

      setIsLoading(false);
    } else {
      fetch(apiUrl)
        .then((response) => response.json())
        .then(({ breeds }) => {
          if (breeds) {
            setBreeds(breeds);
            sessionStorage.setItem(`${pet}-breeds`, JSON.stringify(breeds));

            if (props.name === "cat") {
              let random: ICatBreedInfo[] = [];

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

              setRandomCatBreeds(random);
            } else if (props.name === "dog") {
              let random: IDogBreedInfo[] = [];

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

              setRandomDogBreeds(random);
            }

            setIsLoading(false);
          }
        });
    }
  }, []);

  infoDivProps = {
    randomDogBreeds: randomDogBreeds,
    randomCatBreeds: randomCatBreeds,
    isLoading: isLoading,
    pet: props,
  };

  heroDivProps = {
    breedNames: breedNames,
    pet: props,
  };

  return (
    <>
      <Hero {...heroDivProps} />
      <InfoDiv {...infoDivProps} />
    </>
  );
};

export default MainContent;
