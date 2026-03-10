import { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Linking, Image, ScrollView as RNScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography, Button, Badge, ScrollToTop } from '@/components';
import { AUTHOR } from '@/constants/author';

/** Easing function: fast start, smooth deceleration */
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Animates a number from 0 to `to` over `duration` ms on mount */
function CountUp({ to, duration = 1500 }: { to: number; duration?: number }) {
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (to === 0) return;

    const start = performance.now();
    let frameId: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplayed(Math.round(eased * to));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []); // Run once on mount only

  return (
    <Typography variant="h2" className="text-white">
      {displayed}
    </Typography>
  );
}

const jimPhoto = require('../../assets/images/jim-vercoelen.png');

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
        contentContainerClassName="pb-12 max-w-3xl mx-auto w-full"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Hero Section */}
        <View className="items-center pt-12 pb-10 px-6">
          <Typography variant="label" className="text-[#6E5BFF] mb-6">
            Meet the Engineer
          </Typography>

          <Image
            source={jimPhoto}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: '#6E5BFF',
            }}
            resizeMode="cover"
          />

          <Typography variant="h2" className="text-white text-center mt-6 text-2xl">
            {AUTHOR.name}
          </Typography>
          <Typography variant="body" className="text-white/50 text-center mt-2">
            {AUTHOR.title}
          </Typography>

          <View className="mt-6">
            <Button
              variant="contained"
              label="Let's talk"
              icon={'email' as keyof typeof MaterialIcons.glyphMap}
              onPress={() => Linking.openURL('mailto:jim@vecotech.io')}
            />
          </View>
        </View>

        {/* Stats Grid */}
        <View className="px-4 pb-10">
          <View className="flex-row flex-wrap gap-3 justify-center">
            {AUTHOR.stats.map((stat) => (
              <View
                key={stat.label}
                className="bg-white/5 border border-white/10 rounded-xl px-5 py-4"
                style={{ minWidth: '30%', flexGrow: 1 }}
              >
                <View className="flex-row items-center gap-2">
                  <MaterialIcons
                    name={stat.icon as keyof typeof MaterialIcons.glyphMap}
                    size={16}
                    color="rgba(255,255,255,0.3)"
                  />
                  <CountUp to={stat.value} />
                </View>
                <Typography variant="caption" className="text-white/40 mt-1">
                  {stat.label}
                </Typography>
              </View>
            ))}
          </View>
        </View>

        {/* Divider */}
        <View className="px-6 pb-10">
          <View className="border-t border-white/10" />
        </View>

        {/* Bio */}
        <View className="px-6 gap-4">
          <Typography variant="h3" className="text-white">
            About
          </Typography>
          {AUTHOR.coverLetter.split('\n\n').map((paragraph, i) => (
            <Typography key={i} variant="body" className="text-white/60 leading-6">
              {paragraph.trim()}
            </Typography>
          ))}
        </View>

        {/* Divider */}
        <View className="px-6 py-10">
          <View className="border-t border-white/10" />
        </View>

        {/* Tech Stack */}
        <View className="px-6 gap-4">
          <Typography variant="h3" className="text-white">
            Stack
          </Typography>
          <View className="flex-row flex-wrap gap-2">
            {AUTHOR.techTags.map((tag) => (
              <Badge key={tag} type="info" label={tag} />
            ))}
          </View>
        </View>

        {/* Divider */}
        <View className="px-6 py-10">
          <View className="border-t border-white/10" />
        </View>

        {/* Links */}
        <View className="px-6 gap-4">
          <Typography variant="h3" className="text-white">
            Connect
          </Typography>
          <View className="flex-row flex-wrap gap-3">
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
