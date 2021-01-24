export interface IBreedInfo {
  id: string;
  name: string;
  temparament: string;
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
}

export interface IImage {
  height: number;
  width: number;
  url: string;
  id: string;
}
