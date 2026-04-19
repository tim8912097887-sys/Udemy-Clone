import mongoose from 'mongoose';
import { logger } from '#configs/logger.js';
import { IBaseRepository } from '#base-interfaces/repository.js';

export class BaseRepository<T> implements IBaseRepository<T> {
    protected readonly logger = logger;
    constructor(protected readonly db: mongoose.Model<T>) {}

    async create(data: T): Promise<T> {
        return this.db.create(data);
    }

    async update(id: string, data: Partial<T>): Promise<T | null> {
        return this.db.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<void> {
        await this.db.findByIdAndDelete(id);
    }

    async findById(id: string): Promise<T | null> {
        return this.db.findById(id).lean().exec();
    }

    async findAll(): Promise<T[]> {
        return this.db.find().lean().exec();
    }
}
