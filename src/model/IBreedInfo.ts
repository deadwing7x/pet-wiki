import { IImage } from "./IImage";

export interface IBreedInfo {
  id: string;
  name: string;
  description: string;
  temperament: string;
  life_span: string;
  origin: string;
  image: IImage;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  grooming: number;
  intelligence: number;
  health_issues: number;
  social_needs: number;
  stranger_friendly: number;
  wikipedia_url: string;
  dog_friendly: string;
}