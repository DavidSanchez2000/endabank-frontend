class apiUrls {
  static readonly BASE_URL = "http://35.239.51.128:8081/api/v1";
  static readonly GET_USERS_TO_APPROVE_URL = `${this.BASE_URL}/users`;
  static readonly GET_USER_DETAILS = `${this.BASE_URL}/users/details`;
  static readonly PUT_USERS_TO_APPROVE_URL = `${this.GET_USERS_TO_APPROVE_URL}/approve`;
  static readonly LOG_IN_URL = `${this.BASE_URL}/login`
  static readonly GET_USERS_CHANGE_PASSWORD_URL = `${this.BASE_URL}/users/change-password`;
  static readonly GET_USERS_RESET_PASSWORD_URL = `${this.BASE_URL}/users/reset-password`;
  static readonly POST_CREATE_USERS = `${this.BASE_URL}/users`;
  static readonly VERIFY_USER_EMAIL_URL = `${this.BASE_URL}/users/verify-email/`;
}
export default apiUrls;
