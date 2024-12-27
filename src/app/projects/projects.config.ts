export type Project =
  | 'boxtrainer'
  | 'connect'
  | 'kithara'
  | 'lapResearch'
  | 'rbs'
  | 'laparos';

export const projects: { path: Project; name: string; description: string }[] =
  [
    {
      path: 'boxtrainer',
      name: 'BoxTrainer',
      description: 'Train the next generation of surgeons',
    },
    { path: 'connect', name: 'Connect', description: 'Manage Virtameds Data' },
    {
      path: 'kithara',
      name: 'Kithara',
      description: 'Finding domains using AI',
    },
  ];
