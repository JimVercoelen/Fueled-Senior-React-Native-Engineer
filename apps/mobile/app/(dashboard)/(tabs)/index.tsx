import { View, Text, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Colors } from '@/constants/colors';

type DemoCard = {
  title: string;
  subtitle: string;
  icon: React.ComponentProps<typeof FontAwesome>['name'];
  route: string;
};

const DEMO_CARDS: DemoCard[] = [
  {
    title: 'Data Fetching',
    subtitle: 'TanStack Query, pagination, mutations',
    icon: 'cloud-download',
    route: '/(dashboard)/data-fetching',
  },
  {
    title: 'State Management',
    subtitle: 'Cache viewer, toasts, modals',
    icon: 'database',
    route: '/(dashboard)/state-management',
  },
  {
    title: 'Component Library',
    subtitle: 'Interactive playground',
    icon: 'puzzle-piece',
    route: '/(dashboard)/components',
  },
  {
    title: 'About',
    subtitle: 'Requirements checklist, author info',
    icon: 'info-circle',
    route: '/(dashboard)/about',
  },
];

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <ScrollView className="flex-1 bg-black" contentContainerClassName="p-4 pb-8">
      <Text
        className="text-white text-2xl tracking-wider uppercase mb-6 text-center"
        style={{ fontFamily: 'Inter_600SemiBold' }}
      >
        Dashboard
      </Text>

      <View className="gap-4">
        {DEMO_CARDS.map((card) => (
          <Pressable
            key={card.route}
            onPress={() => router.push(card.route as never)}
            className="bg-white/5 border border-white/15 rounded-xl p-4 flex-row items-center active:opacity-70"
          >
            <View className="w-10 h-10 rounded-lg bg-primary/20 items-center justify-center mr-4">
              <FontAwesome name={card.icon} size={18} color={Colors.primary} />
            </View>
            <View className="flex-1">
              <Text
                className="text-white text-base tracking-wide uppercase mb-1"
                style={{ fontFamily: 'Inter_600SemiBold' }}
              >
                {card.title}
              </Text>
              <Text className="text-white/60 text-sm" style={{ fontFamily: 'Inter_400Regular' }}>
                {card.subtitle}
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color="rgba(255,255,255,0.3)" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
