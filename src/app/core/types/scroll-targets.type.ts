export const anchors = [
  { id: 'intro', title: 'Intro' },
  { id: 'projects', title: 'Projects' },
  { id: 'craft', title: 'Craft' },
  { id: 'blog', title: 'Blog' },
  { id: 'contact', title: 'Contact' },
] as const;

export type Anchor = (typeof anchors)[number]['id'] | null;
