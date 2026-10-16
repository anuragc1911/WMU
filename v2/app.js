/* Wealth Managers United — v2
   React 18 + Tailwind (CDN) in Tailgrids-style components. No build step: htm templates. */
const { useState, useEffect, useRef } = React;
const html = htm.bind(React.createElement);
const A = '../assets/';
const LOGIN = 'https://finesse.wmuindia.com/finesse-client/';
const W = 'https://www.wmuindia.com';
const TEL = 'tel:+918040952801';
const MAPS = 'https://goo.gl/maps/g5cf4dBfeX9CiuiP9';
const PRIVACY = W + '/privacy-policy/';

/* ---------------- icons (24px line set) ---------------- */
const I = {
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  chev: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="1"/><path d="m3 6 9 7 9-7"/>',
  cal: '<rect x="3.5" y="5" width="17" height="15" rx="1"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/><circle class="a" cx="15.5" cy="15" r="2"/>',
  family: '<circle cx="8.5" cy="7.5" r="3"/><circle cx="16.5" cy="9" r="2.4"/><path d="M3 20c0-3.6 2.4-6 5.5-6s5.5 2.4 5.5 6M14 20c0-2.6 1.2-4.4 2.8-4.4S20.5 17.4 20.5 20"/>',
  gem: '<path d="M7 4h10l4 5-9 11L3 9z"/><path d="M3 9h18M12 20 8.5 9 10 4M12 20l3.5-11L14 4"/>',
  award: '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/><circle class="a" cx="12" cy="9" r="2"/>',
  compass: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v2M12 18.5v2M3.5 12h2M18.5 12h2"/><circle class="a" cx="12" cy="12" r="2.2"/>',
  strategy: '<path d="M4 20 12 4l8 16z"/><path d="M8 12h8"/><circle class="a" cx="12" cy="16" r="1.8"/>',
  exec: '<path d="M5 4.5 19 12 5 19.5z"/><circle class="a" cx="10" cy="12" r="1.8"/>',
  monitor: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12l6-6"/><circle class="a" cx="18" cy="6" r="1.8"/>',
  ledger: '<rect x="4" y="4" width="16" height="16" rx="1"/><path d="M4 9.5h16M4 14.5h16M9.5 4v16"/>',
  report: '<path d="M6 3.5h8.5L18 7v13.5H6z"/><path d="M9.5 17v-3M12 17v-6M14.5 17v-4"/>',
  chart: '<path d="M3.5 20.5h17"/><path d="M4 16l4.5-4.5 3.5 3 7.5-8"/><circle class="a" cx="19.5" cy="6.5" r="1.8"/>',
  tree: '<path d="M12 20v-6M12 14 7 9M12 14l5-5M7 9V6M17 9V6"/><circle cx="7" cy="4.5" r="1.5"/><circle cx="17" cy="4.5" r="1.5"/><circle class="a" cx="12" cy="20" r="1.8"/>',
  swap: '<path d="M4 8h14l-3.5-3.5M20 16H6l3.5 3.5"/>',
  donut: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3.5"/><path class="a" d="M12 4a8 8 0 0 1 8 8h-4.5A3.5 3.5 0 0 0 12 8.5z"/>',
  star: '<path d="m12 3.5 2.6 5.6 6 .7-4.5 4.1 1.2 6-5.3-3-5.3 3 1.2-6L3.4 9.8l6-.7z"/>',
  shieldc: '<path d="M12 3.5 19 6v5.5c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  diamond: '<path d="M12 3 21 12 12 21 3 12z"/><circle class="a" cx="12" cy="12" r="2.2"/>',
  heart: '<path d="M12 20s-8-4.8-8-10.2C4 7 6 5 8.4 5c1.6 0 2.9.9 3.6 2.2C12.7 5.9 14 5 15.6 5 18 5 20 7 20 9.8 20 15.2 12 20 12 20z"/>',
  trend: '<path d="M3.5 20.5h17M4 17l5-5 3.5 3.5L20 8"/><path d="M15.5 8H20v4.5"/>',
  squares: '<rect x="3.5" y="3.5" width="11" height="11" rx="1"/><rect x="9.5" y="9.5" width="11" height="11" rx="1"/>',
  person: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c0-4 3.1-6.5 7-6.5s7 2.5 7 6.5"/>',
  leaf: '<path d="M5 19C5 10 10 5 19.5 4.5 19 14 14 19 5 19z"/><path d="M5 19 13 11"/>',
  house: '<path d="M4 20.5V10l8-6.5 8 6.5v10.5z"/><path d="M10 20.5V15h4v5.5"/>',
  bars: '<path d="M4 20.5h16"/><rect x="5" y="13" width="3" height="5"/><rect x="10.5" y="9" width="3" height="9"/><rect x="16" y="5" width="3" height="13"/>',
  line: '<path d="M3.5 14c4-2.5 6.5-2.5 9-1.5s5 .5 8-1.5"/><path d="M3.5 19.5h17"/>',
  ingot: '<path d="M5 15h6l1.5 5h-9z"/><path d="M13 15h6l1.5 5h-9z"/><path d="M9 9h6l1.5 5h-9z"/>',
  nodes: '<circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7.5l3 3M17 7.5l-3 3M7 16.5l3-3M17 16.5l-3-3"/><circle class="a" cx="12" cy="12" r="2.4"/>',
  wave: '<path d="M3 12c2.2-4 4.4-4 6.6 0s4.4 4 6.6 0 3.3-3 4.8-2"/><path d="M3 17h18"/>',
  arch: '<path d="M4.5 20.5V11a7.5 7.5 0 0 1 15 0v9.5"/><path d="M9 20.5V12a3 3 0 0 1 6 0v8.5"/>',
  scale: '<path d="M12 4v16.5M8 20.5h8M5 7h14"/><path d="M5 7 3 12h4zM19 7l-2 5h4z"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><ellipse cx="12" cy="12" rx="3.6" ry="8.5"/><path d="M3.5 12h17"/>',
  route: '<circle cx="6" cy="18" r="2"/><path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6"/><circle class="a" cx="18" cy="6" r="2"/>',
  pie: '<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5V12h8.5"/>',
  zigzag: '<path d="M3.5 16l4-6 4 4 4-7 5 6"/><path d="M3.5 20.5h17"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle class="a" cx="12" cy="12" r="1.8"/>',
  loop: '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 4.5v4h-4"/>',
  bank: '<path d="M3.5 9 12 4l8.5 5z"/><path d="M5.5 10v7M10 10v7M14 10v7M18.5 10v7M3.5 20h17"/>',
  spark: '<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"/>',
};
const Ico = ({ n, c = 'w-6 h-6' }) => html`<svg viewBox="0 0 24 24" className=${'ico ' + c} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" dangerouslySetInnerHTML=${{ __html: I[n] || '' }}></svg>`;
const LI = ({ c = 'w-4 h-4' }) => html`<svg viewBox="0 0 24 24" className=${c} fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`;

/* ---------------- data ---------------- */
const ABOUT = [
  { to: '/', label: 'About us', desc: 'Who we are and what we stand for' },
  { to: '/about-you', label: 'About you', desc: 'Who we serve' },
  { to: '/advantage', label: 'WMU advantage', desc: 'Why clients choose us' },
  { to: '/people', label: 'People', desc: 'Leadership, advisors and team' },
];
const SERV = [
  { to: '/private-wealth-management', label: 'Private wealth management', desc: 'Asset management, centred on you', icon: 'chart' },
  { to: '/family-office', label: 'Family office', desc: 'Beyond traditional asset management', icon: 'tree' },
  { to: '/investment-banking', label: 'Investment banking', desc: 'Buy side and sell side', icon: 'swap' },
];
const STAGES = [['compass', 'Planning', 'A financial plan built around your goals.'], ['strategy', 'Strategizing', 'Strategic and tactical asset allocation.'], ['exec', 'Execution', 'The right investments, executed well.'], ['monitor', 'Monitoring', 'Markets, managers and risk, tracked continuously.'], ['ledger', 'Accounting', 'Records and capital accounts kept in order.'], ['report', 'Reporting', 'One clear picture of your wealth.']];
const VALUES = [['star', 'Client first', 'Clients first, the company second, ourselves last. Serve clients well and our success follows.'], ['shieldc', 'Integrity', 'High ethical standards at work and in life. Truthful, and true to our word — every single time.'], ['diamond', 'Reputation and people', 'Full compliance, a guarded reputation, and employee ownership that aligns our people with shareholders.'], ['heart', 'Client experience', 'Comfort, trust and simple answers to complex problems — in complete confidence.'], ['trend', 'Performance', 'A benchmark on every parameter, and the best results we can deliver.'], ['squares', 'Transparency', 'Open in all our dealings, especially with clients.']];
const ETHOS = [['Sarve jana sukhino bhavanthu', 'May all the people in the world be happy'], ['Sarva Dharma Samanwaya', 'May all humans be treated equally'], ['Ahimso Paramo Dharma', 'Non-violence is the highest duty'], ['Satyameva Jayathe', 'Let the truth alone succeed'], ['Jana Seva, Janardhana Seva', 'Service of the masses is worship of the Lord']];
const AWARDS = [
  { y: '2013', c: '3rd Annual Convention · Sep 21, 2013', items: [['Highest Net Mobilization – Equity', 'incl. balanced funds', '2nd'], ['Highest Net Mobilization – Debt', 'incl. FMP/MIP', '2nd']] },
  { y: '2012', c: '2nd Annual Convention', items: [['Highest Net Mobilization – Equity', '', '1st'], ['Highest Net Mobilization – Debt', '', '2nd']] },
  { y: '2011', c: '1st Annual Convention', items: [['Best Emerging IFA', '', 'Gold']] },
];
const FOUNDERS = [
  { name: 'Jay Prakash Pai', role: 'Founder & CEO', img: 'jay.jpg', line: '25 years in private banking, at HSBC and Deutsche Bank.', li: 'https://www.linkedin.com/in/jayaprakash-pai-29b5a94/',
    bio: ['B.Com, CFPCM, ACS and LLB, with about 25 years in financial services. He headed HSBC Private Banking for Southern India for about five years, personally managing the bank’s top 20 relationships in the region.', 'Before that: Deutsche Bank Private Wealth Management (about seven years) and Canfin Homes, Canara Bank’s housing loan subsidiary. Private Banking Certification, Wealth Management Institute of Singapore.', 'Outside work: Ironman (Copenhagen, 2019), ultra marathoner, trekking, travel and golf.'] },
  { name: 'Kavitha Jayaram', role: 'Co-founder & COO', img: 'kavitha.jpg', line: '13 years at HSBC, including HSBC Private Banking.',
    bio: ['Heads operations, so clients get high-quality support every day. Joined HSBC in 1997 after Xerox Engineering, and spent 13 years across retail banking operations, business development, trade services, internal control and compliance.', 'This included three years serving ultra high net-worth clients as AVP, Client Services, HSBC Private Banking.', 'Outside work: marathon runner and keen traveller.'] },
];
const ADVISORS = [
  { name: 'Dilip R Mehta', line: 'Former CEO across telecom, consumer products, retail and entertainment.', more: 'President & CEO, Entertainment Sector, RPG Group; MD, HMV Saregama India; MD, Spencer & Co. Advisor and mentor at NSR Centre for Entrepreneurial Learning, IIM Bangalore, and Managing Trustee of CRAG (Citizens’ Rights Action Group). MBA, IIM Ahmedabad; AEP, Kellogg.' },
  { name: 'S Sunderarajan', line: '20+ years as CEO and CIO at ANZ and Lehman Brothers.', more: 'Built and ran 1,000+ person organisations; interests in data analytics, risk management, investment banking and leadership coaching. IIT Kharagpur and IIT Madras; M.Sc.E, University of New Brunswick; Kellogg CEO programme. Adjunct Professor of IT & Finance, NMIMS Bangalore.' },
];
const TEAM = [['Manish Yennu', 'Senior Vice President, Client Relations', 'manish.jpg', 'https://www.linkedin.com/in/manishyennu/', 'client'], ['Siddharth Menon', 'Senior Vice President, Client Relations', 'siddharth.jpg', 'https://www.linkedin.com/in/menonsiddharth/', 'client'], ['Samir Padival', 'Assistant Vice President, Client Relations', 'samir.jpg', 'https://www.linkedin.com/in/spadival/', 'client'], ['Balaji K R', 'Vice President, Client Relations', 'balaji.jpg', 'https://www.linkedin.com/in/balaji-k-r-509a0915/', 'client'], ['Mythri Raviraj', 'Research Analyst', 'mythri.jpg', '', 'research'], ['Vidyashree B S', 'Head of Compliance & Operations', 'vidyashree.jpg', '', 'research service'], ['Shivani N Nanjappa', 'Customer Service Manager', 'shivani.jpg', 'https://www.linkedin.com/in/shivani-nellira-nanjappa-0047a11a4/', 'service'], ['Ashwin Nambiar', 'Customer Service Manager', 'ashwin.jpg', '', 'service'], ['Raghavendra H N', 'Client Account Manager', 'raghavendra.jpg', 'https://www.linkedin.com/in/raghavendra-hn-9156004b/', 'client'], ['Reena Pereira', 'Customer Service Manager', 'reena.jpg', 'https://www.linkedin.com/in/reena-pinto-71363b4/', 'service'], ['Nithin Kumar', 'Customer Service Manager', 'nithin.jpg', 'https://www.linkedin.com/in/nithin-kumar-17b81a158/', 'service'], ['Santosh G', 'Customer Service Manager', 'santosh.jpg', '', 'service'], ['Shridhar Hegde', 'Customer Service Manager', 'shridhar.jpg', 'https://www.linkedin.com/in/shridhar-hegde-190016101/', 'service'], ['Anand Velu', 'Office Assistant', 'anand.jpg', '', 'office'], ['Suresh M', 'Office Assistant', 'suresh.jpg', '', 'office']];
const CATS = [['all', 'Everyone'], ['client', 'Client relations'], ['service', 'Service & operations'], ['research', 'Research & compliance'], ['office', 'Office']];
const PROFILES = [{ n: 'Conservative', r: 0, s: '100%', k: '0%', d: '100% safe investments.' }, { n: 'Moderately conservative', r: 25, s: '70–80%', k: '20–30%', d: '20 to 30% in risk investments, the balance in safe investments.' }, { n: 'Moderately aggressive', r: 50, s: '50%', k: '50%', d: '50% safe investments and 50% risk investments.' }, { n: 'Aggressive', r: 70, s: '30%', k: '70%', d: '70% risky investments and 30% safe investments.' }, { n: 'Very aggressive', r: 100, s: '0%', k: '100%', d: '100% risky investments.' }];
const ASSETS = [
  ['bars', 'Equities', 'One of the most vibrant asset classes. We back managers who consistently outperform, and buy indices directly for broad or tactical exposure.', ['Equity mutual funds', 'Direct stocks', 'Third-party PMS', 'ETFs', 'Equity-linked notes', 'Offshore stocks and funds', 'Private equity funds']],
  ['line', 'Fixed income', 'Stability for every portfolio, and room to rebalance. Government bonds held directly; investment-grade and high-yield through funds and indices.', ['Debt mutual funds', 'Government and corporate bonds', 'Bank and corporate deposits', 'Structured products', 'Foreign currency bonds']],
  ['house', 'Property', 'Direct residential and commercial real estate first — sourced through our broker network — plus real estate funds and listed property.', []],
  ['ingot', 'Commodities', 'A small, deliberate exposure to gold, energy, agriculture and metals, through funds and ETFs in India or Singapore.', []],
  ['nodes', 'Private equity', 'Diversified across managers, not concentrated in one or two — through venture and development capital.', []],
  ['wave', 'Derivatives', 'Futures and options to hedge portfolios or concentrated positions, used selectively.', []],
  ['shieldc', 'Insurance', 'Life and non-life cover for known risks, sourced through open architecture at fair cost.', []],
];
const POSTS = [
  { slug: 'blog-asset-allocation', t: 'Asset allocation', d: '19 Dec 2021', e: 'Why the right mix — not market timing — drives most of your returns.', img: 'blog/portofio-returns.png' },
  { slug: 'blog-what-category-of-investments-should-i-look-at', t: 'What category of investments should I look at?', d: '21 Apr 2021', e: 'Mutual funds, PMS or direct stocks: equity, by risk.', img: 'blog/equity-capital.png' },
  { slug: 'blog-is-it-enough-to-just-save-money', t: 'Is it enough to just save money?', d: '8 Feb 2021', e: 'Saving is a discipline. Planning makes it pay.', img: 'blog/blogheader-revised.jpg', cover: true },
];

/* ---------------- primitives ---------------- */
const jump = (id) => (e) => { if (e) e.preventDefault(); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth' }); };
const cx = (...a) => a.filter(Boolean).join(' ');
const BTN = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/15',
  outline: 'border border-stroke bg-white text-dark hover:border-primary hover:text-primary',
  white: 'bg-white text-dark hover:bg-gray-2',
  ghostw: 'border border-white/40 text-white hover:bg-white/10',
};
function Btn({ href, onClick, v = 'primary', className = '', children, arrow = true, target }) {
  const cls = cx('group inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium transition duration-200 active:scale-[.98]', BTN[v], className);
  const inner = html`${children}${arrow && html`<${Ico} n="arrow" c="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />`}`;
  return href ? html`<a href=${href} onClick=${onClick} target=${target} rel=${target ? 'noopener' : undefined} className=${cls}>${inner}</a>` : html`<button type="button" onClick=${onClick} className=${cls}>${inner}</button>`;
}
const Badge = ({ children, tone = 'primary' }) => html`<span className=${cx('inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium', tone === 'primary' ? 'bg-primary/5 text-primary' : 'bg-secondary/10 text-secondary')}><span className=${cx('h-1.5 w-1.5 rounded-full', tone === 'primary' ? 'bg-primary' : 'bg-secondary')}></span>${children}</span>`;
const Container = ({ className = '', children }) => html`<div className=${cx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}>${children}</div>`;
function Title({ eyebrow, title, desc, center, dark }) {
  return html`<div data-reveal className=${cx('mb-12 lg:mb-16', center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl')}>
    ${eyebrow && html`<span className=${cx('mb-3 block text-base font-semibold', dark ? 'text-white/70' : 'text-primary')}>${eyebrow}</span>`}
    <h2 className=${cx('text-3xl font-bold leading-tight sm:text-4xl md:text-[40px] md:leading-[1.2]', dark ? 'text-white' : 'text-dark')}>${title}</h2>
    ${desc && html`<p className=${cx('mt-4 text-base sm:text-lg', dark ? 'text-white/75' : 'text-body')}>${desc}</p>`}
  </div>`;
}
const Dots = ({ className = '' }) => html`<svg className=${cx('pointer-events-none absolute', className)} width="134" height="106" viewBox="0 0 134 106" fill="none" aria-hidden="true">${Array.from({ length: 48 }, (_, k) => html`<circle key=${k} cx=${1.5 + (k % 8) * 18.5} cy=${1.5 + Math.floor(k / 8) * 20} r="1.66" fill="currentColor" />`)}</svg>`;
const IconBox = ({ n, tone = 'primary' }) => html`<span className=${cx('flex h-14 w-14 shrink-0 items-center justify-center', tone === 'primary' ? 'bg-primary/5 text-primary' : 'bg-secondary/10 text-secondary')}><${Ico} n=${n} c="w-7 h-7" /></span>`;

/* ---------------- navbar ---------------- */
function Navbar({ route }) {
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(null);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(scrollY > 8); f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f); }, []);
  useEffect(() => { setOpen(false); setDd(null); }, [route]);
  const groups = [{ label: 'About', items: ABOUT }, { label: 'Services', items: SERV }];
  const linkCls = (on) => cx('px-4 py-2 text-[15px] font-medium transition-colors', on ? 'text-primary' : 'text-dark hover:text-primary');
  return html`<header className=${cx('sticky top-0 z-50 w-full bg-white/95 backdrop-blur transition-shadow', sc && 'shadow-[0_1px_0_#E5E7EB,0_10px_30px_-18px_rgba(17,25,40,.25)]')}>
    <${Container} className="flex h-[76px] items-center justify-between">
      <a href="#/" className="shrink-0" aria-label="Wealth Managers United, home"><img src=${A + 'brand/wmu-lockup.png'} alt="WMU — At your service since 2011" className="h-11 w-auto sm:h-12" /></a>
      <nav className="hidden items-center lg:flex" aria-label="Primary">
        ${groups.map((g) => {
          const on = g.items.some((i) => i.to === route);
          return html`<div key=${g.label} className="relative" onMouseEnter=${() => setDd(g.label)} onMouseLeave=${() => setDd(null)}>
            <button type="button" className=${cx(linkCls(on), 'flex items-center gap-1')} aria-expanded=${dd === g.label} onClick=${() => setDd(dd === g.label ? null : g.label)}>${g.label}<${Ico} n="chev" c=${cx('h-4 w-4 transition-transform duration-200', dd === g.label && 'rotate-180')} /></button>
            <div className=${cx('absolute left-0 top-full pt-2 transition duration-200', dd === g.label ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-1 opacity-0')}>
              <div className="w-[320px] border border-stroke bg-white p-2 shadow-pop">
                ${g.items.map((i) => html`<a key=${i.to} href=${'#' + i.to} className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-1">
                  ${i.icon && html`<span className="mt-0.5 text-secondary"><${Ico} n=${i.icon} c="h-5 w-5" /></span>`}
                  <span><span className=${cx('block text-[15px] font-medium', route === i.to ? 'text-primary' : 'text-dark')}>${i.label}</span><span className="block text-sm text-body">${i.desc}</span></span></a>`)}
              </div>
            </div>
          </div>`;
        })}
        <a href="#/products" className=${linkCls(route === '/products')}>Products</a>
        <a href="#/blog" className=${linkCls(route.startsWith('/blog'))}>Blog</a>
      </nav>
      <div className="flex items-center gap-2">
        <a href=${LOGIN} className="hidden px-4 py-2 text-[15px] font-medium text-dark hover:text-primary lg:inline-flex">Client login</a>
        <${Btn} onClick=${jump('contact')} className="hidden !py-2.5 sm:inline-flex" arrow=${false}>Get in touch<//>
        <button type="button" className="inline-flex h-11 w-11 items-center justify-center border border-stroke text-dark lg:hidden" aria-label=${open ? 'Close menu' : 'Open menu'} aria-expanded=${open} onClick=${() => setOpen(!open)}><${Ico} n=${open ? 'x' : 'menu'} /></button>
      </div>
    <//>
    <div className=${cx('overflow-hidden border-t border-stroke bg-white transition-[max-height] duration-300 lg:hidden', open ? 'max-h-[85vh] overflow-y-auto' : 'max-h-0 border-t-0')}>
      <${Container} className="py-4">
        ${groups.map((g) => html`<div key=${g.label} className="mb-3"><p className="px-1 py-2 text-sm font-semibold text-body">${g.label}</p>
          ${g.items.map((i) => html`<a key=${i.to} href=${'#' + i.to} className=${cx('block px-1 py-2.5 text-base font-medium', route === i.to ? 'text-primary' : 'text-dark')}>${i.label}</a>`)}</div>`)}
        <a href="#/products" className="block px-1 py-2.5 text-base font-medium text-dark">Products</a>
        <a href="#/blog" className="block px-1 py-2.5 text-base font-medium text-dark">Blog</a>
        <div className="mt-4 grid gap-2"><${Btn} onClick=${(e) => { setOpen(false); jump('contact')(e); }}>Get in touch<//><${Btn} href=${LOGIN} v="outline" arrow=${false}>Client login<//></div>
      <//>
    </div>
  </header>`;
}

/* ---------------- shared sections ---------------- */
function PageHeader({ title, desc, crumb }) {
  return html`<section className="relative overflow-hidden bg-gray-1 py-16 lg:py-24">
    <${Dots} className="right-6 top-8 hidden text-primary/30 md:block" /><${Dots} className="bottom-6 left-4 text-secondary/25" />
    <${Container} className="relative text-center">
      <div data-reveal>
        <nav aria-label="Breadcrumb" className="mb-4 flex items-center justify-center gap-2 text-sm"><a href="#/" className="text-body hover:text-primary">Home</a><span className="text-body/60">/</span><span className="text-primary">${crumb || title}</span></nav>
        <h1 className="mx-auto max-w-3xl text-3xl font-bold leading-tight text-dark sm:text-4xl md:text-5xl">${title}</h1>
        ${desc && html`<p className="mx-auto mt-5 max-w-2xl text-base text-body sm:text-lg">${desc}</p>`}
      </div>
    <//>
  </section>`;
}
function FeatureCard({ icon, title, desc, href, tone }) {
  const inner = html`<${IconBox} n=${icon} tone=${tone} /><h3 className="mt-6 text-xl font-semibold text-dark transition-colors group-hover:text-primary">${title}</h3><p className="mt-3 text-base">${desc}</p>
    ${href && html`<span className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-dark group-hover:text-primary">Learn more <${Ico} n="arrow" c="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>`}`;
  const cls = 'group block h-full border border-stroke bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-card';
  return href ? html`<a data-reveal href=${href} className=${cls}>${inner}</a>` : html`<div data-reveal className=${cls}>${inner}</div>`;
}
function Accordion({ items, tone = 'secondary' }) {
  const [open, setOpen] = useState(0);
  return html`<div className="space-y-3">${items.map(([icon, t, d], k) => {
    const on = open === k;
    return html`<div key=${t} data-reveal className=${cx('border bg-white transition-colors', on ? 'border-secondary/40 shadow-card' : 'border-stroke')}>
      <button type="button" className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6" aria-expanded=${on} onClick=${() => setOpen(on ? -1 : k)}>
        ${icon && html`<span className="text-secondary"><${Ico} n=${icon} /></span>`}
        <span className="flex-1 text-base font-semibold text-dark sm:text-lg">${t}</span>
        <span className=${cx('flex h-9 w-9 shrink-0 items-center justify-center transition', on ? 'bg-secondary text-white' : 'bg-secondary/10 text-secondary')}><${Ico} n="plus" c=${cx('h-4 w-4 transition-transform duration-300', on && 'rotate-45')} /></span>
      </button>
      <div className=${cx('grid transition-[grid-template-rows] duration-300', on ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}><div className="overflow-hidden"><p className="px-5 pb-5 text-base sm:px-6 sm:pl-[64px]">${d}</p></div></div>
    </div>`;
  })}</div>`;
}
function Contact() {
  const [st, setSt] = useState('');
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    if (f.hp.value) return;
    if (!f.checkValidity()) { f.reportValidity(); setSt('Please fill in the required fields.'); return; }
    const n = f.fname.value.trim();
    setSt('Opening your email app…');
    location.href = 'mailto:feedback@wmuindia.com?subject=' + encodeURIComponent('Website enquiry from ' + n) + '&body=' + encodeURIComponent('Name: ' + n + '\nEmail: ' + f.email.value.trim() + '\nPhone: ' + f.phone.value.trim());
  };
  const field = 'w-full border border-stroke bg-white px-5 py-3 text-base text-dark outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10';
  return html`<section id="contact" className="relative overflow-hidden bg-white py-20 lg:py-28">
    <${Container}>
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <span className="mb-3 block text-base font-semibold text-primary">Contact us</span>
          <h2 className="text-3xl font-bold leading-tight text-dark sm:text-4xl md:text-[40px]">Get in touch</h2>
          <p className="mt-4 max-w-md text-base sm:text-lg">Tell us a little about you and we’ll call you back.</p>
          <div className="mt-10 space-y-6">
            ${[['phone', 'Phone', html`<a href=${TEL} className="hover:text-primary">+91 80 4095 2801</a>`], ['pin', 'Office', html`<span>No. 2, 3rd floor, Hayes Road, Richmond Town, Bangalore 560 025</span>`], ['mail', 'Email', html`<a href="mailto:feedback@wmuindia.com" className="hover:text-primary">feedback@wmuindia.com</a>`]].map(([n, l, v]) => html`<div key=${l} className="flex gap-5"><${IconBox} n=${n} /><div><h3 className="text-lg font-semibold text-dark">${l}</h3><p className="mt-1 text-base">${v}</p></div></div>`)}
          </div>
          <div className="mt-8"><${Btn} href=${MAPS} target="_blank" v="secondary">Get directions<//></div>
        </div>
        <form data-reveal noValidate onSubmit=${submit} className="relative border border-stroke bg-white p-8 shadow-card sm:p-10">
          <h3 className="text-2xl font-semibold text-dark">Request a call back</h3>
          <p className="mt-1 text-sm">All fields are required.</p>
          <div className="mt-6 space-y-4">
            <label className="block"><span className="mb-2 block text-sm font-medium text-dark">Name *</span><input name="fname" required autoComplete="name" className=${field} /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-dark">Email *</span><input name="email" type="email" required autoComplete="email" className=${field} /></label>
            <label className="block"><span className="mb-2 block text-sm font-medium text-dark">Phone *</span><input name="phone" type="tel" required autoComplete="tel" className=${field} /></label>
            <input name="hp" tabIndex="-1" autoComplete="off" className="absolute -left-[9999px]" aria-hidden="true" />
            <label className="flex items-start gap-3 text-sm"><input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[#d71920]" /><span>I agree to the <a href=${PRIVACY} className="text-dark underline underline-offset-2">Privacy Policy</a> *</span></label>
          </div>
          <button type="submit" className="group mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-primary-dark active:scale-[.99]">Send <${Ico} n="arrow" c="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></button>
          <p className="mt-3 min-h-[1.25rem] text-sm" role="status" aria-live="polite">${st}</p>
        </form>
      </div>
    <//>
  </section>`;
}
function Footer() {
  const col = (t, links) => html`<div><h4 className="mb-5 text-lg font-semibold text-white">${t}</h4><ul className="space-y-3">${links.map(([h, l]) => html`<li key=${l}><a href=${h} className="text-base text-gray-400 transition-colors hover:text-white">${l}</a></li>`)}</ul></div>`;
  return html`<footer className="on-dark bg-dark pt-16 lg:pt-20">
    <${Container}>
      <div className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4"><img src=${A + 'brand/wmu-logo-white.png'} alt="WMU — At your service since 2011. Your prosperity is our passion." className="w-56" />
          <p className="mt-6 max-w-xs text-base text-gray-400">Holistic, objective and independent wealth management. Bangalore, since 2011.</p>
          <a href=${TEL} className="mt-4 inline-flex items-center gap-2 text-white hover:text-primary"><${Ico} n="phone" c="h-4 w-4" />+91 80 4095 2801</a></div>
        <div className="lg:col-span-2 lg:col-start-6">${col('About', ABOUT.map((i) => ['#' + i.to, i.label]))}</div>
        <div className="lg:col-span-3">${col('Services', [...SERV.map((i) => ['#' + i.to, i.label]), ['#/products', 'Products']])}</div>
        <div className="lg:col-span-2">${col('More', [['#/blog', 'Blog'], [LOGIN, 'Client login'], [W + '/commission-disclosure/', 'Commission disclosure'], [PRIVACY, 'Privacy policy']])}</div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-7 text-sm text-gray-400"><p>© ${new Date().getFullYear()} Wealth Managers United (I) Pvt. Ltd.</p><a href="../index.html" className="hover:text-white">View classic site</a></div>
    <//>
  </footer>`;
}

/* ---------------- home blocks ---------------- */
function HomeHero() {
  return html`<section className="relative overflow-hidden bg-white pb-16 pt-10 lg:pb-24 lg:pt-16">
    <${Container}>
      <div className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6" data-reveal>
          <${Badge}>Since 2011 · Bangalore<//>
          <h1 className="mt-6 text-4xl font-bold leading-[1.12] text-dark sm:text-5xl lg:text-[56px]">Holistic, objective and independent wealth management.</h1>
          <p className="mt-6 max-w-xl text-lg">For an exclusive circle of ultra high net-worth families and individuals.</p>
          <div className="mt-9 flex flex-wrap gap-3"><${Btn} onClick=${jump('contact')}>Get in touch<//><${Btn} href="#/private-wealth-management" v="outline">Explore services<//></div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <div className="flex -space-x-3">${['manish', 'siddharth', 'balaji', 'vidyashree'].map((p) => html`<img key=${p} src=${A + 'people/' + p + '.jpg'} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-white" />`)}</div>
            <p className="text-sm"><span className="font-semibold text-dark">17 people</span>, led by former HSBC and Deutsche Bank private bankers</p>
          </div>
        </div>
        <div className="relative lg:col-span-6" data-reveal>
          <${Dots} className="-left-6 -top-6 text-primary/40" /><${Dots} className="-bottom-6 -right-4 text-secondary/30" />
          <div className="relative grid grid-cols-5 gap-4">
            <img src=${A + 'people/jay.jpg'} alt="Jay Prakash Pai, Founder & CEO" className="col-span-3 aspect-[4/5] w-full object-cover" />
            <div className="col-span-2 flex flex-col gap-4">
              <img src=${A + 'people/kavitha.jpg'} alt="Kavitha Jayaram, Co-founder & COO" className="aspect-[4/5] w-full object-cover" />
              <div className="flex flex-1 flex-col justify-center bg-secondary p-5 text-white on-dark"><span className="whitespace-nowrap text-2xl font-bold tabular-nums sm:text-3xl xl:text-4xl">INR 25 Cr</span><span className="mt-1 text-sm text-white/80">Family office minimum</span></div>
            </div>
            <a href="#awards" onClick=${jump('awards')} className="absolute -bottom-5 left-4 flex items-center gap-3 bg-white px-4 py-3 shadow-pop transition hover:-translate-y-0.5 sm:left-6">
              <img src=${A + 'brand/apple-touch-icon.png'} alt="" className="h-9 w-9" /><span><span className="block text-sm font-semibold text-dark">KAMFA award winner</span><span className="block text-xs">5 awards, 2011–2013</span></span></a>
          </div>
        </div>
      </div>
    <//>
  </section>`;
}
function Stats() {
  const S = [['cal', '2011', 'Founded in Bangalore'], ['family', 'INR 25 Cr', 'Family office minimum'], ['gem', 'INR 10 Cr', 'Private wealth minimum'], ['award', '5', 'KAMFA awards']];
  return html`<section className="bg-white pb-16 lg:pb-20"><${Container}>
    <div className="grid grid-cols-2 border-l border-t border-stroke lg:grid-cols-4">${S.map(([n, v, l]) => html`<div key=${l} data-reveal className="flex flex-col gap-3 border-b border-r border-stroke p-5 sm:flex-row sm:items-center sm:gap-4 sm:p-7"><span className="text-secondary"><${Ico} n=${n} c="h-8 w-8" /></span><div><p className="text-2xl font-bold text-dark tabular-nums sm:text-3xl">${v}</p><p className="mt-1 text-sm">${l}</p></div></div>`)}</div>
  <//></section>`;
}
function Ethos() {
  const [i, setI] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => { if (hold || matchMedia('(prefers-reduced-motion: reduce)').matches) return; const t = setInterval(() => setI((x) => (x + 1) % ETHOS.length), 5000); return () => clearInterval(t); }, [hold]);
  return html`<section id="ethos" className="bg-gray-1 py-20 lg:py-28"><${Container}>
    <${Title} eyebrow="Our ethos" title="Five Indian principles behind our vision" />
    <div className="grid gap-6 lg:grid-cols-12" onMouseEnter=${() => setHold(true)} onMouseLeave=${() => setHold(false)}>
      <div className="flex gap-2 overflow-x-auto pb-1 lg:col-span-5 lg:flex-col lg:overflow-visible" role="tablist" aria-label="Ethos principles">
        ${ETHOS.map(([s], k) => html`<button key=${s} role="tab" aria-selected=${i === k} onClick=${() => { setI(k); setHold(true); }} className=${cx('relative shrink-0 border px-5 py-4 text-left transition', i === k ? 'border-primary/30 bg-white text-dark shadow-card' : 'border-transparent text-body hover:bg-white/70')}>
          <span className="flex items-center gap-4"><span className=${cx('flex h-8 w-8 shrink-0 items-center justify-center text-sm font-semibold tabular-nums', i === k ? 'bg-primary text-white' : 'bg-white text-body')}>${k + 1}</span><span className="hidden text-base font-medium lg:inline">${s}</span></span>
          ${i === k && !hold && html`<span key=${'p' + i} className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-primary/60" style=${{ animation: 'wmuProg 5s linear forwards' }}></span>`}
        </button>`)}
      </div>
      <div className="relative min-h-[260px] overflow-hidden border border-stroke bg-white p-8 sm:p-12 lg:col-span-7" role="tabpanel">
        <${Dots} className="right-6 top-6 text-secondary/20" />
        <div key=${i} style=${{ animation: 'wmuIn .6s cubic-bezier(.16,1,.3,1) both' }}>
          <span className="text-sm font-semibold text-primary tabular-nums">${String(i + 1).padStart(2, '0')} / 05</span>
          <p lang="sa-Latn" className="mt-6 text-3xl font-bold leading-tight text-dark sm:text-4xl lg:text-5xl">${ETHOS[i][0]}</p>
          <p className="mt-5 flex items-center gap-3 text-lg"><span className="h-0.5 w-8 bg-primary"></span>${ETHOS[i][1]}</p>
        </div>
      </div>
    </div>
  <//></section>`;
}
function Awards() {
  return html`<section id="awards" className="on-dark relative overflow-hidden bg-secondary py-20 lg:py-28"><${Dots} className="right-8 top-10 text-white/20" /><${Container}>
    <${Title} dark eyebrow="Recognition" title="Recognised by KAMFA" desc="Karnataka Association of Mutual Fund Advisors — five awards in three years." />
    <ol className="relative space-y-10 border-l border-white/25 pl-8 sm:pl-10">
      ${AWARDS.map((a) => html`<li key=${a.y} data-reveal className="relative">
        <span className="absolute -left-[41px] top-1 flex h-4 w-4 items-center justify-center bg-white sm:-left-[49px]"><span className="h-2 w-2 bg-primary"></span></span>
        <p className="text-3xl font-bold text-white tabular-nums">${a.y}</p><p className="mt-1 text-sm text-white/70">${a.c}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">${a.items.map(([t, s, p]) => {
          const gold = p === 'Gold';
          return html`<div key=${t} className=${cx('relative flex items-center justify-between gap-4 overflow-hidden px-5 py-4', gold ? 'bg-[linear-gradient(115deg,#8a5a00,#c08a16_22%,#f3cf63_46%,#d9a62e_62%,#9a6703)] shadow-[0_10px_30px_-12px_rgba(226,185,59,.75)]' : 'bg-white/10')}>
            ${gold && html`<span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/70 to-transparent" style=${{ animation: 'wmuSheen 3.6s cubic-bezier(.76,0,.24,1) infinite' }}></span>`}
            <span className="relative"><span className=${cx('block text-base font-medium text-white', gold && '[text-shadow:0_0_14px_rgba(255,246,210,.9),0_1px_2px_rgba(80,48,0,.55)]')}>${t}</span>${s && html`<span className="block text-sm text-white/70">${s}</span>`}</span>
            <span className=${cx('relative shrink-0 rounded-full px-3 py-1 text-xs font-semibold', gold ? 'bg-white text-[#8a5a00]' : p === '1st' ? 'bg-white text-secondary' : 'bg-white/15 text-white')}>${p === 'Gold' ? 'Gold' : p + ' position'}</span>
          </div>`;
        })}</div>
      </li>`)}
    </ol>
  <//></section>`;
}

/* ---------------- pages ---------------- */
function Home() {
  return html`<${HomeHero} /><${Stats} />
    <section className="bg-white py-20 lg:py-28"><${Container}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5"><${Title} eyebrow="What we do" title="Every part of your wealth, in one place" desc="We take the day-to-day hassle of managing wealth off your hands — so you can spend your time on what matters." />
          <${Btn} href="#/advantage" v="secondary">Why WMU<//></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">${STAGES.map(([n, t, d], k) => html`<div key=${t} data-reveal className="group flex gap-4 border border-stroke p-5 transition hover:border-secondary/40 hover:shadow-card">
          <span className="text-secondary"><${Ico} n=${n} c="h-7 w-7" /></span><div><p className="text-xs font-semibold text-body tabular-nums">Step ${k + 1}</p><h3 className="mt-0.5 text-lg font-semibold text-dark">${t}</h3><p className="mt-1 text-sm">${d}</p></div></div>`)}</div>
      </div>
    <//></section>
    <section className="bg-gray-1 py-20 lg:py-28"><${Container}>
      <${Title} center eyebrow="Our services" title="Four ways we work with families and businesses" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${[...SERV, { to: '/products', label: 'Products', desc: 'Seven asset classes, one portfolio.', icon: 'donut' }].map((s) => html`<${FeatureCard} key=${s.to} icon=${s.icon} title=${s.label} desc=${s.desc} href=${'#' + s.to} />`)}</div>
    <//></section>
    <${Ethos} />
    <section className="on-dark relative overflow-hidden bg-primary py-20 lg:py-24"><${Dots} className="left-6 top-8 text-white/20" /><${Container} className="relative">
      <div className="grid items-end gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7" data-reveal><span className="mb-3 block font-semibold text-white/75">Our vision</span><h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-[44px]">To be one of India’s most admired private wealth managers — consistently beating benchmarks.</h2></div>
        <ul className="space-y-4 lg:col-span-5" data-reveal>${[['person', 'Client-centric', 'Long-term interests first, with integrity and transparency.'], ['family', 'A rewarding place to work', 'Respect and fairness for our people and partners.'], ['leaf', 'Responsible', 'Socially and environmentally, always.']].map(([n, t, d]) => html`<li key=${t} className="flex gap-4 bg-white/10 p-4 text-white"><${Ico} n=${n} /><span><span className="block font-semibold">${t}</span><span className="block text-sm text-white/80">${d}</span></span></li>`)}</ul>
      </div>
    <//></section>
    <section className="bg-white py-20 lg:py-28"><${Container}>
      <div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><${Title} eyebrow="Our foundation" title="What we stand for" desc="Six principles WMU is built on." /></div>
        <div className="lg:col-span-7"><${Accordion} items=${VALUES} /></div></div>
    <//></section>
    <${Awards} />`;
}
function People() {
  const [f, setF] = useState('all');
  const [bio, setBio] = useState(null);
  useEffect(() => { const k = (e) => e.key === 'Escape' && setBio(null); addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const shown = TEAM.filter((t) => f === 'all' || t[4].split(' ').includes(f));
  return html`<${PageHeader} title="People at WMU" desc="A client-centric team with decades of private banking experience." crumb="People" />
    <section className="bg-white py-20 lg:py-28"><${Container}>
      <${Title} eyebrow="Leadership" title="Founders" />
      <div className="grid gap-8 md:grid-cols-2">${FOUNDERS.map((p) => html`<article key=${p.name} data-reveal className="group grid border border-stroke sm:grid-cols-5">
        <div className="overflow-hidden sm:col-span-2"><img src=${A + 'people/' + p.img} alt=${p.name} className="aspect-[4/5] h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]" /></div>
        <div className="flex flex-col p-6 sm:col-span-3 sm:p-8"><span className="text-sm font-semibold text-primary">${p.role}</span><h3 className="mt-2 text-2xl font-bold text-dark">${p.name}</h3><p className="mt-3 text-base">${p.line}</p>
          <div className="mt-auto flex flex-wrap items-center gap-4 pt-6"><${Btn} v="secondary" onClick=${() => setBio(p)}>Read bio<//>${p.li && html`<a href=${p.li} target="_blank" rel="noopener" aria-label=${p.name + ' on LinkedIn'} className="flex h-11 w-11 items-center justify-center border border-stroke text-dark hover:border-primary hover:text-primary"><${LI} /></a>`}</div></div>
      </article>`)}</div>
    <//></section>
    <section className="bg-gray-1 py-20 lg:py-28"><${Container}>
      <${Title} eyebrow="Guidance" title="Advisory board" />
      <div className="grid gap-6 md:grid-cols-2">${ADVISORS.map((a) => html`<details key=${a.name} data-reveal className="group border border-stroke bg-white p-7 open:shadow-card">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4"><span><span className="block text-2xl font-bold text-dark">${a.name}</span><span className="mt-2 block text-base">${a.line}</span></span><span className="flex h-9 w-9 shrink-0 items-center justify-center bg-secondary/10 text-secondary transition group-open:rotate-45 group-open:bg-secondary group-open:text-white"><${Ico} n="plus" c="h-4 w-4" /></span></summary>
        <p className="mt-5 border-t border-stroke pt-5 text-base">${a.more}</p></details>`)}</div>
    <//></section>
    <section id="team" className="bg-white py-20 lg:py-28"><${Container}>
      <${Title} eyebrow="Our team" title="The people you’ll work with" />
      <div className="mb-10 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter team">${CATS.map(([c, l]) => {
        const n = c === 'all' ? TEAM.length : TEAM.filter((t) => t[4].split(' ').includes(c)).length;
        return html`<button key=${c} aria-pressed=${f === c} onClick=${() => setF(c)} className=${cx('shrink-0 px-5 py-2.5 text-sm font-medium transition', f === c ? 'bg-secondary text-white' : 'bg-gray-2 text-dark hover:bg-stroke')}>${l} <span className="ml-1 opacity-60 tabular-nums">${n}</span></button>`;
      })}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">${shown.map(([n, r, img, li]) => html`<article key=${n} className="group" style=${{ animation: 'wmuIn .5s cubic-bezier(.16,1,.3,1) both' }}>
        <div className="relative overflow-hidden bg-gray-2"><img src=${A + 'people/' + img} alt=${n} loading="lazy" className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-[1.04]" /><span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"></span></div>
        <div className="mt-4 flex items-start justify-between gap-2"><div><h3 className="text-base font-semibold text-dark sm:text-lg">${n}</h3><p className="mt-0.5 text-sm">${r}</p></div>
          ${li && html`<a href=${li} target="_blank" rel="noopener" aria-label=${n + ' on LinkedIn'} className="flex h-9 w-9 shrink-0 items-center justify-center bg-gray-2 text-dark transition hover:bg-primary hover:text-white"><${LI} c="h-3.5 w-3.5" /></a>`}</div>
      </article>`)}</div>
    <//></section>
    ${bio && html`<div className="fixed inset-0 z-[60] flex items-end justify-center bg-dark/60 p-0 sm:items-center sm:p-6" onClick=${() => setBio(null)} role="dialog" aria-modal="true" aria-label=${bio.name}>
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-white p-7 shadow-pop sm:p-10" onClick=${(e) => e.stopPropagation()} style=${{ animation: 'wmuIn .4s cubic-bezier(.16,1,.3,1) both' }}>
        <div className="flex items-start justify-between gap-6"><div><span className="text-sm font-semibold text-primary">${bio.role}</span><h3 className="mt-1 text-2xl font-bold text-dark">${bio.name}</h3></div><button onClick=${() => setBio(null)} aria-label="Close" className="flex h-10 w-10 shrink-0 items-center justify-center border border-stroke text-dark hover:border-primary hover:text-primary"><${Ico} n="x" c="h-5 w-5" /></button></div>
        <div className="mt-6 space-y-4 text-base">${bio.bio.map((p, k) => html`<p key=${k}>${p}</p>`)}</div>
      </div></div>`}`;
}
function AboutYou() {
  const who = ['Business owners', 'Senior corporate executives', 'Executives with high stock ownership', 'Doctors', 'Professionals'];
  const seg = [{ k: 'Family office', v: '25', icon: 'family', to: '/family-office', hi: true, pts: ['Large corpuses and complex ownership', 'Family governance and succession', 'Consolidated reporting'] }, { k: 'Private wealth management', v: '10', icon: 'gem', to: '/private-wealth-management', pts: ['A financial plan built around you', 'Strategic and tactical allocation', 'One clear picture of your wealth'] }];
  return html`<${PageHeader} title="About you" desc="Ultra high net-worth families and high net-worth individuals." />
    <section className="bg-white py-20 lg:py-28"><${Container}>
      <${Title} center eyebrow="Who we serve" title="Families and individuals from varied backgrounds" />
      <div className="flex flex-wrap justify-center gap-3">${who.map((w) => html`<span key=${w} data-reveal className="inline-flex items-center gap-2 border border-stroke px-5 py-3 text-base font-medium text-dark"><${Ico} n="check" c="h-4 w-4 text-primary" />${w}</span>`)}</div>
    <//></section>
    <section className="bg-gray-1 py-20 lg:py-28"><${Container}>
      <${Title} center eyebrow="Segments" title="Two ways to work with us" />
      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">${seg.map((s) => html`<div key=${s.k} data-reveal className=${cx('relative flex flex-col border bg-white p-8 sm:p-10', s.hi ? 'border-secondary shadow-pop' : 'border-stroke')}>
        ${s.hi && html`<span className="absolute right-0 top-0 bg-secondary px-3 py-1 text-xs font-semibold text-white">Families</span>`}
        <span className="text-secondary"><${Ico} n=${s.icon} c="h-9 w-9" /></span><h3 className="mt-5 text-xl font-semibold text-dark">${s.k}</h3>
        <p className="mt-4 text-sm">Minimum</p><p className="text-4xl font-bold text-dark tabular-nums sm:text-5xl">INR ${s.v} <span className="text-2xl font-semibold text-body">Cr</span></p>
        <ul className="my-8 space-y-3 border-t border-stroke pt-6">${s.pts.map((p) => html`<li key=${p} className="flex gap-3 text-base"><${Ico} n="check" c="mt-0.5 h-5 w-5 shrink-0 text-primary" />${p}</li>`)}</ul>
        <${Btn} href=${'#' + s.to} v=${s.hi ? 'primary' : 'outline'} className="mt-auto">Learn more<//></div>`)}</div>
    <//></section>`;
}
function Advantage() {
  const ADV = [['arch', 'Independence', 'Not tied to any bank, fund or product — so we pick the best managers and providers for you.'], ['nodes', 'Intelligence', 'Our investment committee’s combined experience, built into a process designed to deliver the highest value.'], ['scale', 'Risk and reward', 'The best potential return for the risk you take. Our job is to minimise risk, not take it.'], ['globe', 'Network', 'A strong network of specialists across every financial matter.']];
  return html`<${PageHeader} title="WMU advantage" desc="Personal service. Institutional standards." />
    <section className="bg-white py-20 lg:py-28"><${Container}>
      <div data-reveal className="on-dark relative overflow-hidden bg-primary p-8 text-white sm:p-12 lg:p-16"><${Dots} className="right-6 top-6 text-white/25" />
        <span className="font-semibold text-white/75">Our pledge</span><h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">Protect and grow your wealth — for you and the generations after you.</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">${[['target', 'Impartial advice', 'No product pushing, ever.'], ['diamond', 'A fair fee', 'Reasonable, and clear from the start.'], ['globe', 'Global access', 'Asset classes across the world.']].map(([n, t, d]) => html`<div key=${t} className="flex gap-3 bg-white/10 p-4"><${Ico} n=${n} /><span><span className="block font-semibold">${t}</span><span className="block text-sm text-white/80">${d}</span></span></div>`)}</div>
      </div>
    <//></section>
    <section className="bg-gray-1 py-20 lg:py-28"><${Container}><${Title} center eyebrow="Why WMU" title="Four reasons clients choose us" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${ADV.map(([n, t, d]) => html`<${FeatureCard} key=${t} icon=${n} title=${t} desc=${d} tone="secondary" />`)}</div><//></section>`;
}
function Steps({ items }) {
  return html`<ol className="relative mx-auto max-w-3xl">${items.map(([n, t, d], k) => html`<li key=${t} data-reveal className="relative flex gap-6 pb-10 last:pb-0">
    ${k < items.length - 1 && html`<span className="absolute left-7 top-14 h-[calc(100%-56px)] w-px bg-stroke"></span>`}
    <${IconBox} n=${n} tone="secondary" />
    <div className="pt-1"><p className="text-sm font-semibold text-primary tabular-nums">Step ${k + 1}</p><h3 className="mt-1 text-xl font-semibold text-dark">${t}</h3><p className="mt-2 text-base">${d}</p></div></li>`)}</ol>`;
}
function PWM() {
  const S = [['route', 'Your financial plan', 'A detailed plan for the rest of your life, reviewed every three years.'], ['pie', 'Strategic allocation', 'Asset allocation and rebalancing — the keys to any plan.'], ['zigzag', 'Tactical allocation', 'Taking advantage of short-term market movements.'], ['target', 'Investment selection', 'Funds, index trackers and securities, across asset classes and geographies.'], ['shieldc', 'Risk management', 'Market and operational risk, monitored continuously.'], ['report', 'Reporting', 'One clear picture of your wealth — not scattered snapshots.']];
  return html`<${PageHeader} title="Private wealth management" desc="Comprehensive asset management, centred on you." />
    <section className="bg-white py-20 lg:py-28"><${Container}><${Title} center eyebrow="Our approach" title="It starts with understanding you" desc="Your goals, horizon, risk appetite, liquidity and income needs." /><${Steps} items=${S} /><//></section>`;
}
function FO() {
  const A4 = [['scale', 'Unbiased and holistic', 'Coordinated advice across your financial, legal and personal affairs.'], ['tree', 'Family governance', 'Values, structures and assets that endure beyond two generations.'], ['route', 'Planning and implementation', 'An effective family governance system, planned and put in place.'], ['loop', '360° consulting', 'Asset, risk and tax expertise, plus a network of eminent experts.']];
  const CORE = ['Structuring family investments', 'Implementing structures and executing investments', 'Strategic and tactical asset allocation', 'Evaluating financial and strategic alternatives', 'Consolidated monitoring and periodic reporting', 'Accounting, record keeping and capital accounts', 'Tax determination with our panel of experts', 'Comprehensive insurance solutions', 'Succession planning and implementation', 'Private family and charitable trusts'];
  return html`<${PageHeader} title="Family office" desc="For families with large corpuses and complex ownership — beyond traditional asset management." />
    <section className="bg-white py-20 lg:py-28"><${Container}><${Title} center eyebrow="Our approach" title="Built on the trust families place in us" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${A4.map(([n, t, d]) => html`<${FeatureCard} key=${t} icon=${n} title=${t} desc=${d} />`)}</div><//></section>
    <section className="bg-gray-1 py-20 lg:py-28"><${Container}><${Title} eyebrow="Core services" title="Ten things we take care of" />
      <ul className="grid gap-3 md:grid-cols-2">${CORE.map((c) => html`<li key=${c} data-reveal className="flex items-center gap-4 border border-stroke bg-white px-5 py-4 text-base font-medium text-dark transition hover:border-secondary/40"><span className="flex h-7 w-7 shrink-0 items-center justify-center bg-primary/10 text-primary"><${Ico} n="check" c="h-4 w-4" /></span>${c}</li>`)}</ul><//></section>`;
}
function IB() {
  const S = [['nodes', 'Private equity', 'Buy side: sourcing, evaluation, execution and post-investment support. Sell side: equity, preferred or hybrid capital syndication.'], ['bank', 'Debt raising and refinancing', 'Project finance, corporate debt, bond and NCD issuances, foreign currency loans, ECBs and monetising single-stock positions.'], ['trend', 'Capital market advisory', 'M&A advisory, corporate restructuring and IPO management.'], ['spark', 'Special situations', 'Investments in listed and unlisted companies facing cyclical, regulatory or product shifts.'], ['compass', 'Advisory services', 'Corporate and business-unit strategy, and project execution.']];
  return html`<${PageHeader} title="Investment banking" desc="Sourcing, evaluation, syndication and execution — buy side and sell side." />
    <section className="bg-white py-20 lg:py-28"><${Container}><div className="grid gap-12 lg:grid-cols-12"><div className="lg:col-span-5"><${Title} eyebrow="Services" title="Executed systematically and efficiently" /><${Btn} onClick=${jump('contact')}>Discuss a mandate<//></div><div className="lg:col-span-7"><${Accordion} items=${S} /></div></div><//></section>`;
}
function Donut({ r }) {
  const C = 2 * Math.PI * 80;
  return html`<svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true"><circle cx="100" cy="100" r="80" fill="none" stroke="#3c53a3" strokeWidth="26" /><circle cx="100" cy="100" r="80" fill="none" stroke="#d71920" strokeWidth="26" style=${{ strokeDasharray: (r / 100) * C + ' ' + C, transition: 'stroke-dasharray .8s cubic-bezier(.16,1,.3,1)' }} /></svg>`;
}
function Products() {
  const [p, setP] = useState(2);
  const [tab, setTab] = useState(0);
  const pr = PROFILES[p];
  const [icon, t, d, chips] = ASSETS[tab];
  return html`<${PageHeader} title="Products" desc="Seven asset classes, chosen with managers who consistently outperform." />
    <section className="bg-white py-20 lg:py-28"><${Container}>
      <div data-reveal className="grid items-center gap-10 border border-stroke p-6 sm:p-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative mx-auto w-full max-w-[320px] lg:col-span-5"><${Donut} r=${pr.r} /><div className="absolute inset-0 flex items-center justify-center p-12 text-center"><span className="text-xl font-bold leading-tight text-dark sm:text-2xl">${pr.n}</span></div></div>
        <div className="lg:col-span-7">
          <span className="mb-3 block font-semibold text-primary">Model portfolios</span><h2 className="text-3xl font-bold text-dark sm:text-4xl">Find your mix</h2><p className="mt-3 text-lg">${pr.d}</p>
          <div className="mt-6 flex gap-10"><div><p className="text-4xl font-bold text-dark tabular-nums">${pr.s}</p><p className="mt-1 flex items-center gap-2 text-sm"><span className="h-2.5 w-2.5 bg-secondary"></span>Safe</p></div><div><p className="text-4xl font-bold text-dark tabular-nums">${pr.k}</p><p className="mt-1 flex items-center gap-2 text-sm"><span className="h-2.5 w-2.5 bg-primary"></span>Risk</p></div></div>
          <label htmlFor="risk" className="sr-only">Risk appetite</label>
          <input id="risk" type="range" min="0" max="4" step="1" value=${p} onInput=${(e) => setP(+e.target.value)} onChange=${(e) => setP(+e.target.value)} className="mt-8 w-full accent-[#d71920]" />
          <div className="mt-2 grid grid-cols-5 gap-1 text-[11px] sm:text-xs">${PROFILES.map((x, k) => html`<button key=${x.n} onClick=${() => setP(k)} className=${cx('text-center first:text-left last:text-right', k === p ? 'font-semibold text-dark' : 'text-body')}>${x.n.replace('Moderately', 'Mod.')}</button>`)}</div>
          <p className="mt-6 text-sm">From our note on <a href="#/blog/blog-asset-allocation" className="font-medium text-dark underline underline-offset-2">asset allocation</a>. Illustrative only — your mix depends on your goals, horizon and corpus.</p>
        </div>
      </div>
    <//></section>
    <section className="bg-gray-1 py-20 lg:py-28"><${Container}><${Title} eyebrow="Asset classes" title="Exposures matched to your goals" />
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1" role="tablist">${ASSETS.map(([n, l], k) => html`<button key=${l} role="tab" aria-selected=${tab === k} onClick=${() => setTab(k)} className=${cx('flex shrink-0 items-center gap-2 px-4 py-2.5 text-sm font-medium transition', tab === k ? 'bg-secondary text-white on-dark' : 'bg-white text-dark hover:bg-stroke')}><${Ico} n=${n} c="h-4 w-4" />${l}</button>`)}</div>
      <div key=${tab} role="tabpanel" className="grid gap-8 border border-stroke bg-white p-7 sm:p-10 lg:grid-cols-12" style=${{ animation: 'wmuIn .5s cubic-bezier(.16,1,.3,1) both' }}>
        <div className="lg:col-span-5"><${IconBox} n=${icon} tone="secondary" /><h3 className="mt-5 text-2xl font-bold text-dark sm:text-3xl">${t}</h3></div>
        <div className="lg:col-span-7"><p className="text-lg">${d}</p>
          ${chips.length > 0 && html`<div className="mt-6 flex flex-wrap gap-2">${chips.map((c) => html`<span key=${c} className="bg-gray-2 px-3 py-1.5 text-sm text-dark">${c}</span>`)}</div>`}
          ${t === 'Equities' && html`<a href=${W + '/commission-disclosure/'} className="mt-6 inline-flex items-center gap-2 text-[15px] font-medium text-dark hover:text-primary">Commission disclosure <${Ico} n="arrow" c="h-4 w-4" /></a>`}</div>
      </div>
    <//></section>`;
}
function Blog() {
  return html`<${PageHeader} title="Blog" desc="Short notes on saving, investing and asset allocation." />
    <section className="bg-white py-20 lg:py-28"><${Container}><div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">${POSTS.map((p) => html`<a key=${p.slug} href=${'#/blog/' + p.slug} data-reveal className="group flex flex-col border border-stroke transition hover:-translate-y-1 hover:shadow-card">
      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-gray-1"><img src=${A + p.img} alt="" loading="lazy" className=${cx('transition duration-700 group-hover:scale-105', p.cover ? 'h-full w-full object-cover' : 'max-h-[80%] w-auto p-4')} /></div>
      <div className="flex flex-1 flex-col p-6"><span className="inline-flex w-fit bg-primary px-3 py-1 text-xs font-medium text-white tabular-nums">${p.d}</span><h3 className="mt-4 text-xl font-semibold text-dark transition-colors group-hover:text-primary">${p.t}</h3><p className="mt-3 text-base">${p.e}</p><span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-medium text-dark">Read article <${Ico} n="arrow" c="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
    </a>`)}</div><//></section>`;
}
function Post({ slug }) {
  const post = POSTS.find((p) => p.slug === slug);
  const [body, setBody] = useState(null);
  useEffect(() => {
    let live = true;
    fetch('../' + slug + '.html').then((r) => r.text()).then((t) => {
      const d = new DOMParser().parseFromString(t, 'text/html');
      const a = d.querySelector('article.prose');
      if (!a) throw new Error('missing');
      a.querySelectorAll('nav.post-nav').forEach((n) => n.remove());
      a.querySelectorAll('[src^="assets/"]').forEach((i) => i.setAttribute('src', '../' + i.getAttribute('src')));
      a.querySelectorAll('a[href^="blog-"]').forEach((l) => l.setAttribute('href', '#/blog/' + l.getAttribute('href').replace('.html', '')));
      if (live) setBody(a.innerHTML);
    }).catch(() => live && setBody('<p>Sorry — this article could not be loaded.</p>'));
    return () => { live = false; };
  }, [slug]);
  if (!post) return html`<${PageHeader} title="Article not found" />`;
  const i = POSTS.indexOf(post), older = POSTS[i + 1], newer = POSTS[i - 1];
  return html`<${PageHeader} title=${post.t} desc=${post.d} crumb="Blog" />
    <section className="bg-white py-16 lg:py-24"><${Container}>
      ${body === null ? html`<div className="mx-auto max-w-3xl space-y-4">${[0, 1, 2, 3].map((k) => html`<div key=${k} className="h-4 animate-pulse bg-gray-2" style=${{ width: 90 - k * 12 + '%' }}></div>`)}</div>`
        : html`<article className="article prose prose-lg mx-auto max-w-3xl prose-headings:text-dark prose-strong:text-dark prose-blockquote:border-primary prose-blockquote:not-italic prose-li:marker:text-primary" dangerouslySetInnerHTML=${{ __html: body }}></article>`}
      <nav className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-2">
        ${older ? html`<a href=${'#/blog/' + older.slug} className="border border-stroke p-5 transition hover:border-primary"><span className="block text-sm font-semibold text-primary">Previous</span><span className="mt-1 block font-semibold text-dark">${older.t}</span></a>` : html`<span></span>`}
        ${newer ? html`<a href=${'#/blog/' + newer.slug} className="border border-stroke p-5 text-right transition hover:border-primary"><span className="block text-sm font-semibold text-primary">Next</span><span className="mt-1 block font-semibold text-dark">${newer.t}</span></a>` : html`<a href="#/blog" className="border border-stroke p-5 text-right transition hover:border-primary"><span className="block text-sm font-semibold text-primary">All posts</span><span className="mt-1 block font-semibold text-dark">Blog</span></a>`}
      </nav>
    <//></section>`;
}

/* ---------------- app ---------------- */
const ROUTES = { '/': [Home, 'About us'], '/about-you': [AboutYou, 'About you'], '/advantage': [Advantage, 'WMU advantage'], '/people': [People, 'People'], '/private-wealth-management': [PWM, 'Private wealth management'], '/family-office': [FO, 'Family office'], '/investment-banking': [IB, 'Investment banking'], '/products': [Products, 'Products'], '/blog': [Blog, 'Blog'] };
function useRoute() {
  const get = () => (location.hash.replace(/^#/, '') || '/');
  const [r, setR] = useState(get());
  useEffect(() => { const f = () => { const n = get(); if (n.startsWith('/')) { setR(n); scrollTo(0, 0); } }; addEventListener('hashchange', f); return () => removeEventListener('hashchange', f); }, []);
  return r;
}
function App() {
  const route = useRoute();
  const isPost = route.startsWith('/blog/');
  const [Page, name] = isPost ? [null, 'Blog'] : (ROUTES[route] || ROUTES['/']);
  useEffect(() => { document.title = (isPost ? (POSTS.find((p) => '/blog/' + p.slug === route) || {}).t || 'Blog' : name) + ' | Wealth Managers United'; }, [route]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.dataset.shown = '1'; io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    const scan = () => document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((el) => io.observe(el));
    scan(); const mo = new MutationObserver(scan); mo.observe(document.getElementById('root'), { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); };
  }, [route]);
  return html`<${Navbar} route=${isPost ? '/blog' : route} />
    <main key=${route} style=${{ animation: 'wmuIn .45s cubic-bezier(.16,1,.3,1) both' }}>${isPost ? html`<${Post} slug=${route.slice(6)} />` : html`<${Page} />`}<${Contact} /></main>
    <${Footer} />`;
}
const kf = document.createElement('style');
kf.textContent = '@keyframes wmuIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}@keyframes wmuProg{from{transform:scaleX(0)}to{transform:scaleX(1)}}@keyframes wmuSheen{0%,35%{left:-50%}100%{left:130%}}@media (prefers-reduced-motion:reduce){*{animation-duration:.01ms!important;animation-iteration-count:1!important}}';
document.head.appendChild(kf);
ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);
