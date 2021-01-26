import { ICatBreedInfo, IDogBreedInfo } from "./IBreedInfo";
import { IPet } from "./IPet";

export interface IInfoDivProps {
  randomDogBreeds: IDogBreedInfo[];
  randomCatBreeds: ICatBreedInfo[];
  isLoading: boolean;
  pet: IPet;
}
