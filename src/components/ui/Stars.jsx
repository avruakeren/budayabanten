import { StarIcon } from '../Icons';

export function Stars({ value = 0, max = 3, size = 'h-4 w-4', className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${value} dari ${max} bintang`}>
      {Array.from({ length: max }).map((_, index) => (
        <StarIcon
          key={index}
          className={`${size} ${index < value ? 'text-accent' : 'text-line'}`}
        />
      ))}
    </span>
  );
}
