const BASE_URL = `https://upskilling-egypt.com:3007/api`;
const BASE_AUTH = `${BASE_URL}/auth`;
export const imgPath = `https://upskilling-egypt.com:3006`;

export const AUTH = {
  login: `${BASE_AUTH}/login`,
  register: `${BASE_AUTH}/register`,
  forgetPassword: `${BASE_AUTH}/forgot-password`,
  resetPassword: `${BASE_AUTH}/reset-password`,
  changePassword: `${BASE_AUTH}/change-password`,
  logout: `${BASE_AUTH}/logout`,
};

export const DASHBOARD = {
  books: `${BASE_URL}/book`,
  bookId: `${BASE_URL}/book/id`,
  category: `${BASE_URL}/category`,
  basket: `${BASE_URL}/basket/item`,
};
