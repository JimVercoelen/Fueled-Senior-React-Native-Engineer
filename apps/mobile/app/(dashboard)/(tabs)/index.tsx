import { View, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/colors';
import { Typography } from '@/components';

type DemoCard = {
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  route: string;
  accent: string;
};

const DEMO_CARDS: DemoCard[] = [
  {
    title: 'Data Fetching',
    subtitle: 'TanStack Query, pagination, mutations',
    icon: 'cloud-download',
    route: '/(dashboard)/data-fetching',
    accent: 'rgba(110, 91, 255, 0.15)',
  },
  {
    title: 'State Management',
    subtitle: 'Cache viewer, toasts, modals',
    icon: 'storage',
    route: '/(dashboard)/state-management',
    accent: 'rgba(77, 56, 236, 0.15)',
  },
  {
    title: 'Component Library',
    subtitle: 'Interactive playground',
    icon: 'widgets',
    route: '/(dashboard)/components',
    accent: 'rgba(139, 127, 255, 0.15)',
  },
  {
    title: 'About',
    subtitle: 'Requirements checklist, author info',
    icon: 'info-outline',
    route: '/(dashboard)/about',
    accent: 'rgba(110, 91, 255, 0.10)',
  },
];

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView
      className="flex-1 bg-black"
      contentContainerClassName="p-4 pb-8 max-w-3xl mx-auto w-full"
    >
      <View className="flex-row flex-wrap gap-4">
        {DEMO_CARDS.map((card) => (
          <Pressable
            key={card.route}
            onPress={() => router.push(card.route as never)}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 active:opacity-70"
            style={{ flexBasis: '48%', flexGrow: 1, minWidth: 280 }}
          >
            <View
              className="w-12 h-12 rounded-xl items-center justify-center mb-4"
              style={{ backgroundColor: card.accent }}
            >
              <MaterialIcons name={card.icon} size={24} color={Colors.primary} />
            </View>
            <Typography variant="h3" className="mb-1">
              {card.title}
            </Typography>
            <Typography variant="caption" className="mb-3">
              {card.subtitle}
            </Typography>
            <View className="flex-row items-center">
              <Typography variant="caption" className="text-primary-500">
                Explore
              </Typography>
              <MaterialIcons
                name="arrow-forward"
                size={14}
                color={Colors.primary}
                style={{ marginLeft: 4 }}
              />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
