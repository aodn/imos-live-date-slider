import { useState, useRef, useEffect } from 'react';

/**
 * Custom hook to manage the persistence of the date label display, date label will
 * appear for a short duration when triggered unless immediateDisappear is true.
 * This only applies when labelPersistent is false.
 * @param labelPersistent
 * @param immediateDisappear
 * @param label
 * @returns { showDateLabel: boolean }
 */
export const useDateLabelPersist = (
  immediateDisappear: boolean,
  label: string | undefined,
  labelPersistent: boolean
) => {
  const [showDateLabel, setShowDateLabel] = useState(false);
  const enableTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const disableTimeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (labelPersistent) return;

    if (immediateDisappear) {
      setShowDateLabel(false);
      if (disableTimeoutId.current) clearTimeout(disableTimeoutId.current);
      if (enableTimeoutId.current) clearTimeout(enableTimeoutId.current);
      return;
    }
  }, [immediateDisappear, labelPersistent]);

  useEffect(() => {
    if (labelPersistent) return;

    if (label !== undefined) {
      enableTimeoutId.current = setTimeout(() => {
        setShowDateLabel(true);
      }, 100);

      disableTimeoutId.current = setTimeout(() => {
        setShowDateLabel(false);
      }, 1500);
    } else {
      setShowDateLabel(false);
    }
    return () => {
      setShowDateLabel(false);
      if (disableTimeoutId.current) clearTimeout(disableTimeoutId.current);
      if (enableTimeoutId.current) clearTimeout(enableTimeoutId.current);
    };
  }, [label, labelPersistent]);
  return { showDateLabel };
};
