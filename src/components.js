export const PROFILE = {
  name: 'Tom Website',
  location: 'Adelaide, South Australia',
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

function buildMobileNavList(currentPageId) {
  return NAV_ITEMS.map((item) => {
    if (item.children && item.children.length) {
      const isOpen = item.children.some((child) => child.id === currentPageId);
      return `
        <li>
          <details class="group" ${isOpen ? 'open' : ''}>
            <summary class="${isOpen ? 'font-semibold text-primary' : ''}">${item.label}</summary>
            <ul class="p-0 pl-2">
              ${item.children
                .map(
                  (child) => `
                <li>
                  <a href="${BASE}${child.href}" class="${
                    currentPageId === child.id ? 'active font-semibold' : ''
                  }">${child.label}</a>
                </li>
              `,
                )
                .join('')}
            </ul>
          </details>
        </li>`;
    }
    return `
      <li>
        <a href="${BASE}${item.href}" class="${currentPageId === item.id ? 'active font-semibold' : ''}">${item.label}</a>
      </li>`;
  }).join('');
}

export function getHeader(currentPageId = '') {
  const mobileNavList = buildMobileNavList(currentPageId);
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
                    <ul class="bg-base-100 rounded-box shadow-md mt-2 min-w-max">
                      ${item.children
                        .map(
                          (child) => `
                            <li>
                              <a href="${BASE}${child.href}" class="${
                                currentPageId === child.id ? 'active font-semibold' : ''
                              } text-sm md:text-base whitespace-nowrap">
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
      <div class="navbar-end gap-1">
        <div class="dropdown dropdown-end md:hidden">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle" aria-label="Open navigation menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu menu-sm z-[60] mt-3 w-56 rounded-box border border-neutral-200 bg-base-100 p-2 shadow-lg"
          >
            ${mobileNavList}
          </ul>
        </div>
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

