export type AuthorInfo = {
  name: string;
  title: string;
  coverLetter: string;
  links: { label: string; url: string; icon: string }[];
};

export const AUTHOR: AuthorInfo = {
  name: 'Jim Vercoelen',
  title: 'Senior React Native Engineer',
  coverLetter:
    'This showcase app was purpose-built for Fueled -- every screen demonstrates a specific competency, from component architecture to data fetching patterns. Rather than extracts from NDA projects, this is a clean-room demonstration of production-quality React Native engineering.',
  links: [
    { label: 'GitHub', url: 'https://github.com/jimvercoelen', icon: 'code' },
    { label: 'Portfolio', url: 'https://vecotech.io', icon: 'language' },
    { label: 'Email', url: 'mailto:jim@vecotech.io', icon: 'email' },
  ],
};
