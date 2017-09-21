const SideBarMenuItems = [
  {
    icon: 'home',
    label: 'Home',
    to: '/',
    id: 'home'
  },
  {
    icon: 'cog',
    label: 'Lucity',
    to: 'lucity',
    id: 'lucity'
  },
  {
    icon: 'map-marker',
    label: 'Precise',
    to: 'precise',
    id: 'precise'
  },
  {
    icon: 'dollar',
    label: 'IAN',
    content: [
      {
        icon: 'tint',
        label: 'Main',
        to: 'ian',
      },
      {
        icon: 'tint',
        label: 'Water',
        to: 'water',
      },
      {
        icon: 'tint',
        label: 'Wastewater',
        to: 'wastewater',
      },
      {
        icon: 'tint',
        label: 'Stormwater',
        to: 'stormwater'
      },
    ],
  },
  {
    icon: 'cog',
    label: 'Settings',
    to: 'settings',
    id: 'settings'
  },
  {
    icon: 'tint',
    label: 'API',
    to: 'api',
    id: 'api'
  }
];

export { SideBarMenuItems };
