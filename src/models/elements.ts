export interface StringObjMap {
  [key: string]: string;
}

export interface ElementNodeType {
  id: string;
  title: string;
  to?: string;
  options?: string[];
  __typename: string;
}
