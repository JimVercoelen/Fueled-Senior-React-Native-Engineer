export type AuthorStat = {
  value: number;
  label: string;
  icon: string;
};

export type AuthorInfo = {
  name: string;
  title: string;
  coverLetter: string;
  techTags: string[];
  links: { label: string; url: string; icon: string }[];
  stats: AuthorStat[];
};

export const AUTHOR: AuthorInfo = {
  name: 'Jim Vercoelen',
  title: 'Senior Full Stack Engineer · 10+ years (international) experience · 6+ years full-time',
  coverLetter:
    'I am a senior full stack engineer with over 10 years of international experience building scalable web platforms and production-grade systems.\n\nMy core stack includes TypeScript, React (Native), Node.js/Next.js, and Python (Django/FastAPI), alongside strong experience with SQL and NoSQL databases. Over the past 6+ years, I have worked full-time with international teams in remote environments, owning features end-to-end - from architecture and implementation to production deployment. \n\nI am comfortable operating across the full stack, translating complex product requirements into clean, maintainable, and scalable solutions. In addition to technical execution, I value clear communication, ownership, and thoughtful trade-offs. \n\n I work well in ambitious teams that prioritize quality, speed, and collaboration.',
  techTags: [
    'TypeScript',
    'React',
    'React Native',
    'Node.js',
    'Next.js',
    'Python',
    'Django',
    'FastAPI',
    'SQL / NoSQL',
  ],
  links: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/jimvercoelen', icon: 'business' },
    { label: 'Portfolio', url: 'https://vecotech.io', icon: 'language' },
    { label: 'Email', url: 'mailto:jim@vecotech.io', icon: 'email' },
    // {
    //   label: 'GitHub',
    //   url: 'https://github.com/JimVercoelen',
    //   icon: 'code',
    // },
  ],
  stats: [
    { value: 6, label: 'Projects shipped', icon: 'work' },
    { value: 7, label: 'Teams joined', icon: 'groups' },
    { value: 5, label: 'Countries', icon: 'public' },
    { value: 10, label: 'Years experience', icon: 'schedule' },
    { value: 5, label: 'Startups supported', icon: 'trending-up' },
  ],
};
