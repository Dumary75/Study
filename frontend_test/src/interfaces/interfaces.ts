
export interface User {
  id: number;
  name: string;
}

export interface Profil {
  id: number;
  name: string;
  profilePictureUrl: string;
}

export interface MyListItem {
  id: number;
  title: string;
  imageUrl: string | null;
}
