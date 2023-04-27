import { useState } from 'react';

import { AxiosErrorResponse, configureInstance } from '@isf/fusion-common-ui/api/utils/axios/request';
import axios from 'axios';

import { defenderHistory } from '../content/Navigation/NavigationUtils';
import axiosInstance from '../utils/request';

const loginPage = '/login';
const authRedirectPage = '/welcome2';
const authenticationFailed = 'authenticationFailed';

/**
 * The hook maintains the authenticated/logged-in state of the user by tracking authentication
 * errors identified by the custom error handler that's added to the axios middle layer.
 */
export function useAxiosAuthenticationError() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const authenticationErrorHandler = (response: AxiosErrorResponse) => {
    if (response.status === 401 || response.status === 403) {
      // An unauthorized or forbidden error occurred.
      setIsAuthenticated(false);

      // Do not redirect to the login page under the following circumstances :-
      // auth/redirect page - the app is in the midst of getting the access_token cookie and we want to avoid a race condition
      // login page - in this circumstance it's likely that multiple requests are failing authentication and we're already on the login page.
      const pathname = window.location.pathname;
      if (pathname !== authRedirectPage && pathname !== loginPage) {
        defenderHistory.push(loginPage);
      }

      return Promise.reject(new axios.Cancel(authenticationFailed));
    }

    return Promise.reject(response);
  };

  // Add the authentication error handling to the response's interceptor
  configureInstance(axiosInstance, authenticationErrorHandler);

  return { isAuthenticated, setIsAuthenticated };
}
