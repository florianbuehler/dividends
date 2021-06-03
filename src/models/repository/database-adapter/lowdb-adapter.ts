import { injectable } from 'inversify'
import * as low from 'lowdb'
import * as FileSync from 'lowdb/adapters/FileSync'
import { IDatabaseAdapterService } from './database-adapter'
import DboStock from '../stock.dbo'

export interface DbSchema {
  stocks: DboStock[]
}

@injectable()
export class LowDbAdapterService implements IDatabaseAdapterService {
  private readonly databaseFile: string

  constructor(databaseFile: string) {
    this.databaseFile = databaseFile
  }

  async getItemsFromCollection<DocumentType>(
    collectionName: string,
    query: Record<string, unknown> = {}
  ): Promise<Array<DocumentType>> {
    const result = this.getCollection(collectionName).filter(query).value()
    return Promise.resolve(result)
  }

  async upsertItemInCollection<DocumentType>(
    item: DocumentType,
    collectionName: string,
    query: Record<string, unknown>
  ): Promise<void> {
    const collection = this.getCollection(collectionName)
    const index = collection.findIndex(query).value()

    const result = index < 0 ? collection.push(item).write() : collection.find(query).assign(item).write()

    return Promise.resolve(result)
  }

  private getCollection<DocumentType>(collectionName: string): any {
    const db = this.getDatabase()
    return db.get(collectionName)
  }

  private getDatabase(): any {
    const adapter = new FileSync<DbSchema>(this.databaseFile)
    return low(adapter)
  }
}
