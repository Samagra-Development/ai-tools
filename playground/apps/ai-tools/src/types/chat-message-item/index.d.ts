import { UserType } from "../context";

export type ChatMessageItemPropType = {
  currentUser: UserType;
  message: any;
  onSend: (text: string, aa: null, a3: boolean, currentUser: UserType) => void;
};
