export class AuthResponseDto {
  accessToken: string;
  user: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
  };

  constructor(partial: Partial<AuthResponseDto>) {
    Object.assign(this, partial);
  }
}
