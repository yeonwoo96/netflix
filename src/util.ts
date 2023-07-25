export function makeImagePath(id: string, format?: string) {
  return `https://www.themoviedb.org/t/p/${format ? format : "original"}/${id}`;
}
