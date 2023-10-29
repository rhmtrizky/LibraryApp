export interface IMember {
  id?: number;
  code?: string;
  name?: string;
  email?: string;
  password?: string;
  penalty?: boolean;
  penaltyEndDate?: string;
  borrows: [];
}

export interface IMemberRegister {
  name: string;
  email: string;
  password: string;
}

export interface IMemberLogin {
  email: string;
  password: string;
}
