
import { createContext } from 'react';
import { ToChangeCurrentUserType, UserType } from '../types';


type AppContextType =
	| {
			toChangeCurrentUser: ToChangeCurrentUserType;
			currentUser: UserType;
			allUsers: Array<UserType>;
	  }
	| any;

export const AppContext = createContext<AppContextType | null>(null);