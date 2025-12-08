export const routes = [
  { path: '/feed', component: 'Feed', protected: true },
  { path: '/log', component: 'MealLog', protected: true },
  { path: '/leaderboard', component: 'Leaderboard', protected: true },
  { path: '/login', component: 'Login', protected: false },
  { path: '/admin', component: 'AdminDashboard', protected: true },
];

