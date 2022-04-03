import { IBreeder, IUser } from '@cig-platform/types'

export interface IDecodedToken {
  breeders: IBreeder[];
  email: IUser['email'];
  id: IUser['id'];
  name: IUser['name'];
  registerType: IUser['registerType'];
}
