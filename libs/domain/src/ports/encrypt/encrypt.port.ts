export interface IEncrypt {
	hash(plainText: string): Promise<string>
	compare(plainText: string, hash: string): Promise<boolean>
}
