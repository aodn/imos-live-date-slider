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
    viewMode: {
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
    isTrackFixedWidth: { control: 'boolean' },
    scrollable: { control: 'boolean' },
    sliderWidth: { control: 'text' },
    sliderHeight: { control: 'number' },
    minGapScaleUnits: { control: 'number' },
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
  if ('range' in selection && 'point' in selection) {
    result = `start: ${selection.range.start} \nend: ${selection.range.end} \npoint: ${selection.point}`;
  } else if ('range' in selection) {
    result = `start: ${selection.range.start} \nend: ${selection.range.end}`;
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
    viewMode: SliderProps['viewMode'];
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
          {...args}
          startDate={args.startDate ?? toUTCDate('2000-01-01')}
          endDate={args.endDate ?? toUTCDate('2030-12-31')}
          viewMode={args.viewMode ?? 'point'}
          initialTimeUnit={args.initialTimeUnit ?? 'day'}
          granularity={args.granularity ?? 'day'}
          onChange={handleSelectionChange}
          imperativeHandleRef={sliderMethodRef}
          pointHandleIcon={<Circle />}
          rangeHandleIcon={<MoveHorizontal />}
        />

        <SelectionDisplay selection={selection} />

        <ControlButtons sliderMethodRef={sliderMethodRef} viewMode={args.viewMode || 'point'} />
      </div>
    </div>
  );
};

// Story configurations with better defaults and documentation
export const RangeMode: Story = {
  render: (args) => <DateSliderTemplate {...args} />,
  args: {
    viewMode: 'range',
    startDate: toUTCDate('2020-01-01'),
    endDate: toUTCDate('2025-03-15'),
    initialTimeUnit: 'month' as TimeUnit,
    initialRange: {
      start: toUTCDate('2021-03-01'),
      end: toUTCDate('2021-06-01'),
    },
    sliderWidth: 800,
    sliderHeight: 120,
    trackActiveClassName: 'bg-blue-400/20',
    trackBaseClassName: 'bg-gray-400',
    minGapScaleUnits: 1,
    timeUnitSelectionClassName: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
  },
};

export const PointMode: Story = {
  render: (args) => <DateSliderTemplate {...args} />,
  args: {
    viewMode: 'point',
    startDate: toUTCDate('2019-01-01'),
    endDate: toUTCDate('2019-02-08'),
    initialTimeUnit: 'day' as TimeUnit,
    initialPoint: toUTCDate('2019-01-01'),
    sliderWidth: 600,
    sliderHeight: 90,
    trackActiveClassName: 'bg-green-400/20',
    trackBaseClassName: 'bg-gray-400',
    timeUnitSelectionClassName: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
  },
};

export const CombinedMode: Story = {
  render: (args) => <DateSliderTemplate {...args} />,
  args: {
    viewMode: 'combined',
    startDate: toUTCDate('2020-10-05'),
    endDate: toUTCDate('2025-11-11'),
    initialTimeUnit: 'month' as TimeUnit,
    initialRange: {
      start: toUTCDate('2021-03-01'),
      end: toUTCDate('2021-06-01'),
    },
    initialPoint: toUTCDate('2023-08-01'),
    sliderWidth: 900,
    sliderHeight: 140,
    trackActiveClassName: 'bg-purple-400/20',
    trackBaseClassName: 'bg-gray-300',
    minGapScaleUnits: 2,
    timeUnitSelectionClassName: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
  },
};

export const FixedTRackWidthSlider: Story = {
  render: (args) => <DateSliderTemplate {...args} />,
  args: {
    viewMode: 'range',
    startDate: toUTCDate('2020-10-05'),
    endDate: toUTCDate('2025-11-11'),
    initialTimeUnit: 'month' as TimeUnit,
    initialRange: {
      start: toUTCDate('2021-11-05'),
      end: toUTCDate('2022-01-05'),
    },
    sliderWidth: 'fill',
    isTrackFixedWidth: true,
    sliderHeight: 100,
    trackActiveClassName: 'bg-orange-400/20',
    trackBaseClassName: 'bg-gray-400',
    timeUnitSelectionClassName: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
  },
};

export const CustomStyles: Story = {
  render: (args) => <DateSliderTemplate {...args} />,
  args: {
    viewMode: 'combined',
    startDate: toUTCDate('2020-10-01'),
    endDate: toUTCDate('2025-11-11'),
    initialTimeUnit: 'month' as TimeUnit,
    initialRange: {
      start: toUTCDate('2021-11-05'),
      end: toUTCDate('2022-01-05'),
    },
    initialPoint: toUTCDate('2023-10-10'),
    sliderWidth: 700,
    sliderHeight: 110,
    wrapperClassName: 'rounded-xl shadow-lg bg-white border-2 border-indigo-200',
    sliderClassName:
      'rounded-lg border border-gray-300 bg-gradient-to-r from-indigo-50 to-purple-50',
    trackActiveClassName: 'bg-gradient-to-r from-indigo-400/30 to-purple-400/30',
    trackBaseClassName: 'bg-gray-400 border border-gray-200',
    timeUnitSelectionClassName: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    minGapScaleUnits: 1,
    trackPaddingX: 48,
  },
};

export const YearlyOverview: Story = {
  render: (args) => <DateSliderTemplate {...args} />,
  args: {
    viewMode: 'point',
    startDate: toUTCDate('2000-01-01'),
    endDate: toUTCDate('2030-12-31'),
    initialTimeUnit: 'year' as TimeUnit,
    initialPoint: toUTCDate('2024-01-01'),
    sliderWidth: 800,
    sliderHeight: 100,
    trackActiveClassName: 'bg-rose-400/20',
    trackBaseClassName: 'bg-gray-300',
    timeUnitSelectionClassName: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    scaleUnitConfig: {
      gap: 60,
      width: { short: 1, medium: 1, long: 1 },
      height: { short: 10, medium: 20, long: 40 },
    },
  },
};

export const ScrollableSlider: Story = {
  render: (args) => <DateSliderTemplate {...args} />,
  args: {
    viewMode: 'point',
    startDate: toUTCDate('2020-01-01'),
    endDate: toUTCDate('2024-12-31'),
    initialTimeUnit: 'day' as TimeUnit,
    initialPoint: toUTCDate('2022-06-15'),
    sliderWidth: 600,
    sliderHeight: 80,
    scrollable: true,
    trackActiveClassName: 'bg-teal-400/20',
    trackBaseClassName: 'bg-gray-300',
    timeUnitSelectionClassName: 'bg-gray-300 p-3 rounded-lg border border-indigo-200',
    scaleUnitConfig: {
      gap: 100,
      width: { short: 1, medium: 2, long: 2 },
      height: { short: 18, medium: 36, long: 60 },
    },
  },
};

// Frosted glass component wrapper for proper hook usage
const FrostedGlassTemplate = (args: Partial<SliderProps>) => {
  const [_, setSelection] = useState<SelectionResult>();

  const handleSelect = useCallback((newSelection: SelectionResult) => {
    setSelection(newSelection);
  }, []);

  const startDate = args.startDate ?? toUTCDate('2020-01-01');
  const endDate = args.endDate ?? toUTCDate('2020-02-10');
  const date = args.initialPoint ?? toUTCDate('2020-01-15');

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
        viewMode="point"
        initialTimeUnit="day"
        granularity="day"
        startDate={startDate}
        endDate={endDate}
        initialPoint={date}
        pointHandleIcon={<Triangle className="text-slate-700 fill-slate-700" size={24} />}
        sliderClassName="frosted"
        timeUnitSelectionClassName="frosted"
        timeDisplayClassName="frosted"
        trackActiveClassName="hidden"
        onChange={handleSelect}
        scrollable
        scaleUnitConfig={{
          gap: 100,
          width: { short: 1, medium: 2, long: 2 },
          height: { short: 18, medium: 36, long: 60 },
        }}
        sliderHeight={64}
        sliderWidth="fill"
        withEndLabel={false}
        timeUnitSelectionEnabled={false}
        timeDisplayEnabled
        {...args}
      />
    </div>
  );
};

export const FrostedGlass: Story = {
  render: (args) => <FrostedGlassTemplate {...args} />,
  args: {
    viewMode: 'point',
    startDate: toUTCDate('2020-01-01'),
    endDate: toUTCDate('2020-02-10'),
    initialTimeUnit: 'day' as TimeUnit,
    initialPoint: toUTCDate('2020-01-15'),
    timeUnitSelectionEnabled: true,
  },
};
