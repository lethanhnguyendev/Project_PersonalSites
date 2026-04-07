import imgSplash from './z5146436385087_da9e28db8617893620b41ca39838d567.jpg';
import imgLogin from './z5146436387803_cc14b7ae38fe7e67959eed65bcbc0938.jpg';
import imgConstruction from './z5146436386783_df5efc276650361609f0ccb831ca7419.jpg';
import imgInput1 from './1.jpg';
import imgInput8 from './8.jpg';
import imgCap4 from './4.jpg';
import imgCap6 from './6.jpg';
import imgCap7 from './7.jpg';
import imgScreen5 from './5.jpg';
import imgScreen9 from './9.jpg';
import imgScreen10 from './10.jpg';
import imgScreen11 from './11.jpg';
import imgField from './z4218579221749_d3f65790e0fe3da3e1fd1e578221727e.jpg';

const items = [
  {
    title: 'Splash Screen',
    src: imgSplash,
    alt: 'Mobile Project — Splash screen',
    caption: 'Splash screen of the Mobile Project application before user login.',
  },
  {
    title: 'Login Page',
    src: imgLogin,
    alt: 'Mobile Project — Login page',
    caption: 'Login page where technicians authenticate with employee credentials.',
  },
  {
    title: 'View Construction & Electrical Equipment',
    src: imgConstruction,
    alt: 'Mobile Project — View construction and electrical equipment',
    caption: 'Screen showing construction information and electrical equipment linked to testing tickets.',
  },
  {
    title: 'Input Data Page',
    src: imgInput1,
    alt: 'Mobile Project — Input data page sample 1',
    caption: 'Input data page where technicians enter measurement values and related testing information.',
  },
  {
    title: 'Input Data Page Variant',
    src: imgInput8,
    alt: 'Mobile Project — Input data page sample 2',
    caption: 'Another input data screen variant for specific testing forms.',
  },
  {
    title: 'Capture Pictures of Working & Equipment',
    src: imgCap4,
    alt: 'Mobile Project — Capture picture of equipment 1',
    caption: 'Technicians capture pictures of electrical equipment directly from the field.',
  },
  {
    title: 'Capture Pictures of Working & Equipment',
    src: imgCap6,
    alt: 'Mobile Project — Capture picture of equipment 2',
    caption: 'Additional camera view used when documenting testing work.',
  },
  {
    title: 'Capture Pictures of Working & Equipment',
    src: imgCap7,
    alt: 'Mobile Project — Capture picture of equipment 3',
    caption: 'Another example of photos captured for testing reports and evidence.',
  },
  {
    title: 'Additional Mobile Screen',
    src: imgScreen5,
    alt: 'Mobile Project — Additional screen 1',
    caption: 'Screen listing equipment items and their status for a selected construction.',
  },
  {
    title: 'Construction Detail Screen',
    src: imgScreen9,
    alt: 'Mobile Project — Additional screen 2',
    caption: 'Construction detail screen showing key information about the work site.',
  },
  {
    title: 'Equipment Information Screen',
    src: imgScreen10,
    alt: 'Mobile Project — Additional screen 3',
    caption: 'Screen for viewing equipment information stored in the backend system.',
  },
  {
    title: 'Construction List Screen',
    src: imgScreen11,
    alt: 'Mobile Project — Additional screen 4',
    caption: 'Screen for browsing the latest list of constructions rather than ticket details.',
  },
  {
    title: 'Field Testing Photo',
    src: imgField,
    alt: 'Mobile Project — Field testing photo',
    caption: 'On-site photo from real electrical testing work using the Mobile Project system.',
  },
];

function init() {
  const root = document.getElementById('screenshots-gallery');
  if (!root) return;

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';

  for (const item of items) {
    const figure = document.createElement('figure');
    figure.className =
      'bg-neutral-100 rounded-lg border border-neutral-200 shadow-md overflow-hidden flex flex-col h-full';

    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.className = 'w-full max-h-[520px] object-contain mx-auto bg-white';
    img.loading = 'lazy';

    const cap = document.createElement('figcaption');
    cap.className = 'p-3 md:p-4 border-t border-neutral-200 bg-base-100 flex-1 flex flex-col';
    const titleEl = document.createElement('strong');
    titleEl.className = 'block text-sm md:text-base mb-1';
    titleEl.textContent = item.title;
    const span = document.createElement('span');
    span.className = 'text-xs md:text-sm opacity-80';
    span.textContent = item.caption;
    cap.append(titleEl, span);

    figure.append(img, cap);
    grid.append(figure);
  }

  root.append(grid);
}

document.addEventListener('DOMContentLoaded', init);
