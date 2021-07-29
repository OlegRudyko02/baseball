import { ISignIn, ISignUp, IRecovery } from '../../interfaces/interfaces';
import { store } from '../../store';
const axios = require('axios').default;

axios.interceptors.request.use(function (config: any) {
  const headers: any = {
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json',
    'Content-Type': 'application/json',
   };
   const auth = store.getState().auth;
   if (!auth.client?.length) {
     return config;
   }
   return {
     ...config,
     headers: { headers, ...auth },
   };
}, function (error: any) {
  return Promise.reject(error);
});

type PostType = ISignIn | ISignUp | IRecovery
const Fetch = {
  post: (url: string, data: PostType, ) => {
    return axios.post(url, data);
  }
};

export default Fetch;
