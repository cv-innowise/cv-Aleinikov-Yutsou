export type Skill ={
  name: string;
  mastery: Mastery;
};

export enum Technology {}

export enum Mastery {
  NOVICE ,
  ADVANCED ,
  COMPETENT ,
  PROFICIENT ,
  EXPERT ,
}


export const MASTERY_LENGTH = 4;