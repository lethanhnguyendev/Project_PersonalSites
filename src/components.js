export const PROFILE = {
  name: 'Tom Nguyen',
  role: 'Information Technology & Engineering Professional',
  location: 'Based in Australia',
  email: 'lethanhnguyen0706@gmail.com',
  phone: '+61 452 615 968',
  linkedin: 'https://www.linkedin.com/in/lethanh-nguyen',
  github: 'https://github.com/lethanhnguyendev',
};

const BASE = import.meta.env.BASE_URL;

export const NAV_ITEMS = [
  { href: 'index.html', label: 'Home', id: 'home' },
  {
    href: '#',
    label: 'Profile Career',
    id: 'profile-career',
    children: [
      { href: 'ProfileCareer/software-eng.html', label: 'Information Technology', id: 'it' },
      { href: 'ProfileCareer/engineering.html', label: 'Engineering', id: 'engineering' },
    ],
  },
  { href: 'portfolio.html', label: 'Portfolio', id: 'portfolio' },
  { href: 'contact.html', label: 'Contact', id: 'contact' },
];

export function getHeader(currentPageId = '') {
  return `
    <header class="navbar min-h-[72px] bg-white/90 backdrop-blur border-b border-neutral-200 sticky top-0 z-40">
      <div class="navbar-start">
        <a href="${BASE}index.html" class="btn btn-ghost px-2 normal-case text-xl font-bold text-primary flex items-center gap-3">
          <img
            src="${BASE}logo.svg"
            alt="${PROFILE.name} logo"
            class="h-10 w-10 md:h-12 md:w-12 object-contain"
          />
          <span>${PROFILE.name || 'Personal Site'}</span>
        </a>
      </div>
      <div class="navbar-center hidden md:flex">
        <ul class="menu menu-horizontal px-1 gap-1">
          ${NAV_ITEMS.map((item) => {
            if (item.children && item.children.length) {
              const isActive = item.children.some((child) => child.id === currentPageId);
              return `
                <li>
                  <details ${isActive ? 'open' : ''}>
                    <summary class="${isActive ? 'font-semibold text-primary' : ''} text-sm md:text-base px-3">
                      ${item.label}
                    </summary>
                    <ul class="bg-base-100 rounded-box shadow-md mt-2">
                      ${item.children
                        .map(
                          (child) => `
                            <li>
                              <a href="${BASE}${child.href}" class="${
                                currentPageId === child.id ? 'active font-semibold' : ''
                              } text-sm md:text-base">
                                ${child.label}
                              </a>
                            </li>
                          `,
                        )
                        .join('')}
                    </ul>
                  </details>
                </li>
              `;
            }

            return `
              <li>
                <a href="${BASE}${item.href}" class="${
                  currentPageId === item.id ? 'active font-semibold' : ''
                } text-sm md:text-base px-3">
                  ${item.label}
                </a>
              </li>
            `;
          }).join('')}
        </ul>
      </div>
      <div class="navbar-end">
        <a href="${BASE}contact.html" class="btn btn-primary btn-sm md:btn-md">Contact</a>
      </div>
    </header>
  `;
}

export function getFooter() {
  const year = new Date().getFullYear();
  return `
    <footer class="footer footer-center bg-neutral-100 text-neutral-700 p-8 mt-8">
      <aside>
        <p class="font-semibold text-base md:text-lg">${PROFILE.name}</p>
        <p class="text-sm md:text-base opacity-80">${PROFILE.role}</p>
        <div class="flex flex-wrap justify-center gap-4 mt-3 text-sm md:text-base">
          ${PROFILE.location ? `<span>${PROFILE.location}</span>` : ''}
          ${PROFILE.email ? `<a href="mailto:${PROFILE.email}" class="link link-primary">${PROFILE.email}</a>` : ''}
          ${PROFILE.phone ? `<a href="tel:${PROFILE.phone}" class="link link-primary">${PROFILE.phone}</a>` : ''}
          ${PROFILE.linkedin ? `<a href="${PROFILE.linkedin}" class="link link-primary" target="_blank" rel="noreferrer">LinkedIn</a>` : ''}
          ${PROFILE.github ? `<a href="${PROFILE.github}" class="link link-primary" target="_blank" rel="noreferrer">GitHub</a>` : ''}
        </div>
        <p class="mt-3 text-xs opacity-70">© ${year} ${PROFILE.name}. All rights reserved.</p>
      </aside>
    </footer>
  `;
}

