export function randomCity(array: readonly string[]): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
