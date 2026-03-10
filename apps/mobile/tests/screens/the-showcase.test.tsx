import React from 'react';
import { render } from '@testing-library/react-native';
import AboutAppScreen from '../../app/(dashboard)/the-showcase';

function renderAboutApp() {
  return render(<AboutAppScreen />);
}

describe('AboutAppScreen', () => {
  // ABUT-01: Requirements checklist
  describe('ABUT-01: Requirements checklist', () => {
    it('renders requirement category headings', () => {
      const { getByText } = renderAboutApp();
      expect(getByText(/Authentication\s+·/)).toBeTruthy();
      expect(getByText(/Dashboard\s+·/)).toBeTruthy();
      expect(getByText(/Component Library\s+·/)).toBeTruthy();
      expect(getByText(/Data Fetching\s+·/)).toBeTruthy();
      expect(getByText(/State Management\s+·/)).toBeTruthy();
    });

    it('renders requirement IDs', () => {
      const { getByText } = renderAboutApp();
      expect(getByText('AUTH-01')).toBeTruthy();
      expect(getByText('DASH-01')).toBeTruthy();
      expect(getByText('COMP-01')).toBeTruthy();
    });
  });

  // ABUT-03: Tech stack
  describe('ABUT-03: Tech stack', () => {
    it('renders tech stack items', () => {
      const { getByText } = renderAboutApp();
      expect(getByText('React Native (Expo SDK 55)')).toBeTruthy();
      expect(getByText('TypeScript')).toBeTruthy();
      expect(getByText('NativeWind v4')).toBeTruthy();
    });

    it('renders tech stack rationale', () => {
      const { getByText } = renderAboutApp();
      expect(getByText(/Cross-platform with web deployment/)).toBeTruthy();
      expect(getByText(/Compile-time safety/)).toBeTruthy();
    });
  });
});
