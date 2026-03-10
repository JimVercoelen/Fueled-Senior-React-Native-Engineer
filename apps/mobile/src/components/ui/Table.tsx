import React from 'react';
import { View } from 'react-native';
import clsx from 'clsx';
import Typography from './Typography';

interface TableProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

export default function Table({ headers, rows, className }: TableProps) {
  return (
    <View className={clsx('border border-white/15 rounded-2xl overflow-hidden', className)}>
      {/* Header row */}
      <View className="flex-row bg-white/5 px-4 py-3 border-b border-white/15">
        {headers.map((header, index) => (
          <View key={index} className="flex-1">
            <Typography variant="label" className="text-white">
              {header}
            </Typography>
          </View>
        ))}
      </View>

      {/* Data rows */}
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className={clsx(
            'flex-row px-4 py-3',
            rowIndex < rows.length - 1 && 'border-b border-white/10',
          )}
        >
          {row.map((cell, cellIndex) => (
            <View key={cellIndex} className="flex-1">
              {typeof cell === 'string' ? <Typography variant="body">{cell}</Typography> : cell}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
