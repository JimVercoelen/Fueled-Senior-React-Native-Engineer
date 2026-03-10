import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import AboutMeScreen from '../../app/(dashboard)/about-me';

const openURLSpy = jest.spyOn(Linking, 'openURL').mockResolvedValue(true as never);

function renderAboutMe() {
  return render(<AboutMeScreen />);
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

    it('renders tech tags', () => {
      const { getByText } = renderAboutMe();
      expect(getByText('TypeScript')).toBeTruthy();
      expect(getByText('React Native')).toBeTruthy();
      expect(getByText('Python')).toBeTruthy();
    });
  });

  // ABUT-04: External links (LinkedIn, Portfolio, Email, GitHub)
  describe('ABUT-04: External links', () => {
    it('renders LinkedIn, Portfolio, Email, and GitHub buttons', () => {
      const { getByText } = renderAboutMe();
      expect(getByText('LinkedIn')).toBeTruthy();
      expect(getByText('Portfolio')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
      expect(getByText('GitHub')).toBeTruthy();
    });

    it('calls Linking.openURL when LinkedIn pressed', () => {
      const { getByText } = renderAboutMe();
      fireEvent.press(getByText('LinkedIn'));
      expect(Linking.openURL).toHaveBeenCalledWith('https://linkedin.com/in/jimvercoelen');
    });

    it('calls Linking.openURL with mailto for email', () => {
      const { getByText } = renderAboutMe();
      fireEvent.press(getByText('Email'));
      expect(Linking.openURL).toHaveBeenCalledWith('mailto:jim@vecotech.io');
    });

    it('calls Linking.openURL for GitHub link', () => {
      const { getByText } = renderAboutMe();
      fireEvent.press(getByText('GitHub'));
      expect(Linking.openURL).toHaveBeenCalledWith(
        'https://github.com/JimVercoelen/Fueled-Senior-React-Native-Engineer',
      );
    });
  });
});
