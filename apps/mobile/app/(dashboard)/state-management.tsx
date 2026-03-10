import React, { useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';

import Typography from '@/components/ui/Typography';
import Badge from '@/components/ui/Badge';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { useCacheEntries } from '@/hooks/use-cache-entries';
import type { CacheEntry } from '@/hooks/use-cache-entries';

function formatQueryKey(queryKey: unknown[]): string {
  return queryKey
    .map((part) => {
      if (typeof part === 'string') return part;
      if (typeof part === 'object' && part !== null) {
        return Object.entries(part as Record<string, unknown>)
          .map(([k, v]) => `${k}:${JSON.stringify(v)}`)
          .join(' ');
      }
      return String(part);
    })
    .join(' > ');
}

function formatRelativeTime(timestamp: number): string {
  if (!timestamp) return 'never';
  const diff = Math.floor((Date.now() - timestamp) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

function truncateJson(data: unknown): string {
  if (data === undefined) return 'undefined';
  const json = JSON.stringify(data, null, 2);
  if (json.length > 500) return json.slice(0, 500) + '\n...';
  return json;
}

function statusBadgeType(status: string): 'success' | 'info' | 'error' {
  if (status === 'success') return 'success';
  if (status === 'error') return 'error';
  return 'info';
}

function StatsBar({ entries }: { entries: CacheEntry[] }) {
  const successCount = entries.filter((e) => e.status === 'success').length;
  const pendingCount = entries.filter((e) => e.status === 'pending').length;
  const errorCount = entries.filter((e) => e.status === 'error').length;

  return (
    <View className="flex-row flex-wrap gap-3 mb-6">
      <View className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex-1 min-w-[100px]">
        <Typography variant="caption" className="text-white/40">
          Total
        </Typography>
        <Typography variant="h3" className="text-white">
          {entries.length}
        </Typography>
      </View>
      <View className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex-1 min-w-[100px]">
        <Typography variant="caption" className="text-emerald-400/60">
          Success
        </Typography>
        <Typography variant="h3" className="text-emerald-400">
          {successCount}
        </Typography>
      </View>
      <View className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex-1 min-w-[100px]">
        <Typography variant="caption" className="text-blue-400/60">
          Pending
        </Typography>
        <Typography variant="h3" className="text-blue-400">
          {pendingCount}
        </Typography>
      </View>
      <View className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 flex-1 min-w-[100px]">
        <Typography variant="caption" className="text-red-400/60">
          Error
        </Typography>
        <Typography variant="h3" className="text-red-400">
          {errorCount}
        </Typography>
      </View>
    </View>
  );
}

function CacheEntryCard({ entry }: { entry: CacheEntry }) {
  return (
    <View className="bg-white/5 border border-white/15 rounded-2xl p-4 mb-3">
      {/* Header: query key + status badge */}
      <View className="flex-row items-start justify-between mb-2 flex-wrap gap-2">
        <View className="flex-1 min-w-[150px]">
          <Typography variant="body" className="text-white font-body-semibold">
            {formatQueryKey(entry.queryKey)}
          </Typography>
        </View>
        <Badge type={statusBadgeType(entry.status)} label={entry.status} />
      </View>

      {/* Last updated */}
      <Typography variant="caption" className="text-white/40 mb-3">
        Last updated: {formatRelativeTime(entry.dataUpdatedAt)}
      </Typography>

      {/* Data preview */}
      <View
        className="bg-black/50 border border-white/10 rounded-xl p-3"
        style={{ maxHeight: 200, overflow: 'hidden' }}
      >
        <ScrollView nestedScrollEnabled style={{ maxHeight: 180 }}>
          <Typography
            variant="caption"
            className="text-neutral-400"
            style={{ fontFamily: 'monospace' }}
          >
            {truncateJson(entry.data)}
          </Typography>
        </ScrollView>
      </View>
    </View>
  );
}

export default function StateManagementScreen() {
  const entries = useCacheEntries();
  const scrollRef = useRef<ScrollView>(null);
  const [showTop, setShowTop] = useState(false);

  return (
    <View className="flex-1" style={{ backgroundColor: 'transparent' }}>
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerClassName="px-4 py-6 pb-20 max-w-3xl mx-auto w-full"
        style={{ backgroundColor: 'transparent' }}
        onScroll={(e) => setShowTop(e.nativeEvent.contentOffset.y > 300)}
        scrollEventThrottle={16}
      >
        {/* Title */}
        <Typography variant="h2">State Management</Typography>
        <Typography variant="body" className="text-neutral-400 mt-2 mb-6">
          Live TanStack Query cache viewer -- read-only snapshot of current app state
        </Typography>

        {entries.length > 0 ? (
          <>
            <StatsBar entries={entries} />
            {entries.map((entry, index) => (
              <CacheEntryCard key={index} entry={entry} />
            ))}
          </>
        ) : (
          <View className="items-center py-16">
            <Typography variant="body" className="text-white/40 text-center">
              No cache entries yet. Navigate to Data Fetching to populate the cache.
            </Typography>
          </View>
        )}
      </ScrollView>
      <ScrollToTop scrollRef={scrollRef} visible={showTop} />
    </View>
  );
}
