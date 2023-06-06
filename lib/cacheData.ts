import { LRUCache } from 'lru-cache';

// Create an instance of the cache
const cacheOptions = ({
  max: 100, // Maximum number of entries to cache
  
  ttl: 1000 * 60 * 10, // Time-to-live (TTL) in milliseconds (10 mins)
  allowStale: false,
});

const cache = new LRUCache(cacheOptions)
export default cache;
