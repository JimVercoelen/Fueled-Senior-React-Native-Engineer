import { useRef, useState } from 'react';
import {
  View,
  Pressable,
  ScrollView,
  ScrollView as RNScrollView,
  ImageBackground,
  ImageSourcePropType,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Typography, ScrollToTop } from '@/components';
import { useSession } from '@/contexts/auth';

type DemoCard = {
  title: string;
  subtitle: string;
  tags: string[];
  route: string;
  image: ImageSourcePropType;
};

const DEMO_CARDS: DemoCard[] = [
  {
    title: 'Meet Jim',
    subtitle:
      'Meet the engineer behind this showcase. 8+ years of full stack experience across TypeScript, React, Node.js, and Python.',
    tags: ['Cover Letter', 'Contact', 'Portfolio'],
    route: '/(dashboard)/about-me',
    image: require('../../assets/images/cards/meet-jim.jpg'),
  },
  {
    title: 'The Showcase',
    subtitle: 'Fueled requirements checklist and tech stack rationale. See what was built and why.',
    tags: ['Requirements', 'Tech Stack', 'Checklist'],
    route: '/(dashboard)/about-app',
    image: require('../../assets/images/cards/the-showcase.jpg'),
  },
  {
    title: 'Data Fetching',
    subtitle:
      'TanStack Query, pagination, search, filter, and mutations with real API integration.',
    tags: ['TanStack Query', 'API', 'Pagination'],
    route: '/(dashboard)/data-fetching',
    image: require('../../assets/images/cards/data-fetching.jpg'),
  },
  {
    title: 'State Management',
    subtitle: 'Cache viewer, toast notifications, and modal system powered by Context API.',
    tags: ['Context API', 'Cache', 'Toasts'],
    route: '/(dashboard)/state-management',
    image: require('../../assets/images/cards/state-management.jpg'),
  },
  {
    title: 'Component Library',
    subtitle: 'Interactive playground showcasing all UI components with live demos.',
    tags: ['NativeWind', 'Reanimated', 'Forms'],
    route: '/(dashboard)/components',
    image: require('../../assets/images/cards/component-library.jpg'),
  },
];

function DashboardCard({ card, index }: { card: DemoCard; index: number }) {
  const router = useRouter();
  const scale = useSharedValue(1);
  const imageScale = useSharedValue(1);
  const [hovered, setHovered] = useState(false);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const handleHoverIn = () => {
    setHovered(true);
    imageScale.value = withTiming(1.05, { duration: 400 });
  };

  const handleHoverOut = () => {
    setHovered(false);
    imageScale.value = withTiming(1, { duration: 400 });
  };

  const handlePressIn = () => {
    scale.value = withTiming(0.97, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 200 });
  };

  return (
    <Animated.View style={cardStyle}>
      <Pressable
        onPress={() => router.push(card.route as never)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        className="rounded-2xl overflow-hidden"
        style={[{ height: 320 }, Platform.OS === 'web' ? { cursor: 'pointer' } : {}]}
      >
        {/* Background image layer — scales on hover */}
        <Animated.View
          style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, imageStyle]}
        >
          <ImageBackground
            source={card.image}
            style={{ flex: 1 }}
            imageStyle={{ borderRadius: 16 }}
            resizeMode="cover"
          />
        </Animated.View>

        {/* Content layer — stays static */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.85)']}
          locations={[0, 0.4, 1]}
          style={{ flex: 1, borderRadius: 16, justifyContent: 'flex-end', padding: 24 }}
        >
          <Typography variant="h2" className="mb-2">
            {index + 1}. {card.title}
          </Typography>
          <Typography variant="body" className="text-white/80 mb-4">
            {card.subtitle}
          </Typography>
          <View className="flex-row items-center mb-4">
            <Typography variant="body" className="text-white/90">
              Explore
            </Typography>
            <MaterialIcons
              name="arrow-forward"
              size={16}
              color="rgba(255,255,255,0.9)"
              style={{ marginLeft: 6 }}
            />
          </View>
          <View className="flex-row flex-wrap gap-2">
            {card.tags.map((tag) => (
              <View key={tag} className="border border-white/30 rounded-full px-3 py-1">
                <Typography variant="caption" className="text-white/70">
                  {tag}
                </Typography>
              </View>
            ))}
          </View>
        </LinearGradient>
      </Pressable>
    </Animated.View>
  );
}

export default function DashboardScreen() {
  const { session } = useSession();
  const scrollRef = useRef<RNScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  return (
    <View className="flex-1">
      <ScrollView
        ref={scrollRef}
        onScroll={(e) => setShowScrollTop(e.nativeEvent.contentOffset.y > 300)}
        scrollEventThrottle={16}
        className="flex-1"
        contentContainerClassName="p-4 pb-8 max-w-3xl mx-auto w-full gap-4"
        style={{ backgroundColor: 'transparent' }}
      >
        <View className="mb-2">
          <Typography variant="h2">Welcome back</Typography>
          {session?.user?.email && (
            <Typography variant="body" className="text-white/60 mt-1">
              {session.user.email}
            </Typography>
          )}
        </View>
        {DEMO_CARDS.map((card, index) => (
          <DashboardCard key={card.route} card={card} index={index} />
        ))}
      </ScrollView>

      <ScrollToTop scrollRef={scrollRef} visible={showScrollTop} />
    </View>
  );
}
