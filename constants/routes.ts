export const routes = {
  HOME: '/',
  QUIZES: {
    ROOT: '/quizes',
    CREATE: '/quizes/create',
    TYPES: {
      TA: '/quizes/ta',
      SA: '/quizes/sa',
      RA: '/quizes/ra',
      AB: '/quizes/ab'
    }
  },
  PROFILE: {
    ROOT: '/profile',
    ACCOUNT: '/profile/account',
    QUESTIONS: '/profile/account/questions',
    SUBSCRIPTION: '/profile/account/subscription',
  },
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESET: '/auth/reset',
  },
};

export const queryKeys = {
  RESET_TOKEN: 'reset_token'
};