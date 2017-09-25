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
    to: '/lucity',
    id: 'lucity'
  },
  {
    icon: 'map-marker',
    label: 'Precise',
    to: '/precise',
    id: 'precise'
  },
  {
    icon: 'dollar',
    label: 'IAN',
    content: [
      {
        icon: 'tint',
        label: 'Main',
        to: '/ian/ian',
      },
      {
        icon: 'tint',
        label: 'Water',
        to: '/ian/water',
      },
      {
        icon: 'tint',
        label: 'Wastewater',
        to: '/ian/wastewater',
      },
      {
        icon: 'tint',
        label: 'Stormwater',
        to: '/ian/stormwater'
      },
    ],
  },
  {
    icon: 'cog',
    label: 'Settings',
    content: [
      {
        icon: '',
        label: 'Users',
        to: '/settings/users',
        id: 'users'
      }
    ]
  },
];

export { SideBarMenuItems };
