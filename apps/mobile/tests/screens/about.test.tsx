import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import AboutMeScreen from '../../app/(dashboard)/about-me';
import AboutAppScreen from '../../app/(dashboard)/about-app';

// Spy on Linking.openURL
const openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(true as never);

function renderAboutMe() {
  return render(<AboutMeScreen />);
}

function renderAboutApp() {
  return render(<AboutAppScreen />);
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('AboutMeScreen', () => {
  // ABUT-02: Author section
  describe('ABUT-02: Author section', () => {
    it('renders author name and title', () => {
      const { getByText } = renderAboutMe();

      expect(getByText('Jim Vercoelen')).toBeTruthy();
      expect(getByText(/Senior Full Stack Engineer/)).toBeTruthy();
    });

    it('renders cover letter content', () => {
      const { getByText } = renderAboutMe();

      expect(getByText(/senior full stack engineer with over 8 years/)).toBeTruthy();
    });
  });

  // ABUT-04: External links
  describe('ABUT-04: External links', () => {
    it('renders link buttons', () => {
      const { getByText } = renderAboutMe();

      expect(getByText('LinkedIn')).toBeTruthy();
      expect(getByText('Portfolio')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('GitHub')).toBeTruthy();
    });

    it('calls Linking.openURL when GitHub link pressed', () => {
      const { getByText } = renderAboutMe();

      fireEvent.press(getByText('GitHub'));

      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://github.com/JimVercoelen/Fueled-Senior-React-Native-Engineer',
      );
    });

    it('calls Linking.openURL with mailto for email', () => {
      const { getByText } = renderAboutMe();

      fireEvent.press(getByText('Email'));

      expect(Linking.openURL).toHaveBeenCalledWith('mailto:jim@vecotech.io');
    });
  });
});

describe('AboutAppScreen', () => {
  // ABUT-01: Requirements checklist
  describe('ABUT-01: Requirements checklist', () => {
    it('renders requirement category headings', () => {
      const { getByText, getAllByText } = renderAboutApp();

      expect(getByText('Authentication')).toBeTruthy();
      expect(getAllByText('Dashboard').length).toBeGreaterThanOrEqual(1);
      expect(getByText('Component Library')).toBeTruthy();
      expect(getByText('Data Fetching')).toBeTruthy();
      expect(getByText('State Management')).toBeTruthy();
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
