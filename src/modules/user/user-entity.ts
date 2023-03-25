import { Entity } from '@/core/entity';

interface UserData {
  login: string;
  password: string;
}

export class User extends Entity<UserData> {
  constructor(data: UserData) {
    super(data);
  }

  get login(): string {
    return this.data.login;
  }

  get password(): string {
    return this.data.password;
  }
}
