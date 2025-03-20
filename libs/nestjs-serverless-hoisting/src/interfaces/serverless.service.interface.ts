export interface IServerlessService<T extends {}, K> {
  execute(input: T): Promise<K> | K
}
