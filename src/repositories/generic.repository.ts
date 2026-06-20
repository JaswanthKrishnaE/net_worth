export type BaseEntity = {
  id: number;
  name: string;
};

export class GenericRepository<T extends BaseEntity> {
  constructor(private table: any) {}

  async getAll(): Promise<T[]> {
    return this.table.getAll();
  }

  async getById(id: number): Promise<T | null> {
    return this.table.getById(id);
  }

  async create(name: string): Promise<T> {
    return this.table.create({
      name,
    });
  }

  async update(id: number, name: string): Promise<void> {
    await this.table.update(id, { name });
  }

  async delete(id: number): Promise<void> {
    await this.table.delete(id);
  }
}