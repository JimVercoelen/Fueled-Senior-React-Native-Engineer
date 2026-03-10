// Usage: Add a ref and onScroll handler to your ScrollView:
//   const scrollRef = useRef<ScrollView>(null);
//   const [showTop, setShowTop] = useState(false);
//   <ScrollView ref={scrollRef} onScroll={(e) => setShowTop(e.nativeEvent.contentOffset.y > 300)} scrollEventThrottle={16}>
//   <ScrollToTop scrollRef={scrollRef} visible={showTop} />

import React, { RefObject } from 'react';
import { Pressable, ScrollView as RNScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface ScrollToTopProps {
  scrollRef: RefObject<RNScrollView | null>;
  visible: boolean;
}

export default function ScrollToTop({ scrollRef, visible }: ScrollToTopProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(visible ? 1 : 0, { duration: 200 }),
  }));

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 24,
          right: 24,
        },
        animatedStyle,
      ]}
      pointerEvents={visible ? 'auto' : 'none'}
    >
      <Pressable
        onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })}
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: 'rgba(255,255,255,0.15)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="keyboard-arrow-up" size={28} color="white" />
      </Pressable>
    </Animated.View>
  );
}
