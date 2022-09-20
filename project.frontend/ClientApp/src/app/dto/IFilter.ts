export interface IFilter<T> {
  transform(element: T[], filterText: string): T[];
}
