import { User } from "./user.model";

export class LoginRequestModel {
  public admin = true;

  constructor(public studentId: string, public password: string) { }
}
export interface LoginResponseModel {
  token: string;
  user: User;
}

export interface AuthErrorModel {
  reason: "admin" | "promotion";
  message: string;
}