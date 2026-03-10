import { useRef, useState } from 'react';
import { View, ScrollView, ScrollView as RNScrollView, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography, Accordion, AccordionItem, Button, ScrollToTop } from '@/components';
import { REQUIREMENTS } from '@/constants/requirements';
import { TECH_STACK } from '@/constants/tech-stack';

export default function AboutAppScreen() {
  const scrollRef = useRef<RNScrollView>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const totalRequirements = REQUIREMENTS.reduce((sum, g) => sum + g.requirements.length, 0);
  const completedRequirements = REQUIREMENTS.reduce(
    (sum, g) => sum + g.requirements.filter((r) => r.status === 'complete').length,
    0,
  );

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
          <Typography variant="label" className="text-[#6E5BFF] mb-4">
            The Showcase
          </Typography>
          <Typography variant="h2" className="text-white text-center text-2xl">
            Built to production standards.
          </Typography>
          <Typography variant="body" className="text-white/50 text-center mt-3 max-w-lg">
            A purpose-built technical showcase demonstrating production-quality React Native
            engineering.
          </Typography>
          <View className="mt-6">
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

        {/* Stats Bar */}
        <View className="flex-row justify-center gap-8 px-6 pb-10">
          <View className="items-center">
            <Typography variant="h2" className="text-white text-xl">
              {completedRequirements}/{totalRequirements}
            </Typography>
            <Typography variant="caption" className="text-white/40">
              Requirements
            </Typography>
          </View>
          <View className="items-center">
            <Typography variant="h2" className="text-white text-xl">
              {REQUIREMENTS.length}
            </Typography>
            <Typography variant="caption" className="text-white/40">
              Categories
            </Typography>
          </View>
          <View className="items-center">
            <Typography variant="h2" className="text-white text-xl">
              {TECH_STACK.length}
            </Typography>
            <Typography variant="caption" className="text-white/40">
              Technologies
            </Typography>
          </View>
        </View>

        {/* Divider */}
        <View className="px-6 pb-10">
          <View className="border-t border-white/10" />
        </View>

        {/* Requirements checklist */}
        <View className="px-4">
          <Typography variant="h3" className="text-white mb-4 px-2">
            Requirements Covered
          </Typography>
          <Accordion>
            {REQUIREMENTS.map((group, index) => {
              const complete = group.requirements.filter((r) => r.status === 'complete').length;
              const total = group.requirements.length;
              const allComplete = complete === total;

              return (
                <AccordionItem
                  key={group.category}
                  title={`${group.category}  ·  ${complete}/${total}`}
                  defaultOpen={index === 0}
                >
                  <View className="gap-3">
                    {group.requirements.map((req) => (
                      <View key={req.id} className="flex-row items-start gap-3">
                        <MaterialIcons
                          name={
                            req.status === 'complete' ? 'check-circle' : 'radio-button-unchecked'
                          }
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

                    {/* Category progress bar */}
                    <View className="mt-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <View
                        style={{
                          width: `${(complete / total) * 100}%`,
                          height: '100%',
                          backgroundColor: allComplete ? '#22c55e' : '#6E5BFF',
                          borderRadius: 999,
                        }}
                      />
                    </View>
                  </View>
                </AccordionItem>
              );
            })}
          </Accordion>
        </View>

        {/* Divider */}
        <View className="px-6 py-10">
          <View className="border-t border-white/10" />
        </View>

        {/* Tech Stack */}
        <View className="px-4 gap-4">
          <Typography variant="h3" className="text-white px-2">
            Tech Stack
          </Typography>
          <View className="flex-row flex-wrap gap-3">
            {TECH_STACK.map((item) => (
              <View
                key={item.name}
                className="bg-white/5 border border-white/10 rounded-xl p-4"
                style={{ minWidth: '46%', flexGrow: 1, flexShrink: 1 }}
              >
                <Typography variant="label" className="text-white">
                  {item.name}
                </Typography>
                <Typography variant="caption" className="text-[#6E5BFF] mt-1">
                  {item.category}
                </Typography>
                <Typography variant="body" className="text-white/50 mt-2 text-sm">
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
