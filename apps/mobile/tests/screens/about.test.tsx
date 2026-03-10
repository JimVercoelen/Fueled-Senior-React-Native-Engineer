import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import AboutScreen from '../../app/(dashboard)/about';

// Spy on Linking.openURL
const openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(true as never);

function renderAbout() {
  return render(<AboutScreen />);
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AboutScreen', () => {
  // ABUT-01: Requirements checklist
  describe('ABUT-01: Requirements checklist', () => {
    it('renders requirement category headings', () => {
      const { getByText, getAllByText } = renderAbout();

      expect(getByText('Authentication')).toBeTruthy();
      expect(getAllByText('Dashboard').length).toBeGreaterThanOrEqual(1);
      expect(getByText('Component Library')).toBeTruthy();
      expect(getByText('Data Fetching')).toBeTruthy();
      expect(getByText('State Management')).toBeTruthy();
    });

    it('renders requirement IDs', () => {
      const { getByText } = renderAbout();

      expect(getByText('AUTH-01')).toBeTruthy();
      expect(getByText('DASH-01')).toBeTruthy();
      expect(getByText('COMP-01')).toBeTruthy();
    });
  });

  // ABUT-02: Author section
  describe('ABUT-02: Author section', () => {
    it('renders author name and title', () => {
      const { getByText } = renderAbout();

      expect(getByText('Jim Vercoelen')).toBeTruthy();
      expect(getByText(/Senior Full Stack Engineer/)).toBeTruthy();
    });

    it('renders cover letter content', () => {
      const { getByText } = renderAbout();

      expect(getByText(/senior full stack engineer with over 8 years/)).toBeTruthy();
    });
  });

  // ABUT-03: Tech stack
  describe('ABUT-03: Tech stack', () => {
    it('renders tech stack items', () => {
      const { getByText } = renderAbout();

      expect(getByText('React Native (Expo SDK 55)')).toBeTruthy();
      expect(getByText('TypeScript')).toBeTruthy();
      expect(getByText('NativeWind v4')).toBeTruthy();
    });

    it('renders tech stack rationale', () => {
      const { getByText } = renderAbout();

      expect(getByText(/Cross-platform with web deployment/)).toBeTruthy();
      expect(getByText(/Compile-time safety/)).toBeTruthy();
    });
  });

  // ABUT-04: External links
  describe('ABUT-04: External links', () => {
    it('renders link buttons', () => {
      const { getByText } = renderAbout();

      expect(getByText('LinkedIn')).toBeTruthy();
      expect(getByText('Portfolio')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('GitHub')).toBeTruthy();
    });

    it('calls Linking.openURL when GitHub link pressed', () => {
      const { getByText } = renderAbout();

      fireEvent.press(getByText('GitHub'));

      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://github.com/JimVercoelen/Fueled-Senior-React-Native-Engineer',
      );
    });

    it('calls Linking.openURL with mailto for email', () => {
      const { getByText } = renderAbout();

      fireEvent.press(getByText('Email'));

      expect(Linking.openURL).toHaveBeenCalledWith('mailto:jim@vecotech.io');
    });
  });
});
