import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Linking } from 'react-native';
import AboutMeScreen from '../../app/(dashboard)/meet-jim';

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
      expect(getByText(/senior full stack engineer with over 10 years/)).toBeTruthy();
    });

    it('renders tech tags', () => {
      const { getByText } = renderAboutMe();
      expect(getByText('TypeScript')).toBeTruthy();
      expect(getByText('React Native')).toBeTruthy();
      expect(getByText('Python')).toBeTruthy();
    });
  });

  // Stats grid with count-up animation
  describe('Stats grid', () => {
    it('renders stat labels for all author stats', () => {
      const { getByText } = renderAboutMe();
      expect(getByText('Projects shipped')).toBeTruthy();
      expect(getByText('Teams joined')).toBeTruthy();
      expect(getByText('Countries')).toBeTruthy();
      expect(getByText('Years experience')).toBeTruthy();
      expect(getByText('Startups supported')).toBeTruthy();
    });

    it('renders stat values starting at 0 (count-up animation initial state)', () => {
      const { getAllByText } = renderAboutMe();
      // In test env, rAF does not run so CountUp stays at initial value 0
      const zeros = getAllByText('0');
      expect(zeros.length).toBeGreaterThanOrEqual(5);
    });
  });

  // ABUT-04: External links (LinkedIn, Portfolio, Email)
  describe('ABUT-04: External links', () => {
    it('renders LinkedIn, Portfolio, and Email buttons', () => {
      const { getByText } = renderAboutMe();
      expect(getByText('LinkedIn')).toBeTruthy();
      expect(getByText('Portfolio')).toBeTruthy();
      expect(getByText('Email')).toBeTruthy();
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

    it('calls Linking.openURL for "Let\'s talk" CTA', () => {
      const { getByText } = renderAboutMe();
      fireEvent.press(getByText("Let's talk"));
      expect(Linking.openURL).toHaveBeenCalledWith('mailto:jim@vecotech.io');
    });
  });
});
