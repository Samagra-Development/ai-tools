export type UserType = {
	name: string;
	number: string;
	active: boolean;
	id?: string;
	botUuid?: string;
	startingMessage?: string;
};

export type ToChangeCurrentUserType = (arg: User) => void;