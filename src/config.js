export default {
MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "eu-west-1",
    BUCKET: "ubi-notes-uploads"
  },
  apiGateway: {
    REGION: "eu-west-1",
    URL: "https://02b47unaji.execute-api.eu-west-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-west-1",
    USER_POOL_ID: "eu-west-1_iaq8cMjX8",
    APP_CLIENT_ID: "4dnn3l5jdov9g8nvlt6vb82cak",
    IDENTITY_POOL_ID: "eu-west-1:862a6fdc-73da-4f39-b66b-ce7a4fc60566"
  }
};
