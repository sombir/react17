import React, { ComponentProps, createContext, FC, useCallback, useEffect, useMemo, useState } from 'react';

import { mergeClassNameProp } from '@isf/fusion-common-ui/utils/DomUtils';
import { useEventListener } from '@isf/fusion-common-ui/utils/hooks/Events';
import { RequestState, useRequest } from '@isf/fusion-common-ui/utils/hooks/Requests';
import { clearLocalStorageValue, getLocalStorageValue, LocalStorageKey, setLocalStorageValue } from '@isf/fusion-common-ui/utils/LocalStorage';
import { Button, Checkbox, Modal } from 'carbon-components-react';

import { getToggles } from '../api/DefenderInfo/DefenderRequests';
import { DeveloperMenuEvent } from '../content/Development/DeveloperMenu';
import styles from '../content/Development/DeveloperMenu.module.scss';

const { developerModal, divider, overriddenToggle, overrideControls, overrideLegend, spacer } = styles;
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

export type DevConfigurationDataContext = DefenderProviderData<DevConfigurationInfo>;
export const DevConfigurationContext = createContext<DevConfigurationDataContext>(getDefaultDefenderData());

export declare type TogglesType = Record<string, boolean>;
export interface DevConfigurationInfo {
  toggles: TogglesType;
}

export function DevConfigurationProvider({ children }: ComponentProps<FC>) {
  const [toggleOverrideValues, setToggleOverrideValues] = useState<TogglesType>({});
  const [isDevMenuOpen, setIsDevMenuOpen] = useState<boolean>(false);
  const openDevMenu = useCallback(() => setIsDevMenuOpen(true), []);
  const closeDevMenu = useCallback(() => setIsDevMenuOpen(false), []);
  useEventListener(DeveloperMenuEvent, openDevMenu, document);

  const {
    responseData: [togglesData],
    request: [queryTogglesData],
    loadingState: [togglesDataLoading]
  } = useRequest(getToggles);

  // When component is mounted, load the current override values from local storage
  useEffect(() => {
    try {
      setToggleOverrideValues(getLocalStorageValue(LocalStorageKey.DevelopmentMenuToggles) ?? togglesData ?? {});
    } catch {
      console.error('Error parsing development toggle values');
    }
  }, [togglesData]);

  const setToggleOverride = useCallback((toggleName: string, toggleValue: boolean) => {
    setToggleOverrideValues(currentValues => {
      const newValues = { ...currentValues, [toggleName]: toggleValue };
      setLocalStorageValue(LocalStorageKey.DevelopmentMenuToggles, newValues);
      return newValues;
    });
  }, []);

  const clearToggleOverrides = useCallback(() => {
    setToggleOverrideValues({});
    clearLocalStorageValue(LocalStorageKey.DevelopmentMenuToggles);
  }, []);

  const mergedToggleValues = useMemo(() => ({ ...togglesData, ...toggleOverrideValues }), [togglesData, toggleOverrideValues]);

  const onRefresh = useCallback(() => {
    void queryTogglesData();
  }, [queryTogglesData]);

  // call all fetch methods when initialized
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const newData = useMemo(
    () => ({
      data: {
        toggles: mergedToggleValues
      },
      loadingState: togglesDataLoading,
      refresh: onRefresh
    }),
    [mergedToggleValues, onRefresh, togglesDataLoading]
  );

  // Memoized list of the toggle checkboxes
  const toggleCheckboxes = useMemo(() => {
    const overriddenKeys = Object.keys(toggleOverrideValues);

    return Object.entries(mergedToggleValues)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([toggleName, toggleValue]) => (
        <Checkbox
          key={toggleName}
          id={toggleName}
          className={overriddenKeys.includes(toggleName) ? overriddenToggle : ''}
          labelText={toggleName}
          checked={toggleValue}
          onChange={() => setToggleOverride && setToggleOverride(toggleName, !toggleValue)}
        />
      ));
  }, [toggleOverrideValues, mergedToggleValues, setToggleOverride]);

  return (
    <>
      <Modal
        open={isDevMenuOpen}
        danger
        modalHeading="Development menu"
        primaryButtonText="Close and reload"
        secondaryButtonText="Close"
        size="md"
        className={mergeClassNameProp(developerModal, 'fsn-dark-theme')}
        onRequestClose={closeDevMenu}
        onRequestSubmit={() => window.location.reload()}>
        <div className={overrideControls}>
          <div className={overrideLegend} />
          <span>Toggle value overridden by user</span>
          <div className={spacer} />
          <Button kind="ghost" onClick={clearToggleOverrides}>
            Clear overrides
          </Button>
        </div>
        <hr className={divider} />
        {toggleCheckboxes}
      </Modal>
      <DevConfigurationContext.Provider value={newData}>{children}</DevConfigurationContext.Provider>
    </>
  );
}
