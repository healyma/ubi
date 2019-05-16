const dev= {

    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_fk1fLqlWR",
        APP_CLIENT_ID: "6tcs7h5pn0vtpesi18b6s3hsi5",
        IDENTITY_POOL_ID: "eu-west-1:2f499a07-e591-40a9-bcf0-f48de48285fa"
      },
    endpoint: "http://localhost:3002"
};
const prod={

    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_fk1fLqlWR",
        APP_CLIENT_ID: "6tcs7h5pn0vtpesi18b6s3hsi5",
        IDENTITY_POOL_ID: "eu-west-1:2f499a07-e591-40a9-bcf0-f48de48285fa"
      },
    endpoint: "https://ubidobi.herokuapp.com"
};
console.log(process.env.REACT_APP_STAGE);
const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;
  export default{
      ...config
  };