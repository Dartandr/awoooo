export interface ICheckbox {
  name: string,
  status: boolean;
  filter?: 'genres' | 'status' | 'types' | 'rating';
}