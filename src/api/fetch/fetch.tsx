import { ISignIn, ISignUp, IRecovery } from '../../interfaces/interfaces';
const axios = require('axios').default;

type PostType = ISignIn | ISignUp | IRecovery
const Fetch = {
  post: (url: string, data: PostType) => {
    return axios.post(url, data);
  }
};

export default Fetch;
