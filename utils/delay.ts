export const delay = (fn: () => void, delay = 300): void => {
  const timer = setTimeout(() => {
    fn();
    clearTimeout(timer);
  }, delay);
};
