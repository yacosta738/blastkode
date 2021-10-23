export interface ITech {
  id?: string;
  name?: string;
  icon?: { type: string; value: string } | string;
  url?: string;
}

export default class Tech implements ITech {
  constructor(
    public id?: string,
    public name?: string,
    public icon?: { type: string; value: string } | string,
    public url?: string
  ) {}
}
