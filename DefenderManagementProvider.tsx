import React, { ComponentProps, createContext, FC, useCallback, useContext, useEffect, useMemo, useRef } from 'react';

import { useRefreshListener } from '@isf/fusion-common-ui/utils/hooks/Events';
import { useRequest } from '@isf/fusion-common-ui/utils/hooks/Requests';

import { DefenderInfoContext, DefenderProviderData, getDefaultDefenderData } from './DefenderInfoProvider';
import { getServices, getUserRoles } from '../api/DefenderInfo/DefenderRequests';
import { DEFENDER_SERVICE_NAME, GetRolesType, GetServices, HELIOS_SERVICE_NAME, Service } from '../api/DefenderInfo/DefenderTypes';
import { getUsersList } from '../api/Users/UsersRequests';
import { GetUsersResponse } from '../api/Users/UsersTypes';

export interface DefenderManagementData {
  users: GetUsersResponse;
  roles?: GetRolesType;
  services: GetServices;
  defenderService: Service;
  heliosService: Service;
}

export type DefenderManagementDataContext = DefenderProviderData<DefenderManagementData>;
export const DefenderManagementContext = createContext<DefenderManagementDataContext>(getDefaultDefenderData());

export function DefenderManagementProvider({ children }: ComponentProps<FC>) {
  const defenderContext = useContext(DefenderInfoContext);
  const initialFetchStarted = useRef<boolean>(false);
  const {
    responseData: [usersListResponse],
    request: [queryUsersList],
    loadingState: [usersListLoading]
  } = useRequest(getUsersList);

  const {
    responseData: [rolesListResponse],
    request: [queryRolesList],
    loadingState: [rolesListLoading]
  } = useRequest(getUserRoles);

  const {
    responseData: [rolesByServiceResponse],
    request: [queryServices],
    loadingState: [rolesByServiceLoading]
  } = useRequest(getServices);

  // Performs the initial fetch to populate the users.
  const initialFetch = useCallback(() => {
    void queryUsersList();
    void queryRolesList();
    void queryServices();
  }, [queryUsersList, queryRolesList, queryServices]);

  const doRefresh = useCallback(() => {
    if (defenderContext.data?.isAdmin) {
      void queryUsersList();
    }
  }, [defenderContext.data?.isAdmin, queryUsersList]);

  // Bind the on refresh method to the global refresh event
  useRefreshListener(doRefresh);

  // Perform the initial fetch when the defender Context is mounted.
  useEffect(() => {
    if (defenderContext.data && defenderContext.data.isAdmin && !initialFetchStarted.current) {
      initialFetchStarted.current = true;
      initialFetch();
    }
  }, [defenderContext, initialFetch]);

  const providerValue: DefenderManagementDataContext = useMemo(
    () => ({
      data: usersListResponse
        ? ({
            users: usersListResponse,
            roles: rolesListResponse,
            services: rolesByServiceResponse,
            defenderService: rolesByServiceResponse?.find(svc => svc.name === DEFENDER_SERVICE_NAME),
            heliosService: rolesByServiceResponse?.find(svc => svc.name === HELIOS_SERVICE_NAME)
          } as DefenderManagementData)
        : undefined,
      loadingState: usersListLoading || rolesListLoading || rolesByServiceLoading,
      refresh: () => {
        console.log('');
      }
    }),
    [usersListLoading, usersListResponse, rolesListResponse, rolesByServiceResponse, rolesListLoading, rolesByServiceLoading]
  );

  if (defenderContext.data) {
    return <DefenderManagementContext.Provider value={providerValue}>{children}</DefenderManagementContext.Provider>;
  }

  return <>{children}</>;
}
