import { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, Button, TextField, Typography } from '@/components';
import { useSession } from '@/contexts/auth';

const loginSchema = yup.object({
  email: yup.string().required('Email is required').email('Please enter a valid email address'),
});

type LoginForm = yup.InferType<typeof loginSchema>;

type FeedbackMessage = {
  type: 'success' | 'error';
  text: string;
} | null;

function AnimatedBackground() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 6000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
    );
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['#000000', '#1a0d3a', '#000000'],
    ),
  }));

  return (
    <Animated.View
      style={[{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }, animatedStyle]}
    >
      <LinearGradient
        colors={[
          'transparent',
          'rgba(110, 91, 255, 0.08)',
          'rgba(110, 91, 255, 0.15)',
          'transparent',
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </Animated.View>
  );
}

export default function LoginScreen() {
  const { signIn } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<FeedbackMessage>(null);

  const { control, handleSubmit, watch } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: '' },
  });

  // Clear feedback when email changes
  const emailValue = watch('email');
  useEffect(() => {
    if (message) setMessage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValue]);

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setMessage(null);

    const { error } = await signIn(data.email.trim());

    setIsSubmitting(false);

    if (error) {
      setMessage({ type: 'error', text: error.message });
    } else {
      setMessage({ type: 'success', text: 'Check your email for the magic link!' });
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <AnimatedBackground />

      <Image
        source={require('../../assets/images/fueled-logo.png')}
        style={{ width: 180, height: 34 }}
        resizeMode="contain"
        className="mb-10"
      />

      <View className="w-full max-w-sm bg-white/5 border border-white/15 rounded-2xl p-6">
        <Typography variant="body" className="text-white text-lg mb-6 text-center">
          Sign in with magic link
        </Typography>

        <TextField
          control={control}
          name="email"
          label="Email"
          placeholder="email@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          disabled={isSubmitting}
          returnKeyType="send"
          onSubmitEditing={handleSubmit(onSubmit)}
          className="mb-4"
        />

        <Button
          variant="contained"
          label={isSubmitting ? 'Sending...' : 'Send Magic Link'}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        {message ? (
          <View className="mt-4">
            <Alert type={message.type} message={message.text} visible />
          </View>
        ) : null}
      </View>
    </View>
  );
}
