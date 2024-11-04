import { User as UserInterface } from '../interfaces/User'; // Adjust the import based on your project structure

export class User implements UserInterface {
  _id: string;
  name: string;
  email: string;
  balance: number;
  walletAddress: string;
  password: string;

  constructor(
    _id: string,
    name: string,
    email: string,
    balance: number,
    walletAddress: string,
    password: string
  ) {
    this._id = _id;
    this.name = name;
    this.email = email;
    this.balance = balance;
    this.walletAddress = walletAddress;
    this.password = password;
  }
}
