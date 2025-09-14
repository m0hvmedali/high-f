import MiniSearch from 'minisearch';

export interface SearchDoc { id: string; title: string; body?: string; type: 'lesson' | 'subject' | 'quiz' }

export class SearchService {
  private mini: MiniSearch<SearchDoc>;
  constructor(docs: SearchDoc[] = []) {
    this.mini = new MiniSearch({ fields: ['title', 'body'], storeFields: ['title', 'type'] });
    if (docs.length) this.addAll(docs);
  }
  addAll(docs: SearchDoc[]) { this.mini.addAll(docs); }
  search(q: string) { return this.mini.search(q); }
}
