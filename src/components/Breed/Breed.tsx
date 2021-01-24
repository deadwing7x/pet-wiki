/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { IBreedInfo } from "../../model/IBreedInfo";
import "./Breed.css";

const Breed: React.FC<{}> = () => {
  const [breed, setBreed] = useState<IBreedInfo>();
  const baseUrl = "http://localhost:9000";
  const apiUrl = `${baseUrl}/catwiki/breeds`;
  const match: any = useRouteMatch("/breed/:breedName");
  let nameOfBreed = "";
  if (match) {
    nameOfBreed = match.params.breedName.split(":")[1];
  }

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then(({ data: breeds }) => {
        setBreed(
          breeds.filter((item: IBreedInfo) => item.name === nameOfBreed)[0]
        );
      });
  }, []);

  return <></>;
};

export default Breed;
