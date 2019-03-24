const dev = {
    STRIPE_KEY: "pk_test_VQZXw3so5QUJDwfOwghESOr0",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "ubi-notes-uploads"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://f7bj1ejue7.execute-api.eu-west-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_JYyMexwJR",
    APP_CLIENT_ID: "74c98ije7qbrntnsucatuuvu3s",
    IDENTITY_POOL_ID: "eu-west-1:0457e103-3554-440c-920b-82e130ebf390"
  }
};

const prod = {
    STRIPE_KEY: "pk_test_VQZXw3so5QUJDwfOwghESOr0",
  s3: {
    REGION: "eu-west-1",
    BUCKET: "ubidobi-prod-attachmentsbucket-14tkg7u8eszl0"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://mm1uleskt8.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_fk1fLqlWR",
    APP_CLIENT_ID: "6tcs7h5pn0vtpesi18b6s3hsi5",
    IDENTITY_POOL_ID: "eu-west-1:2f499a07-e591-40a9-bcf0-f48de48285fa"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};

