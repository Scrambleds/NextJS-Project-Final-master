import { clsx, ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Define the cn function for use in JSX
export const cn = (...inputs) => {
  return twMerge(clsx(inputs));
};