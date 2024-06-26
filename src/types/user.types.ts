export type User = {
    id?:number;
    email?:string;
    firstName?:string;
    lastName?:string;
    password?:string;
    role?:string;
}

export interface AuthenticationResponse {
  token:string;
  user:User;
}

export interface Step {
  stepNumber: number;
  stepTitle: string;
  stepDescription: string;
  isStepCompleted: boolean;
  isStepActive: boolean;
}
