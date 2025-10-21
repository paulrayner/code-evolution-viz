/**
 * LRU (Least Recently Used) Cache
 * Simple implementation for caching keyframes with automatic eviction
 */
export class LRUCache {
    constructor(maxSize) {
        this.maxSize = maxSize;
        this.cache = new Map();
        this.accessOrder = [];
    }
    /**
     * Get value from cache
     * Updates access order
     */
    get(key) {
        const value = this.cache.get(key);
        if (value !== undefined) {
            // Move to end (most recently used)
            this.updateAccessOrder(key);
        }
        return value;
    }
    /**
     * Set value in cache
     * Evicts least recently used item if cache is full
     */
    set(key, value) {
        // If key exists, update it
        if (this.cache.has(key)) {
            this.cache.set(key, value);
            this.updateAccessOrder(key);
            return;
        }
        // If cache is full, evict least recently used
        if (this.cache.size >= this.maxSize) {
            const lruKey = this.accessOrder.shift();
            if (lruKey !== undefined) {
                this.cache.delete(lruKey);
            }
        }
        // Add new entry
        this.cache.set(key, value);
        this.accessOrder.push(key);
    }
    /**
     * Check if key exists in cache
     */
    has(key) {
        return this.cache.has(key);
    }
    /**
     * Get cache size
     */
    size() {
        return this.cache.size;
    }
    /**
     * Clear cache
     */
    clear() {
        this.cache.clear();
        this.accessOrder = [];
    }
    /**
     * Update access order by moving key to end
     */
    updateAccessOrder(key) {
        const index = this.accessOrder.indexOf(key);
        if (index !== -1) {
            this.accessOrder.splice(index, 1);
        }
        this.accessOrder.push(key);
    }
}
