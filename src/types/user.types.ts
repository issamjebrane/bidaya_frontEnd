export type User = {
    id?:number;
    email:string;
    firstName?:string;
    lastName?:string;
    password:string;
}

export interface Token {
  token:string;
}

export interface Step {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  isStepCompleted: boolean;
  isStepActive: boolean;
}
