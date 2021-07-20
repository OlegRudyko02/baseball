import Fetch from './fetch';
import { ISignIn, ISignUp } from '../interfaces/interfaces';

const Api = {
  signIn: (data: ISignIn) => Fetch.post('https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in', data),
  signUp: (data: ISignUp) => Fetch.post('https://baseballcloud-back.herokuapp.com/api/v1/auth', data)  
};

export default Api;
