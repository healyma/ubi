const dev= {
    s3: {
        REGION: "eu-west-1",
        BUCKET: "ubidobi-prod-attachmentsbucket-14tkg7u8eszl0"
      },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_fk1fLqlWR",
        APP_CLIENT_ID: "6tcs7h5pn0vtpesi18b6s3hsi5",
        IDENTITY_POOL_ID: "eu-west-1:2f499a07-e591-40a9-bcf0-f48de48285fa"
      },
    endpoint: "http://localhost:3002"
};
const prod={
    s3: {
        REGION: "eu-west-1",
        BUCKET: "ubidobi-prod-attachmentsbucket-14tkg7u8eszl0"
      },
    cognito: {
        REGION: "eu-west-1",
        USER_POOL_ID: "eu-west-1_fk1fLqlWR",
        APP_CLIENT_ID: "6tcs7h5pn0vtpesi18b6s3hsi5",
        IDENTITY_POOL_ID: "eu-west-1:2f499a07-e591-40a9-bcf0-f48de48285fa"
      },
    endpoint: "be.ubidobi.com"
};
console.log(process.env.REACT_APP_STAGE);
const config = process.env.REACT_APP_STAGE === 'production'
  ? prod
  : dev;
  export default{
      ...config
  };