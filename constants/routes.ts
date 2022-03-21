export const routes = {
  HOME: '/',
  QUIZZES: {
    ROOT: '/quizzes',
    CREATE: '/quizzes/create',
    TYPES: {
      TA: '/quizzes/ta',
      SA: '/quizzes/sa',
      RA: '/quizzes/ra',
      AB: '/quizzes/ab'
    }
  },
  PROFILE: {
    ROOT: '/profile',
    ACCOUNT: '/profile/account',
    QUIZZES: '/profile/quizzes',
    SUBSCRIPTION: '/profile/subscription',
    SETTINGS: '/profile/settings',
    ACCOUNT_CHANGE_ROOT: '/profile/change/',
    ACCOUNT_CHANGE_AVATAR: '/profile/change/avatar',
    ACCOUNT_CHANGE_NAME: '/profile/change/nickname',
    ACCOUNT_CHANGE_EMAIL: '/profile/change/email',
    ACCOUNT_CHANGE_PASSWORD: '/profile/change/password'
  },
  AUTH: {
    ROOT: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    RESET: '/auth/reset',
    ACTIVATE: '/auth/activate'
  },
};

export const userInfoChangeOptions = {
  [routes.PROFILE.ACCOUNT_CHANGE_NAME]: 'nickname',
  [routes.PROFILE.ACCOUNT_CHANGE_EMAIL]: 'email',
  [routes.PROFILE.ACCOUNT_CHANGE_PASSWORD]: 'password',
  [routes.PROFILE.ACCOUNT_CHANGE_AVATAR]: 'avatar',
}

export const queryKeys = {
  RESET_TOKEN: 'reset_token'
};