import type { DateSliderClassNames } from './type';

/**
 * Pre-configured style presets for DateSlider component.
 * Each preset provides a complete, production-ready design theme.
 *
 * @example
 * ```tsx
 * import { DateSlider, dateSliderPresets } from 'date-slider-lib';
 *
 * <DateSlider classNames={dateSliderPresets.glass} {...otherProps} />
 * ```
 */

/**
 * Default preset - Clean blue theme with subtle transparency
 */
export const defaultPreset: DateSliderClassNames = {
  wrapper: 'bg-white/90 backdrop-blur-sm rounded-2xl shadow-md',
  slider: 'bg-gray-50/50',
  track: 'bg-gray-200 rounded-full',
  trackActive: 'bg-blue-500/30 rounded-full',
  handle: 'bg-white border-2 border-blue-500 shadow-lg hover:shadow-xl',
  handlePoint: 'bg-blue-500 border-blue-600',
  handleStart: 'bg-blue-500 border-blue-600',
  handleEnd: 'bg-blue-500 border-blue-600',
  handleDragging: 'scale-125 shadow-2xl',
  dateLabel: 'bg-blue-600 text-white text-sm px-3 py-1.5 rounded-lg shadow-md',
  dateLabelText: 'font-medium',
  cursorLine: 'bg-blue-500/50',
  scaleMark: 'bg-gray-400',
  scaleMarkMajor: 'bg-gray-600',
  scaleMarkMedium: 'bg-gray-500',
  scaleMarkMinor: 'bg-gray-400',
  scaleLabel: 'text-gray-700 font-medium text-xs',
  timeUnitSelector: 'bg-gray-100 border-l border-gray-300',
  timeUnitButton: 'hover:bg-gray-200',
  timeUnitText: 'text-gray-700 font-semibold',
  timeDisplay: 'bg-gray-100 rounded-xl border border-gray-300',
  timeDisplayText: 'text-gray-700 font-semibold',
};

/**
 * Glass preset - Modern glassmorphism design with frosted glass effect
 */
export const glassPreset: DateSliderClassNames = {
  wrapper: 'backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl',
  slider: 'backdrop-blur-md bg-white/5',
  track: 'bg-white/20 rounded-full backdrop-blur-sm',
  trackActive: 'bg-gradient-to-r from-purple-400/40 to-pink-400/40 rounded-full backdrop-blur-md',
  handle: 'bg-white/80 backdrop-blur-lg border-2 border-white/40 shadow-xl',
  handlePoint: 'bg-gradient-to-br from-purple-400 to-pink-400 border-white/60',
  handleStart: 'bg-gradient-to-br from-purple-400 to-pink-400 border-white/60',
  handleEnd: 'bg-gradient-to-br from-purple-400 to-pink-400 border-white/60',
  handleDragging: 'scale-125 shadow-2xl ring-4 ring-white/30',
  dateLabel:
    'bg-white/20 backdrop-blur-xl text-white border border-white/30 px-4 py-2 rounded-xl shadow-lg',
  dateLabelText: 'font-semibold drop-shadow-lg',
  cursorLine: 'bg-white/60 backdrop-blur-sm',
  scaleMark: 'bg-white/30',
  scaleMarkMajor: 'bg-white/50',
  scaleMarkMedium: 'bg-white/40',
  scaleMarkMinor: 'bg-white/30',
  scaleLabel: 'text-white/90 font-medium text-xs drop-shadow-md',
  timeUnitSelector: 'backdrop-blur-xl bg-white/10 border-l border-white/20',
  timeUnitButton: 'hover:bg-white/20',
  timeUnitText: 'text-white/90 font-bold drop-shadow-md',
  timeDisplay: 'backdrop-blur-xl bg-white/10 rounded-xl border border-white/20',
  timeDisplayText: 'text-white font-semibold drop-shadow-md',
};

/**
 * Minimal preset - Clean monochrome design for professional applications
 */
export const minimalPreset: DateSliderClassNames = {
  wrapper: 'bg-white rounded-lg border border-gray-200',
  slider: 'bg-gray-50',
  track: 'bg-gray-200',
  trackActive: 'bg-gray-900',
  handle: 'bg-white border-2 border-gray-900 shadow-md',
  handlePoint: 'bg-gray-900',
  handleStart: 'bg-gray-900',
  handleEnd: 'bg-gray-900',
  handleDragging: 'scale-110',
  dateLabel: 'bg-gray-900 text-white text-xs px-2.5 py-1 rounded',
  dateLabelText: 'font-mono',
  cursorLine: 'bg-gray-400',
  scaleMark: 'bg-gray-300',
  scaleMarkMajor: 'bg-gray-800',
  scaleMarkMedium: 'bg-gray-600',
  scaleMarkMinor: 'bg-gray-400',
  scaleLabel: 'text-gray-600 font-mono text-[10px] uppercase tracking-wide',
  timeUnitSelector: 'bg-gray-50 border-l border-gray-200',
  timeUnitButton: 'hover:bg-gray-100',
  timeUnitText: 'text-gray-900 font-mono uppercase tracking-wider',
  timeDisplay: 'bg-gray-50 rounded-lg border border-gray-200',
  timeDisplayText: 'text-gray-900 font-mono',
};

/**
 * Vibrant preset - Bold gradients and vibrant colors for eye-catching designs
 */
export const vibrantPreset: DateSliderClassNames = {
  wrapper:
    'bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-xl border-2 border-pink-200',
  slider: 'bg-gradient-to-r from-pink-50/50 to-purple-50/50',
  track: 'bg-gradient-to-r from-pink-200 to-purple-200 rounded-full',
  trackActive: 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full shadow-lg',
  handle:
    'bg-gradient-to-br from-pink-500 to-purple-600 border-2 border-white shadow-xl text-white',
  handlePoint: 'from-pink-600 to-purple-700',
  handleStart: 'from-pink-600 to-purple-700',
  handleEnd: 'from-indigo-600 to-purple-700',
  handleDragging: 'scale-125 shadow-2xl ring-4 ring-pink-300',
  dateLabel:
    'bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 rounded-xl shadow-lg font-bold',
  dateLabelText: 'drop-shadow-md',
  cursorLine: 'bg-gradient-to-b from-pink-500 to-purple-500',
  scaleMark: 'bg-gradient-to-b from-pink-300 to-purple-300',
  scaleMarkMajor: 'bg-gradient-to-b from-pink-600 to-purple-600',
  scaleMarkMedium: 'bg-gradient-to-b from-pink-500 to-purple-500',
  scaleMarkMinor: 'bg-gradient-to-b from-pink-400 to-purple-400',
  scaleLabel: 'text-purple-700 font-bold text-xs',
  timeUnitSelector: 'bg-gradient-to-b from-pink-100 to-purple-100 border-l border-pink-300',
  timeUnitButton: 'hover:bg-pink-200',
  timeUnitText: 'text-purple-700 font-bold',
  timeDisplay: 'bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl border-2 border-pink-300',
  timeDisplayText: 'text-purple-700 font-bold',
};

/**
 * Corporate preset - Professional brand colors suitable for business applications
 */
export const corporatePreset: DateSliderClassNames = {
  wrapper: 'bg-white rounded-xl shadow-lg border border-slate-200',
  slider: 'bg-slate-50',
  track: 'bg-slate-200 rounded-sm',
  trackActive: 'bg-indigo-600 rounded-sm',
  handle: 'bg-white border-2 border-indigo-600 shadow-md',
  handlePoint: 'bg-indigo-600',
  handleStart: 'bg-indigo-600',
  handleEnd: 'bg-indigo-700',
  handleDragging: 'scale-110 shadow-xl',
  dateLabel: 'bg-indigo-600 text-white px-3 py-1.5 rounded-md shadow-md font-medium',
  dateLabelText: 'tracking-wide',
  cursorLine: 'bg-indigo-500',
  scaleMark: 'bg-slate-300',
  scaleMarkMajor: 'bg-indigo-600',
  scaleMarkMedium: 'bg-indigo-500',
  scaleMarkMinor: 'bg-slate-400',
  scaleLabel: 'text-slate-600 font-semibold text-xs uppercase tracking-wide',
  timeUnitSelector: 'bg-slate-100 border-l border-slate-300',
  timeUnitButton: 'hover:bg-slate-200',
  timeUnitText: 'text-indigo-700 font-semibold uppercase tracking-wide',
  timeDisplay: 'bg-slate-100 rounded-lg border border-slate-300',
  timeDisplayText: 'text-indigo-700 font-semibold',
};

/**
 * Dark preset - Dark mode optimized design with high contrast
 */
export const darkPreset: DateSliderClassNames = {
  wrapper: 'bg-gray-900 rounded-2xl shadow-2xl border border-gray-700',
  slider: 'bg-gray-800',
  track: 'bg-gray-700 rounded-full',
  trackActive: 'bg-emerald-500/40 rounded-full shadow-lg shadow-emerald-500/20',
  handle: 'bg-gray-800 border-2 border-emerald-500 shadow-xl shadow-emerald-500/30',
  handlePoint: 'bg-emerald-500 border-emerald-400',
  handleStart: 'bg-emerald-500 border-emerald-400',
  handleEnd: 'bg-emerald-500 border-emerald-400',
  handleDragging: 'scale-125 shadow-2xl ring-4 ring-emerald-500/30',
  dateLabel: 'bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-xl font-semibold',
  dateLabelText: 'tracking-wide',
  cursorLine: 'bg-emerald-500/60',
  scaleMark: 'bg-gray-600',
  scaleMarkMajor: 'bg-emerald-500',
  scaleMarkMedium: 'bg-gray-500',
  scaleMarkMinor: 'bg-gray-600',
  scaleLabel: 'text-gray-300 font-medium text-xs',
  timeUnitSelector: 'bg-gray-800 border-l border-gray-700',
  timeUnitButton: 'hover:bg-gray-700',
  timeUnitText: 'text-emerald-400 font-bold',
  timeDisplay: 'bg-gray-800 rounded-xl border border-gray-700',
  timeDisplayText: 'text-emerald-400 font-semibold',
};

/**
 * Collection of all available presets
 */
export const dateSliderPresets = {
  default: defaultPreset,
  glass: glassPreset,
  minimal: minimalPreset,
  vibrant: vibrantPreset,
  corporate: corporatePreset,
  dark: darkPreset,
} as const;

/**
 * Type for preset names
 */
export type DateSliderPresetName = keyof typeof dateSliderPresets;
