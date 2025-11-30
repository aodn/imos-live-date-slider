import type { Meta, StoryObj } from '@storybook/react';
import { Circle, MoveHorizontal, Triangle } from 'lucide-react';
import { memo, useCallback, useRef, useState } from 'react';

import { Button } from '../Button';
import { DateSlider } from './DateSlider';
import type { SelectionResult, SliderExposedMethod, SliderProps, TimeUnit } from './type';
import { toUTCDate } from './utils';

const meta: Meta<typeof DateSlider> = {
  title: 'Components/DateSlider',
  component: DateSlider,
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['range', 'point', 'combined'],
    },
    initialTimeUnit: {
      control: { type: 'select' },
      options: ['day', 'month', 'year'],
    },
    granularity: {
      control: { type: 'select' },
      options: ['day', 'hour', 'minute'],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'A flexible date slider component supporting point, range, and combined selection modes with UTC date architecture.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<Partial<SliderProps>>;

// Memoized selection display component
const SelectionDisplay = memo(({ selection }: { selection?: SelectionResult }) => {
  if (!selection) return '';
  let result = '';
  if ('start' in selection && 'point' in selection) {
    result = `start: ${selection.start} \nend: ${selection.end} \npoint: ${selection.point}`;
  } else if ('start' in selection) {
    result = `start: ${selection.start} \nend: ${selection.end}`;
  } else if ('point' in selection) {
    result = `point: ${selection.point}`;
  }
  return (
    <div style={{ marginTop: 24, fontFamily: 'monospace' }}>
      <strong>Selection Output:</strong>
      <pre
        style={{
          backgroundColor: '#f8f9fa',
          padding: '12px',
          borderRadius: '4px',
          border: '1px solid #e9ecef',
          fontSize: '12px',
          overflow: 'auto',
          maxHeight: '200px',
        }}
      >
        {result}
      </pre>
    </div>
  );
});

SelectionDisplay.displayName = 'SelectionDisplay';

// Memoized control buttons component
const ControlButtons = memo(
  ({
    sliderMethodRef,
    viewMode,
  }: {
    sliderMethodRef: React.RefObject<SliderExposedMethod | null>;
    viewMode: SliderProps['mode'];
  }) => {
    const handleSetDateTime = useCallback(
      (date: Date, target?: 'point' | 'start' | 'end') => {
        sliderMethodRef.current?.setDateTime(date, target);
      },
      [sliderMethodRef]
    );

    const handleFocusHandle = useCallback(
      (handle: 'point' | 'start' | 'end') => {
        sliderMethodRef.current?.focusHandle(handle);
      },
      [sliderMethodRef]
    );

    const buttonStyle = { marginLeft: 8, marginBottom: 8 };

    return (
      <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {(viewMode === 'point' || viewMode === 'combined') && (
          <>
            <Button onClick={() => handleSetDateTime(toUTCDate('2022-01-01'), 'point')} size="sm">
              Set Point to 2022-01-01
            </Button>
            <Button onClick={() => handleFocusHandle('point')} variant="outline" size="sm">
              Focus Point Handle
            </Button>
          </>
        )}

        {(viewMode === 'range' || viewMode === 'combined') && (
          <>
            <Button
              onClick={() => handleSetDateTime(toUTCDate('2021-06-01'), 'start')}
              size="sm"
              style={buttonStyle}
            >
              Set Range Start to 2021-06-01
            </Button>
            <Button
              onClick={() => handleSetDateTime(toUTCDate('2021-09-01'), 'end')}
              size="sm"
              style={buttonStyle}
            >
              Set Range End to 2021-09-01
            </Button>
            <Button
              onClick={() => handleFocusHandle('start')}
              variant="outline"
              size="sm"
              style={buttonStyle}
            >
              Focus Start Handle
            </Button>
            <Button
              onClick={() => handleFocusHandle('end')}
              variant="outline"
              size="sm"
              style={buttonStyle}
            >
              Focus End Handle
            </Button>
          </>
        )}

        <Button
          onClick={() => handleSetDateTime(new Date(Date.now()))}
          variant="secondary"
          size="sm"
          style={buttonStyle}
        >
          Set to Current Date
        </Button>
      </div>
    );
  }
);

ControlButtons.displayName = 'ControlButtons';

// Enhanced template with better performance and accessibility
const DateSliderTemplate = (args: Partial<SliderProps>) => {
  const [selection, setSelection] = useState<SelectionResult>();
  const sliderMethodRef = useRef<SliderExposedMethod>(null);

  const handleSelectionChange = useCallback((newSelection: SelectionResult) => {
    setSelection(newSelection);
  }, []);

  // Construct value and icons based on mode
  const mode = args.mode ?? 'point';

  // Type-safe construction based on mode
  if (mode === 'point') {
    const value =
      args.value && 'point' in args.value ? args.value : { point: toUTCDate('2022-06-15') };
    return (
      <div
        style={{
          padding: 32,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: 500,
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <DateSlider
            mode="point"
            value={value}
            min={args.min ?? toUTCDate('2000-01-01')}
            max={args.max ?? toUTCDate('2030-12-31')}
            initialTimeUnit={args.initialTimeUnit ?? 'day'}
            granularity={args.granularity ?? 'day'}
            onChange={handleSelectionChange}
            imperativeRef={sliderMethodRef}
            icons={{
              point: <Circle />,
            }}
            classNames={args.classNames}
            behavior={args.behavior}
            features={args.features}
            layout={args.layout}
          />
          <SelectionDisplay selection={selection} />
          <ControlButtons sliderMethodRef={sliderMethodRef} viewMode="point" />
        </div>
      </div>
    );
  } else if (mode === 'range') {
    const value =
      args.value && 'start' in args.value && 'end' in args.value && !('point' in args.value)
        ? args.value
        : { start: toUTCDate('2022-03-01'), end: toUTCDate('2022-09-01') };
    return (
      <div
        style={{
          padding: 32,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: 500,
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <DateSlider
            mode="range"
            value={value}
            min={args.min ?? toUTCDate('2000-01-01')}
            max={args.max ?? toUTCDate('2030-12-31')}
            initialTimeUnit={args.initialTimeUnit ?? 'day'}
            granularity={args.granularity ?? 'day'}
            onChange={handleSelectionChange}
            imperativeRef={sliderMethodRef}
            icons={{
              rangeStart: <MoveHorizontal />,
              rangeEnd: <MoveHorizontal />,
            }}
            classNames={args.classNames}
            behavior={args.behavior}
            features={args.features}
            layout={args.layout}
          />
          <SelectionDisplay selection={selection} />
          <ControlButtons sliderMethodRef={sliderMethodRef} viewMode="range" />
        </div>
      </div>
    );
  } else {
    const value =
      args.value && 'start' in args.value && 'end' in args.value && 'point' in args.value
        ? args.value
        : {
            point: toUTCDate('2022-06-15'),
            start: toUTCDate('2022-03-01'),
            end: toUTCDate('2022-09-01'),
          };
    return (
      <div
        style={{
          padding: 32,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          minHeight: 500,
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          <DateSlider
            mode="combined"
            value={value}
            min={args.min ?? toUTCDate('2000-01-01')}
            max={args.max ?? toUTCDate('2030-12-31')}
            initialTimeUnit={args.initialTimeUnit ?? 'day'}
            granularity={args.granularity ?? 'day'}
            onChange={handleSelectionChange}
            imperativeRef={sliderMethodRef}
            icons={{
              point: <Circle />,
              rangeStart: <MoveHorizontal />,
              rangeEnd: <MoveHorizontal />,
            }}
            classNames={args.classNames}
            behavior={args.behavior}
            features={args.features}
            layout={args.layout}
          />
          <SelectionDisplay selection={selection} />
          <ControlButtons sliderMethodRef={sliderMethodRef} viewMode="combined" />
        </div>
      </div>
    );
  }
};

// Story configurations with better defaults and documentation
export const RangeMode: Story = {
  render: (args: Partial<SliderProps>) => <DateSliderTemplate {...args} />,
  args: {
    mode: 'range',
    value: {
      start: toUTCDate('2021-03-01'),
      end: toUTCDate('2021-06-01'),
    },
    min: toUTCDate('2020-01-01'),
    max: toUTCDate('2025-03-15'),
    initialTimeUnit: 'month' as TimeUnit,
    layout: {
      width: 800,
      height: 120,
      minGapScaleUnits: 1,
    },
    classNames: {
      trackActive: 'bg-blue-400/20',
      track: 'bg-gray-400',
      timeUnitSelector: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    },
  },
};

export const PointMode: Story = {
  render: (args: Partial<SliderProps>) => <DateSliderTemplate {...args} />,
  args: {
    mode: 'point',
    value: {
      point: toUTCDate('2019-01-01'),
    },
    min: toUTCDate('2019-01-01'),
    max: toUTCDate('2019-02-08'),
    initialTimeUnit: 'day' as TimeUnit,
    layout: {
      width: 600,
      height: 90,
    },
    classNames: {
      trackActive: 'bg-green-400/20',
      track: 'bg-gray-400',
      timeUnitSelector: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    },
  },
};

export const CombinedMode: Story = {
  render: (args: Partial<SliderProps>) => <DateSliderTemplate {...args} />,
  args: {
    mode: 'combined',
    value: {
      start: toUTCDate('2021-03-01'),
      end: toUTCDate('2021-06-01'),
      point: toUTCDate('2023-08-01'),
    },
    min: toUTCDate('2020-10-05'),
    max: toUTCDate('2025-11-11'),
    initialTimeUnit: 'month' as TimeUnit,
    layout: {
      width: 900,
      height: 140,
      minGapScaleUnits: 2,
    },
    classNames: {
      trackActive: 'bg-purple-400/20',
      track: 'bg-gray-300',
      timeUnitSelector: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    },
  },
};

export const FixedTRackWidthSlider: Story = {
  render: (args: Partial<SliderProps>) => <DateSliderTemplate {...args} />,
  args: {
    mode: 'range',
    value: {
      start: toUTCDate('2021-11-05'),
      end: toUTCDate('2022-01-05'),
    },
    min: toUTCDate('2020-10-05'),
    max: toUTCDate('2025-11-11'),
    initialTimeUnit: 'month' as TimeUnit,
    layout: {
      width: 'fill',
      fixedTrackWidth: true,
      height: 100,
    },
    classNames: {
      trackActive: 'bg-orange-400/20',
      track: 'bg-gray-400',
      timeUnitSelector: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    },
  },
};

export const CustomStyles: Story = {
  render: (args: Partial<SliderProps>) => <DateSliderTemplate {...args} />,
  args: {
    mode: 'combined',
    value: {
      start: toUTCDate('2021-11-05'),
      end: toUTCDate('2022-01-05'),
      point: toUTCDate('2023-10-10'),
    },
    min: toUTCDate('2020-10-01'),
    max: toUTCDate('2025-11-11'),
    initialTimeUnit: 'month' as TimeUnit,
    layout: {
      width: 700,
      height: 110,
      minGapScaleUnits: 1,
      trackPaddingX: 48,
    },
    classNames: {
      wrapper: 'rounded-xl shadow-lg bg-white border-2 border-indigo-200',
      slider: 'rounded-lg border border-gray-300 bg-gradient-to-r from-indigo-50 to-purple-50',
      trackActive: 'bg-gradient-to-r from-indigo-400/30 to-purple-400/30',
      track: 'bg-gray-400 border border-gray-200',
      timeUnitSelector: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    },
  },
};

export const YearlyOverview: Story = {
  render: (args: Partial<SliderProps>) => <DateSliderTemplate {...args} />,
  args: {
    mode: 'point',
    value: {
      point: toUTCDate('2024-01-01'),
    },
    min: toUTCDate('2000-01-01'),
    max: toUTCDate('2030-12-31'),
    initialTimeUnit: 'year' as TimeUnit,
    layout: {
      width: 800,
      height: 100,
      scaleUnitConfig: {
        gap: 60,
        width: { short: 1, medium: 1, long: 1 },
        height: { short: 10, medium: 20, long: 40 },
      },
    },
    classNames: {
      trackActive: 'bg-rose-400/20',
      track: 'bg-gray-300',
      timeUnitSelector: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    },
  },
};

export const ScrollableSlider: Story = {
  render: (args: Partial<SliderProps>) => <DateSliderTemplate {...args} />,
  args: {
    mode: 'point',
    value: {
      point: toUTCDate('2022-06-15'),
    },
    min: toUTCDate('2020-01-01'),
    max: toUTCDate('2024-12-31'),
    initialTimeUnit: 'day' as TimeUnit,
    layout: {
      width: 600,
      height: 80,
      scaleUnitConfig: {
        gap: 100,
        width: { short: 1, medium: 2, long: 2 },
        height: { short: 18, medium: 36, long: 60 },
      },
    },
    behavior: {
      scrollable: true,
    },
    classNames: {
      trackActive: 'bg-teal-400/20',
      track: 'bg-gray-300',
      timeUnitSelector: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    },
  },
};

// Frosted glass component wrapper for proper hook usage
const FrostedGlassTemplate = (args: Partial<SliderProps>) => {
  const [_, setSelection] = useState<SelectionResult>();

  const handleSelect = useCallback((newSelection: SelectionResult) => {
    setSelection(newSelection);
  }, []);

  const min = args.min ?? toUTCDate('2020-01-01');
  const max = args.max ?? toUTCDate('2020-02-10');

  // This template only supports point mode
  const value =
    args.value && 'point' in args.value ? args.value : { point: toUTCDate('2020-01-15') };

  return (
    <div
      style={{
        padding: 32,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: 400,
        borderRadius: '8px',
      }}
    >
      <DateSlider
        mode="point"
        value={value}
        initialTimeUnit={args.initialTimeUnit ?? 'day'}
        granularity={args.granularity ?? 'day'}
        min={min}
        max={max}
        icons={{
          point: <Triangle className="text-slate-700 fill-slate-700" size={24} />,
        }}
        classNames={{
          slider: 'frosted',
          timeUnitSelector: 'frosted',
          timeDisplay: 'frosted',
          trackActive: 'hidden',
          ...args.classNames,
        }}
        onChange={handleSelect}
        behavior={{
          scrollable: true,
          ...args.behavior,
        }}
        layout={{
          scaleUnitConfig: {
            gap: 100,
            width: { short: 1, medium: 2, long: 2 },
            height: { short: 18, medium: 36, long: 60 },
          },
          height: 64,
          width: 'fill',
          showEndLabel: false,
          ...args.layout,
        }}
        features={{
          timeUnitSelector: false,
          timeDisplay: true,
          ...args.features,
        }}
      />
    </div>
  );
};

export const FrostedGlass: Story = {
  render: (args: Partial<SliderProps>) => <FrostedGlassTemplate {...args} />,
  args: {
    mode: 'point',
    value: {
      point: toUTCDate('2020-01-15'),
    },
    min: toUTCDate('2020-01-01'),
    max: toUTCDate('2020-02-10'),
    initialTimeUnit: 'day' as TimeUnit,
    features: {
      timeUnitSelector: true,
    },
  },
};
