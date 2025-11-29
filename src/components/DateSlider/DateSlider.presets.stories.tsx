import type { Meta, StoryObj } from '@storybook/react';
import { Circle, MoveHorizontal } from 'lucide-react';
import { memo, useCallback, useState } from 'react';

import { DateSlider } from './DateSlider';
import {
  corporatePreset,
  darkPreset,
  dateSliderPresets,
  defaultPreset,
  glassPreset,
  minimalPreset,
  vibrantPreset,
} from './presets';
import type { SelectionResult, SliderProps, TimeUnit } from './type';
import { toUTCDate } from './utils';

const meta: Meta<typeof DateSlider> = {
  title: 'Components/DateSlider/Presets',
  component: DateSlider,
  parameters: {
    docs: {
      description: {
        component:
          'Pre-configured style presets for DateSlider. Each preset provides a complete, production-ready design theme that can be used directly or extended with custom classNames.',
      },
    },
  },
};

export default meta;

type PresetStoryArgs = Partial<SliderProps> & {
  background?: string;
  title?: string;
  description?: string;
};

type Story = StoryObj<PresetStoryArgs>;

// Memoized selection display component
const SelectionDisplay = memo(({ selection }: { selection?: SelectionResult }) => {
  if (!selection) return null;
  let result = '';
  if ('range' in selection && 'point' in selection) {
    result = `start: ${selection.range.start.toLocaleDateString()}\nend: ${selection.range.end.toLocaleDateString()}\npoint: ${selection.point.toLocaleDateString()}`;
  } else if ('range' in selection) {
    result = `start: ${selection.range.start.toLocaleDateString()}\nend: ${selection.range.end.toLocaleDateString()}`;
  } else if ('point' in selection) {
    result = `point: ${selection.point.toLocaleDateString()}`;
  }
  return (
    <div style={{ marginTop: 16 }}>
      <pre
        style={{
          backgroundColor: 'rgba(0,0,0,0.05)',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '11px',
          fontFamily: 'monospace',
        }}
      >
        {result}
      </pre>
    </div>
  );
});

SelectionDisplay.displayName = 'SelectionDisplay';

// Template for preset stories
const PresetTemplate = (args: PresetStoryArgs) => {
  const [selection, setSelection] = useState<SelectionResult>();

  const handleSelectionChange = useCallback((newSelection: SelectionResult) => {
    setSelection(newSelection);
  }, []);

  return (
    <div
      style={{
        padding: 40,
        background: args.background || '#f5f7fa',
        minHeight: 400,
        borderRadius: '12px',
      }}
    >
      {args.title && (
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>{args.title}</h3>
          {args.description && (
            <p style={{ margin: '8px 0 0', fontSize: 14, opacity: 0.7 }}>{args.description}</p>
          )}
        </div>
      )}

      <DateSlider
        {...args}
        startDate={args.startDate ?? toUTCDate('2020-01-01')}
        endDate={args.endDate ?? toUTCDate('2025-12-31')}
        viewMode={args.viewMode ?? 'range'}
        initialTimeUnit={args.initialTimeUnit ?? 'month'}
        onChange={handleSelectionChange}
        pointHandleIcon={<Circle size={20} />}
        rangeHandleIcon={<MoveHorizontal size={20} />}
      />

      <SelectionDisplay selection={selection} />
    </div>
  );
};

/**
 * Default preset - Clean blue theme with subtle transparency
 */
export const Default: Story = {
  render: (args) => <PresetTemplate {...args} />,
  args: {
    viewMode: 'range',
    initialRange: {
      start: toUTCDate('2022-03-01'),
      end: toUTCDate('2022-09-01'),
    },
    sliderWidth: 800,
    sliderHeight: 120,
    classNames: defaultPreset,
    title: 'Default Preset',
    description: 'Clean blue theme with subtle transparency - perfect for general use',
  },
};

/**
 * Glass preset - Modern glassmorphism design with frosted glass effect
 */
export const Glass: Story = {
  render: (args) => <PresetTemplate {...args} />,
  args: {
    viewMode: 'point',
    initialPoint: toUTCDate('2023-06-15'),
    sliderWidth: 800,
    sliderHeight: 100,
    classNames: glassPreset,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    title: 'Glass Preset',
    description: 'Modern glassmorphism with frosted glass effect - stunning on gradients',
  },
};

/**
 * Minimal preset - Clean monochrome design for professional applications
 */
export const Minimal: Story = {
  render: (args) => <PresetTemplate {...args} />,
  args: {
    viewMode: 'range',
    initialRange: {
      start: toUTCDate('2021-01-01'),
      end: toUTCDate('2021-06-01'),
    },
    sliderWidth: 800,
    sliderHeight: 100,
    classNames: minimalPreset,
    background: '#ffffff',
    title: 'Minimal Preset',
    description: 'Clean monochrome design - perfect for professional dashboards',
  },
};

/**
 * Vibrant preset - Bold gradients and vibrant colors for eye-catching designs
 */
export const Vibrant: Story = {
  render: (args) => <PresetTemplate {...args} />,
  args: {
    viewMode: 'combined',
    initialRange: {
      start: toUTCDate('2022-01-01'),
      end: toUTCDate('2022-06-01'),
    },
    initialPoint: toUTCDate('2023-03-15'),
    sliderWidth: 900,
    sliderHeight: 130,
    classNames: vibrantPreset,
    background: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
    title: 'Vibrant Preset',
    description: 'Bold gradients and vibrant colors - great for creative applications',
  },
};

/**
 * Corporate preset - Professional brand colors suitable for business applications
 */
export const Corporate: Story = {
  render: (args) => <PresetTemplate {...args} />,
  args: {
    viewMode: 'range',
    initialRange: {
      start: toUTCDate('2023-01-01'),
      end: toUTCDate('2023-03-31'),
    },
    sliderWidth: 800,
    sliderHeight: 110,
    classNames: corporatePreset,
    background: '#f8fafc',
    title: 'Corporate Preset',
    description: 'Professional brand colors - ideal for business applications',
  },
};

/**
 * Dark preset - Dark mode optimized design with high contrast
 */
export const Dark: Story = {
  render: (args) => <PresetTemplate {...args} />,
  args: {
    viewMode: 'point',
    initialPoint: toUTCDate('2024-01-15'),
    sliderWidth: 800,
    sliderHeight: 100,
    classNames: darkPreset,
    background: '#0f172a',
    title: 'Dark Preset',
    description: 'Dark mode optimized with high contrast - perfect for dark interfaces',
  },
};

/**
 * Gallery view showing all presets side by side
 */
export const AllPresets: Story = {
  render: () => {
    const presets = [
      { name: 'Default', preset: dateSliderPresets.default, bg: '#f5f7fa' },
      {
        name: 'Glass',
        preset: dateSliderPresets.glass,
        bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      { name: 'Minimal', preset: dateSliderPresets.minimal, bg: '#ffffff' },
      {
        name: 'Vibrant',
        preset: dateSliderPresets.vibrant,
        bg: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
      },
      { name: 'Corporate', preset: dateSliderPresets.corporate, bg: '#f8fafc' },
      { name: 'Dark', preset: dateSliderPresets.dark, bg: '#0f172a' },
    ];

    return (
      <div style={{ padding: 24, background: '#f0f0f0' }}>
        <h2 style={{ marginTop: 0, marginBottom: 32, fontSize: 24, fontWeight: 700 }}>
          All DateSlider Presets
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: 24,
          }}
        >
          {presets.map(({ name, preset, bg }) => (
            <div key={name} style={{ background: bg, padding: 24, borderRadius: 12 }}>
              <h3
                style={{
                  marginTop: 0,
                  marginBottom: 16,
                  fontSize: 16,
                  fontWeight: 600,
                  color: name === 'Dark' ? '#fff' : '#000',
                }}
              >
                {name}
              </h3>
              <DateSlider
                viewMode="range"
                startDate={toUTCDate('2020-01-01')}
                endDate={toUTCDate('2025-12-31')}
                initialTimeUnit={'month' as TimeUnit}
                initialRange={{
                  start: toUTCDate('2022-03-01'),
                  end: toUTCDate('2022-09-01'),
                }}
                sliderWidth="fill"
                sliderHeight={80}
                classNames={preset}
                onChange={() => {}}
                pointHandleIcon={<Circle size={16} />}
                rangeHandleIcon={<MoveHorizontal size={16} />}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// Component for ExtendingPresets story
const ExtendingPresetsComponent = () => {
  const [selection, setSelection] = useState<SelectionResult>();

  return (
    <div style={{ padding: 40, background: '#f5f7fa', minHeight: 400 }}>
      <div style={{ marginBottom: 24 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>Extending Presets</h3>
        <p style={{ margin: '8px 0 0', fontSize: 14, opacity: 0.7 }}>
          You can extend any preset with custom classNames using the spread operator
        </p>
      </div>

      <div style={{ background: 'white', padding: 24, borderRadius: 12, marginBottom: 16 }}>
        <code
          style={{
            fontSize: 13,
            fontFamily: 'monospace',
            display: 'block',
            whiteSpace: 'pre',
            background: '#f8f9fa',
            padding: 16,
            borderRadius: 8,
          }}
        >
          {`<DateSlider
  classNames={{
    ...dateSliderPresets.glass,
    // Override specific properties
    trackActive: 'bg-gradient-to-r from-orange-500/40 to-red-500/40',
    handle: 'bg-gradient-to-br from-orange-400 to-red-400',
  }}
/>`}
        </code>
      </div>

      <div
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: 24,
          borderRadius: 12,
        }}
      >
        <DateSlider
          viewMode="range"
          startDate={toUTCDate('2020-01-01')}
          endDate={toUTCDate('2025-12-31')}
          initialTimeUnit={'month' as TimeUnit}
          initialRange={{
            start: toUTCDate('2022-03-01'),
            end: toUTCDate('2022-09-01'),
          }}
          sliderWidth={800}
          sliderHeight={100}
          classNames={{
            ...glassPreset,
            trackActive: 'bg-gradient-to-r from-orange-500/40 to-red-500/40 rounded-full',
            handlePoint: 'bg-gradient-to-br from-orange-400 to-red-400 border-white/60',
            handleStart: 'bg-gradient-to-br from-orange-400 to-red-400 border-white/60',
            handleEnd: 'bg-gradient-to-br from-orange-400 to-red-400 border-white/60',
            dateLabel:
              'bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-2 rounded-xl',
          }}
          onChange={setSelection}
          pointHandleIcon={<Circle size={20} />}
          rangeHandleIcon={<MoveHorizontal size={20} />}
        />
      </div>

      <SelectionDisplay selection={selection} />
    </div>
  );
};

/**
 * Example: Extending a preset with custom styles
 */
export const ExtendingPresets: Story = {
  render: () => <ExtendingPresetsComponent />,
};
