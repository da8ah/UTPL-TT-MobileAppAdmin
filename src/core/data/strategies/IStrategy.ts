export default interface IStrategy {
	setApiURL(apiURL: string): void;
	createData(data: Object): Promise<boolean | null>;
	readData(): Promise<Object | [] | null>;
	updateData(dataToSearch: Object, dataToUpdate: Object): Promise<boolean | null>;
	deleteData(data: Object): Promise<boolean | null>;
}
