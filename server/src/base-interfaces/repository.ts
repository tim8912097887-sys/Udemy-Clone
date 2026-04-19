export interface IBaseRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | null>;
    create(data: T): Promise<T>;
    update(id: string, data: T): Promise<T | null>;
    delete(id: string): Promise<void>;
}

export interface IAuthRepository<T> extends IBaseRepository<T> {
    findByEmail(email: string): Promise<T | null>;
}
