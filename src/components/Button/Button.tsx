import { cn } from '@/utils';

const sizes = {
  default: 'h-9 px-4 py-2 [&:has(>svg)]:px-3',
  sm: 'h-8 rounded-md gap-1.5 px-3 [&:has(>svg)]:px-2.5',
  lg: 'h-10 rounded-md px-6 [&:has(>svg)]:px-4',
  icon: 'w-9 h-9',
  'icon-only': '',
};
const variants = {
  default: 'bg-blue-600 text-white shadow-sm hover:bg-blue-700',
  destructive: 'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500/20',
  outline: 'border border-gray-200 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900',
  secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200',
  ghost: 'hover:bg-gray-100 hover:text-gray-900',
  link: 'text-blue-600 underline-offset-4 hover:underline',
} as const;

const defaultClassName =
  'cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none  shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-blue-500 focus-visible:ring-blue-500/50 focus-visible:ring-4';

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<'button'> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}) {
  return (
    <button
      data-slot="button"
      className={cn(
        defaultClassName,
        variant ? variants[variant] : '',
        size ? sizes[size] : '',
        className
      )}
      {...props}
    />
  );
}
