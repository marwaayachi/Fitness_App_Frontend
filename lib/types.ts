export type User = {
  _id: string;
  name?: string;
  email: string;
};

export type LoginPayload = { email: string; password: string; };
