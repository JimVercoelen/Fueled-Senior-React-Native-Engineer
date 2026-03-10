import React from 'react';
import { View, Pressable, FlatList } from 'react-native';
import clsx from 'clsx';
import Divider from '../ui/Divider';

interface ListItem {
  id: string;
  content: React.ReactNode;
}

interface ListProps {
  items: ListItem[];
  onItemPress?: (id: string) => void;
  className?: string;
  divider?: boolean;
}

export default function List({ items, onItemPress, className, divider = true }: ListProps) {
  const renderItem = ({ item }: { item: ListItem }) => {
    if (onItemPress) {
      return (
        <Pressable onPress={() => onItemPress(item.id)} className="px-4 py-3">
          {item.content}
        </Pressable>
      );
    }

    return <View className="px-4 py-3">{item.content}</View>;
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ItemSeparatorComponent={divider ? () => <Divider /> : undefined}
      scrollEnabled={false}
      className={clsx(className)}
    />
  );
}
