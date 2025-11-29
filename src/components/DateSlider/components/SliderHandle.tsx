import { memo } from 'react';
import { cn } from '@/utils';
import { Button } from '../../Button';
import type { RenderSliderHandleProps, SliderHandleProps } from '../type';
import { formatForDisplay, getDateFromPercent } from '../utils';
import { DateLabel } from './DateLabel';

// Updated SliderHandleProps type to include touch event handlers
type UpdatedSliderHandleProps = SliderHandleProps & {
  onTouchStart?: (e: React.TouchEvent) => void;
  labelPersistent?: boolean;
};

export const SliderHandle = ({
  onDragging,
  position,
  label,
  icon,
  onMouseDown,
  onTouchStart,
  className,
  ref,
  min,
  max,
  value,
  handleType,
  onKeyDown,
  onFocus,
  isSliderDragging,
  labelPersistent,
}: UpdatedSliderHandleProps) => {
  const generateLabelPosition = () => {
    if (!ref.current || handleType !== 'point') return;
    return {
      x: ref.current.getBoundingClientRect().left + ref.current.getBoundingClientRect().width / 2,
      y: ref.current.getBoundingClientRect().top - 32,
    };
  };
  return (
    <Button
      ref={ref}
      size={'icon'}
      variant={'ghost'}
      className={cn(
        'group absolute pointer-events-auto z-20 transform  -translate-x-1/2 transition-all duration-50 hover:scale-110 hover:bg-transparent active:bg-transparent touch-none',
        'focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-blue-500',
        'motion-reduce:transition-none',
        className,
        { 'scale-110': onDragging }
      )}
      style={{ left: `${position}%` }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      role="slider"
      aria-orientation="horizontal"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={label}
      aria-label={`${handleType} handle`}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
    >
      {icon}
      {!onDragging && handleType === 'point' && (
        <DateLabel
          position={generateLabelPosition()}
          label={label}
          immediateDisappear={isSliderDragging}
          labelPersistent={labelPersistent}
        />
      )}
    </Button>
  );
};

type UpdatedRenderSliderHandleProps = RenderSliderHandleProps & {
  onTouchStart: (handle: 'start' | 'end' | 'point') => (e: React.TouchEvent) => void;
};

export const RenderSliderHandle = memo<UpdatedRenderSliderHandleProps>(
  ({
    viewMode,
    rangeStart,
    rangeEnd,
    pointPosition,
    startDate,
    endDate,
    isDragging,
    rangeHandleIcon,
    pointHandleIcon,
    startHandleRef,
    endHandleRef,
    pointHandleRef,
    onHandleFocus,
    onMouseDown,
    onTouchStart,
    onKeyDown,
    isSliderDragging,
    labelPersistent,
  }) => {
    const commonProps = {
      className: 'top-0',
      labelClassName: '-top-8 bg-red-600',
      onFocus: onHandleFocus,
      min: 0,
      max: 100,
    };

    return (
      <>
        {(viewMode === 'range' || viewMode === 'combined') && (
          <>
            <SliderHandle
              viewMode={viewMode}
              ref={startHandleRef}
              {...commonProps}
              icon={rangeHandleIcon}
              onDragging={isDragging === 'start'}
              position={rangeStart}
              label={formatForDisplay(
                getDateFromPercent(rangeStart, startDate, endDate),
                'day',
                'en-AU',
                true
              )}
              onMouseDown={onMouseDown('start')}
              onTouchStart={onTouchStart('start')}
              value={rangeStart}
              handleType="start"
              onKeyDown={onKeyDown('start')}
              labelPersistent={labelPersistent}
            />
            <SliderHandle
              viewMode={viewMode}
              ref={endHandleRef}
              {...commonProps}
              icon={rangeHandleIcon}
              onDragging={isDragging === 'end'}
              position={rangeEnd}
              label={formatForDisplay(
                getDateFromPercent(rangeEnd, startDate, endDate),
                'day',
                'en-AU',
                true
              )}
              onMouseDown={onMouseDown('end')}
              onTouchStart={onTouchStart('end')}
              value={rangeEnd}
              handleType="end"
              onKeyDown={onKeyDown('end')}
              labelPersistent={labelPersistent}
            />
          </>
        )}

        {(viewMode === 'point' || viewMode === 'combined') && (
          <SliderHandle
            viewMode={viewMode}
            ref={pointHandleRef}
            {...commonProps}
            icon={pointHandleIcon}
            onDragging={isDragging === 'point'}
            position={pointPosition}
            label={formatForDisplay(
              getDateFromPercent(pointPosition, startDate, endDate),
              'day',
              'en-AU',
              true
            )}
            onMouseDown={onMouseDown('point')}
            onTouchStart={onTouchStart('point')}
            value={pointPosition}
            handleType="point"
            onKeyDown={onKeyDown('point')}
            isSliderDragging={isSliderDragging}
            labelPersistent={labelPersistent}
          />
        )}
      </>
    );
  }
);
