export interface IDatabaseAdapterService {
  getItemsFromCollection<DocumentType>(
    collectionName: string,
    query: Record<string, unknown>
  ): Promise<Array<DocumentType>>

  upsertItemInCollection<DocumentType>(
    item: DocumentType,
    collectionName: string,
    query?: Record<string, unknown>
  ): Promise<void>
}
