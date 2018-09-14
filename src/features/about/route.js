// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  AboutPage,
  PrivacyPage,
} from './';

export default {
  path: 'about',
  name: 'About',
  childRoutes: [
    { path: 'about-page', name: 'About page', component: AboutPage, isIndex: true },
    { path: '/privacy', name: 'Privacy page', component: PrivacyPage },
  ],
};
