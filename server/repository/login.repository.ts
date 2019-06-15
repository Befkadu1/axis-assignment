import { User } from "../model/user.model";
import { UserRepository } from "./user.repository";

export class LoginRepository {
  constructor(private userRepository = new UserRepository()) {}

  async login(values: User): Promise<Partial<User>> {
    // db.run(`INSERT INTO users (id, email, password, token) VALUES (?, ?, ?, ?)`, ['a8696ebf-2bff-47e2-b277-6b73ee1211b4', 'jane.doe@axis.com', 'test', '']);
    const email = values.email;
    const password = values.password;
    const getPerson = await this.userRepository.getByEmailAndPassword(email, password);
    const person = await this.userRepository.updateToken(getPerson); // updating the token when the user logs in
  return person;
  }
}