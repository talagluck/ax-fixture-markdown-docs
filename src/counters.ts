export interface Counter {
  name: string;
  total: number;
  events: number;
  lastSeenAt: string;
}

export class CounterStore {
  private counters = new Map<string, Counter>();

  record(name: string, value = 1): Counter {
    const existing = this.counters.get(name);
    const counter: Counter = {
      name,
      total: (existing?.total ?? 0) + value,
      events: (existing?.events ?? 0) + 1,
      lastSeenAt: new Date().toISOString(),
    };
    this.counters.set(name, counter);
    return counter;
  }

  list(prefix?: string): Counter[] {
    return [...this.counters.values()]
      .filter((c) => !prefix || c.name.startsWith(prefix))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  get(name: string): Counter | undefined {
    return this.counters.get(name);
  }

  reset(name: string): boolean {
    return this.counters.delete(name);
  }
}
