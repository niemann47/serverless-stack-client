const dev = {
  STRIPE_KEY: "pk_test_ys9GkwgbvCgRKIHvDtIiz8LR007gkeGDsS",
  s3: {
    REGION: "us-east-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-rrorqiu5n7fs"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://api.ohwhatfun.org/dev"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_qBh0LWlMX",
    APP_CLIENT_ID: "3veeugm6i47vt4ctstiqlkd73g",
    IDENTITY_POOL_ID: "us-east-2:6495cd98-3973-4564-bab8-8f667930d92e"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_ys9GkwgbvCgRKIHvDtIiz8LR007gkeGDsS",
  s3: {
    REGION: "us-east-2",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1hjvmy3wiqtsq"
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://api.ohwhatfun.org/prod"
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_Y6n01xbfF",
    APP_CLIENT_ID: "1b7rgd8lqsa91v5p1f0m21a2pn",
    IDENTITY_POOL_ID: "us-east-2:6495cd98-3973-4564-bab8-8f667930d92e"
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