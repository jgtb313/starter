export interface IEncryptAdapter {
	hash(plainText: string): Promise<string>
	compare(plainText: string, hash: string): Promise<boolean>
}
