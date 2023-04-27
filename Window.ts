import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { EventValues } from '@isf/fusion-common-ui/utils/Events';
import { useEventListener } from '@isf/fusion-common-ui/utils/hooks/Events';

/**
 * Hook for creating an interval. Can be disabled by setting `delay` to null.
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  useLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

export interface UseFiniteIntervalProps {
  /** Callback executed each interval */
  callback: () => void;
  /** Amount of time in ms to wait between intervals */
  delay: number;
  /** Total amount of intervals to allow before pausing the interval */
  limitIntervals: number;
  /** Event name used to start the interval execution */
  pollingEventName: EventValues;
}
/**
 * Hook for creating an interval that will automatically stop executing after a certain amount of intervals have passed.
 * This interval will only start execution after an event is dispatched with the supplied pollingEventName
 */
export function useFiniteInterval({ callback, delay, limitIntervals, pollingEventName }: UseFiniteIntervalProps) {
  const [intervalCount, setIntervalCount] = useState(0);
  const [pollingStart, setPollingStart] = useState(false);

  /** Listen to polling event to know when to trigger the start of the polling period */
  useEventListener(
    pollingEventName,
    useCallback(() => {
      setPollingStart(true);
    }, [])
  );

  useEffect(() => {
    /** If polling has ended, reset the intervalCount back to 0 */
    if (!pollingStart) {
      setIntervalCount(0);
    }

    /** If the intervalCount has reached the limit, stop the polling */
    if (intervalCount === limitIntervals) {
      setPollingStart(false);
    }
  }, [intervalCount, limitIntervals, pollingStart]);

  /** Callback to increment the intervalCount after the callback was executed */
  const intervalCallback = useCallback(() => {
    callback();
    setIntervalCount(intervalCount + 1);
  }, [callback, intervalCount]);

  /** Create the interval, supplying null for the delay if polling has stopped or reached its limit */
  useInterval(intervalCallback, pollingStart && intervalCount < limitIntervals ? delay : null);
}
