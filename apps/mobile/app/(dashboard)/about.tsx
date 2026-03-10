import { View, ScrollView, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Typography, Avatar, Button, Accordion, AccordionItem } from '@/components';
import { REQUIREMENTS } from '@/constants/requirements';
import { TECH_STACK } from '@/constants/tech-stack';
import { AUTHOR } from '@/constants/author';

export default function AboutScreen() {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="p-4 pb-8 max-w-3xl mx-auto w-full gap-6"
      style={{ backgroundColor: 'transparent' }}
    >
      {/* Page header */}
      <View>
        <Typography variant="h2" className="text-white">
          About this app
        </Typography>
        <Typography variant="body" className="text-white/60 mt-1">
          A purpose-built technical showcase for Fueled, demonstrating production-quality React
          Native engineering.
        </Typography>
      </View>

      {/* Author section (ABUT-02 + ABUT-04) */}
      <View className="bg-white/5 border border-white/15 rounded-xl p-5">
        <View className="flex-row items-center">
          <Avatar name={AUTHOR.name} size="lg" />
          <View className="ml-4">
            <Typography variant="h3" className="text-white">
              {AUTHOR.name}
            </Typography>
            <Typography variant="caption" className="text-white/60">
              {AUTHOR.title}
            </Typography>
          </View>
        </View>
        <Typography variant="body" className="text-white/60 mt-4">
          {AUTHOR.coverLetter}
        </Typography>
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

      {/* Requirements checklist (ABUT-01) */}
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

      {/* Tech stack (ABUT-03) */}
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
  );
}
