import { useState } from 'react';
import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Gradients, Colors } from '../../src/constants/colors';
import { useSession } from '../../src/contexts/auth';

export default function LoginScreen() {
  const { signIn } = useSession();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignIn = async () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const { error } = await signIn(email.trim());

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage('Check your email for the magic link!');
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text
        className="text-white text-3xl tracking-widest mb-10 text-center uppercase"
        style={{ fontFamily: 'Orbitron_600SemiBold' }}
      >
        FUELED.SHOWCASE
      </Text>

      <View className="w-full max-w-sm bg-white/5 border border-white/15 rounded-2xl p-6">
        <Text
          className="text-white text-lg mb-6 text-center"
          style={{ fontFamily: 'Inter_500Medium' }}
        >
          Sign in with magic link
        </Text>

        <TextInput
          className="w-full h-12 bg-white/10 border border-white/15 rounded-lg mb-4 px-4 text-white"
          style={{ fontFamily: 'Inter_400Regular' }}
          placeholder="email@example.com"
          placeholderTextColor={Colors.textSecondary}
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage('');
            setSuccessMessage('');
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          editable={!isSubmitting}
        />

        <Pressable
          className="w-full overflow-hidden rounded-lg"
          onPress={handleSignIn}
          disabled={isSubmitting}
          style={{ opacity: isSubmitting ? 0.7 : 1 }}
        >
          <LinearGradient
            colors={[...Gradients.primaryButton.colors]}
            start={Gradients.primaryButton.start}
            end={Gradients.primaryButton.end}
            className="h-12 items-center justify-center flex-row"
          >
            {isSubmitting ? (
              <>
                <ActivityIndicator color="#ffffff" size="small" style={{ marginRight: 8 }} />
                <Text
                  className="text-white text-sm tracking-widest uppercase"
                  style={{ fontFamily: 'Orbitron_600SemiBold' }}
                >
                  SENDING...
                </Text>
              </>
            ) : (
              <Text
                className="text-white text-sm tracking-widest uppercase"
                style={{ fontFamily: 'Orbitron_600SemiBold' }}
              >
                SEND MAGIC LINK
              </Text>
            )}
          </LinearGradient>
        </Pressable>

        {successMessage ? (
          <Text
            className="mt-4 text-center text-sm"
            style={{ fontFamily: 'Inter_500Medium', color: Colors.accent }}
          >
            {successMessage}
          </Text>
        ) : null}

        {errorMessage ? (
          <Text
            className="mt-4 text-center text-sm"
            style={{ fontFamily: 'Inter_500Medium', color: Colors.danger }}
          >
            {errorMessage}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
