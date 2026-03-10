import { useRef, useState } from 'react';
import { View, ScrollView, Linking, ScrollView as RNScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography, Avatar, Button, Badge, ScrollToTop } from '@/components';
import { AUTHOR } from '@/constants/author';

export default function AboutMeScreen() {
  const scrollRef = useRef<RNScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  return (
    <View className="flex-1">
      <ScrollView
        ref={scrollRef}
        onScroll={(e) => setShowScrollTop(e.nativeEvent.contentOffset.y > 300)}
        scrollEventThrottle={16}
        className="flex-1"
        contentContainerClassName="p-4 pb-8 max-w-3xl mx-auto w-full gap-6"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Page header */}
        <View>
          <Typography variant="h2" className="text-white">
            Meet Jim
          </Typography>
          <Typography variant="body" className="text-white/60 mt-1">
            Get to know the engineer behind this showcase.
          </Typography>
        </View>

        {/* Author card */}
        <View className="bg-white/5 border border-white/15 rounded-xl p-5">
          <View className="flex-row items-center">
            <Avatar name={AUTHOR.name} size="lg" />
            <View className="ml-4">
              <Typography variant="h3" className="text-white">
                {AUTHOR.name}
              </Typography>
              <Typography variant="caption" className="text-white/60 whitespace">
                {AUTHOR.title}
              </Typography>
            </View>
          </View>

          <Typography variant="body" className="text-white/60 mt-4">
            {AUTHOR.coverLetter}
          </Typography>

          {/* Tech tags */}
          <View className="flex-row flex-wrap gap-2 mt-4">
            {AUTHOR.techTags.map((tag) => (
              <Badge key={tag} type="info" label={tag} />
            ))}
          </View>

          {/* Contact links */}
          <View className="flex-row flex-wrap gap-3 mt-4">
            {AUTHOR.links.map((link) => (
              <Button
                key={link.label}
                variant="outlined"
                icon={link.icon as keyof typeof MaterialIcons.glyphMap}
                label={link.label}
                onPress={() => Linking.openURL(link.url)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <ScrollToTop scrollRef={scrollRef} visible={showScrollTop} />
    </View>
  );
}
