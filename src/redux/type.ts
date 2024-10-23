// Types
interface Geo {
  lat: string;
  lng: string;
}
interface Adress {
  street: string;
  suite: string;
  city: string;
}
interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Adress;
  phone: string;
}
