import React from 'react';
import { View } from 'react-native';
import Typography from '../ui/Typography';
import Button from '../ui/Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View className="flex-1 items-center justify-center px-6 bg-white/5 border border-white/15 rounded-2xl m-4 py-12">
          <Typography variant="h3" className="text-white mb-2">
            Something went wrong
          </Typography>
          <Typography variant="body" className="text-white/50 text-center mb-6">
            An unexpected error occurred. Please try again.
          </Typography>
          <Button variant="outlined" label="Try Again" onPress={this.handleReset} />
        </View>
      );
    }

    return this.props.children;
  }
}
