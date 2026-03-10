import { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import TextField from '../../src/components/forms/TextField';
import Button from '../../src/components/ui/Button';
import Alert from '../../src/components/feedback/Alert';
import Typography from '../../src/components/ui/Typography';
import { useSession } from '../../src/contexts/auth';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const { signIn } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { control, handleSubmit, watch } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '' },
  });

  // Clear feedback messages when email changes
  const emailValue = watch('email');
  useEffect(() => {
    if (successMessage || errorMessage) {
      setSuccessMessage('');
      setErrorMessage('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValue]);

  const onSubmit = async (data: LoginForm) => {
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    const { error } = await signIn(data.email.trim());

    setIsSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
    } else {
      setSuccessMessage('Check your email for the magic link!');
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Typography variant="h1" className="text-3xl tracking-widest mb-10 text-center">
        FUELED.SHOWCASE
      </Typography>

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
          className="mb-4"
        />

        <Button
          variant="contained"
          label={isSubmitting ? 'SENDING...' : 'SEND MAGIC LINK'}
          loading={isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />

        {successMessage ? (
          <View className="mt-4">
            <Alert type="success" message={successMessage} visible={!!successMessage} />
          </View>
        ) : null}

        {errorMessage ? (
          <View className="mt-4">
            <Alert type="error" message={errorMessage} visible={!!errorMessage} />
          </View>
        ) : null}
      </View>
    </View>
  );
}
