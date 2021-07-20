import { ISignIn, ISignUp } from '../../interfaces/interfaces';
const axios = require('axios').default;
type PostType = ISignIn | ISignUp
const Fetch = {
  post: (url: string, data: PostType) => {
    return axios.post(url, data);
  }
};

export default Fetch;
