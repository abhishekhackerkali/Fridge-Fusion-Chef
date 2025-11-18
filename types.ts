
export enum DietaryPreference {
  VEG = 'Vegetarian',
  NON_VEG = 'Non-Vegetarian',
  ANY = 'Any'
}

export enum SkillLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface RecipeOptions {
  dietaryPreference: DietaryPreference;
  cookingTime: string;
  skillLevel: SkillLevel;
}
