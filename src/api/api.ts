import Fetch from './fetch';
import { ISignIn, ISignUp, IRecovery } from '../interfaces/interfaces';

const Api = {
  signIn: (data: ISignIn) => Fetch.post('https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in', data),
  signUp: (data: ISignUp) => Fetch.post('https://baseballcloud-back.herokuapp.com/api/v1/auth', data),
  recovery: (data: IRecovery) => Fetch.post('https://baseballcloud-back.herokuapp.com/api/v1/auth/password', data)   
};

export default Api;
