import { User } from "../model/user.model";
let jwt = require('jsonwebtoken');
import config from './private-key';
  
export function generateToken(person: User) {
  let token = jwt.sign(
    { email: person.email },
    config.secret, 
    { expiresIn: '24h' }
  );
  return token;
}