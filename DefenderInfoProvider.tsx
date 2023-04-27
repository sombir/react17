import React, { ComponentProps, createContext, FC, useCallback, useEffect, useMemo } from 'react';

import { useRefreshListener } from '@isf/fusion-common-ui/utils/hooks/Events';
import { RequestState, useRequest } from '@isf/fusion-common-ui/utils/hooks/Requests';

import { getUser } from '../api/DefenderInfo/DefenderRequests';
import { RoleName, User } from '../api/DefenderInfo/DefenderTypes';
import { defenderHistory, RoutePath } from '../content/Navigation/NavigationUtils';
import { useAxiosAuthenticationError } from '../hooks/AxiosAuthenticationHandler';
import { getRoleNamesByService } from '../utils/users';

export interface DefenderAppInfo {
  userInfo: User;
  isAdmin?: boolean;
}

export interface DefenderProviderData<TResponseData> extends RequestState<TResponseData> {
  refresh: () => void;
}

// eslint-disable-next-line
export function getDefaultDefenderData(): DefenderProviderData<any> {
  return {
    data: undefined,
    loadingState: { loading: false, initial: false },
    refresh: () => {
      /* Do nothing */
    }
  };
}

export type DefenderInfoDataContext = DefenderProviderData<DefenderAppInfo>;
export const DefenderInfoContext = createContext<DefenderInfoDataContext>(getDefaultDefenderData());

export const DefenderInfoProvider = ({ children }: ComponentProps<FC>): JSX.Element => {
  const { isAuthenticated, setIsAuthenticated } = useAxiosAuthenticationError();

  const {
    responseData: [userResponse],
    request: [queryUser],
    loadingState: [userLoading]
  } = useRequest(getUser);

  const defenderRoles: RoleName[] = useMemo(() => {
    return getRoleNamesByService(userResponse, 'defender');
  }, [userResponse]);

  // Performs the initial fetch to populate the provider.
  // This also provides the initial user authentication check
  const initialFetch = useCallback(() => {
    void queryUser()
      .then(() => {
        // The request was successful and the user authenticated.
        // If an authentication error had ocurred then the
        // request would have been cancelled and this callback not invoked.
        // Since we're authenticated it's safe to make the call for the user info
        setIsAuthenticated(true);
      })
      .catch(e => {
        const errorStatus = e.status;
        if (errorStatus === 404) {
          defenderHistory.push(`${RoutePath.login}?logout=2`);
        } else if (errorStatus === 500) {
          defenderHistory.push(`${RoutePath.login}?logout=3`);
        }
      });
  }, [queryUser, setIsAuthenticated]);

  // The callback invoked to refresh the provider.
  const refresh = useCallback(() => {
    void queryUser();
  }, [queryUser]);

  useRefreshListener(refresh);

  // Perform the initial fetch when the provider is mounted. This will also establish if the user is authenticated
  useEffect(() => initialFetch(), [initialFetch]);

  const providerValue: DefenderInfoDataContext = useMemo(
    () => ({
      data: userResponse
        ? ({
            userInfo: userResponse,
            isAdmin: !!defenderRoles?.find(role => role === 'securityAdmin')
          } as DefenderAppInfo)
        : undefined,
      loadingState: userLoading,
      refresh: refresh
    }),
    [defenderRoles, userLoading, userResponse, refresh]
  );

  if (isAuthenticated) {
    return <DefenderInfoContext.Provider value={providerValue}>{children}</DefenderInfoContext.Provider>;
  }

  return <>{children}</>;
};
