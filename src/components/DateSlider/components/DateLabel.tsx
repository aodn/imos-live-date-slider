import { cn } from '@/utils';
import { memo } from 'react';
import { createPortal } from 'react-dom';
import { useDateLabelPersist } from '../hooks';
import type { DateSliderClassNames } from '../type';

export const DateLabel = memo(
  ({
    position,
    label,
    immediateDisappear,
    labelPersistent,
    classNames,
  }: {
    position?: { x: number; y: number };
    label?: string;
    immediateDisappear?: boolean;
    labelPersistent?: boolean;
    classNames?: DateSliderClassNames;
  }) => {
    // showDateLabel only works when labelPersistent is false
    const { showDateLabel } = useDateLabelPersist(
      immediateDisappear || false,
      label,
      labelPersistent || false
    );

    if (!position || !label) return null;
    if (!showDateLabel && !labelPersistent) return null;

    return createPortal(
      <div
        style={{ left: position.x, top: position.y }}
        className={cn(
          'hidden md:block fixed z-50 transform -translate-x-1/2 pointer-events-none',
          classNames?.dateLabel ||
            'bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap'
        )}
        role="tooltip"
        aria-live="polite"
      >
        <span className={classNames?.dateLabelText}>{label}</span>
      </div>,
      document.body
    );
  }
);

DateLabel.displayName = 'DateLabel';
