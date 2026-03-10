import { useRef, useState } from 'react';
import { View, ScrollView, ScrollView as RNScrollView, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography, Accordion, AccordionItem, Button, ScrollToTop } from '@/components';
import { REQUIREMENTS } from '@/constants/requirements';
import { TECH_STACK } from '@/constants/tech-stack';

export default function AboutAppScreen() {
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
            The Showcase
          </Typography>
          <Typography variant="body" className="text-white/60 mt-1">
            A purpose-built technical showcase demonstrating production-quality React Native
            engineering.
          </Typography>
          <View className="mt-3">
            <Button
              variant="outlined"
              icon={'code' as keyof typeof MaterialIcons.glyphMap}
              label="Source Code"
              onPress={() =>
                Linking.openURL(
                  'https://github.com/JimVercoelen/Fueled-Senior-React-Native-Engineer',
                )
              }
            />
          </View>
        </View>

        {/* Requirements checklist */}
        <View>
          <Typography variant="h3" className="text-white mb-3">
            Requirements Checklist
          </Typography>
          <Accordion>
            {REQUIREMENTS.map((group, index) => (
              <AccordionItem key={group.category} title={group.category} defaultOpen={index === 0}>
                <View className="gap-3">
                  {group.requirements.map((req) => (
                    <View key={req.id} className="flex-row items-start gap-3">
                      <MaterialIcons
                        name={req.status === 'complete' ? 'check-circle' : 'radio-button-unchecked'}
                        size={18}
                        color={req.status === 'complete' ? '#22c55e' : 'rgba(255,255,255,0.3)'}
                        style={{ marginTop: 2 }}
                      />
                      <View className="flex-1">
                        <Typography variant="label" className="text-white">
                          {req.id}
                        </Typography>
                        <Typography variant="body" className="text-white/80">
                          {req.title}
                        </Typography>
                        <Typography variant="caption" className="text-white/40">
                          {req.screen}
                        </Typography>
                      </View>
                    </View>
                  ))}
                </View>
              </AccordionItem>
            ))}
          </Accordion>
        </View>

        {/* Tech stack */}
        <View>
          <Typography variant="h3" className="text-white mb-3">
            Tech Stack
          </Typography>
          <View className="gap-3">
            {TECH_STACK.map((item) => (
              <View key={item.name} className="bg-white/5 border border-white/15 rounded-xl p-4">
                <View className="flex-row items-center justify-between">
                  <Typography variant="label" className="text-white">
                    {item.name}
                  </Typography>
                  <Typography variant="caption" className="text-white/30">
                    {item.category}
                  </Typography>
                </View>
                <Typography variant="body" className="text-white/60 mt-1">
                  {item.rationale}
                </Typography>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <ScrollToTop scrollRef={scrollRef} visible={showScrollTop} />
    </View>
  );
}
