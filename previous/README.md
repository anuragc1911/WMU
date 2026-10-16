# Wealth Managers United — website

A redesign of [wmuindia.com](https://www.wmuindia.com/) in the visual style of the
[WriteMate AI](https://writemate.demos.tailgrids.com/) template, in a white-and-red editorial style: serif display type (P22 Mackinac), Inter UI,
a full-screen hero with a boomerang (forward → reverse) canvas video, and a glass info panel.
Content is kept as on the original pages.

Live: https://anuragc1911.github.io/WMU/

## Pages

| File | Original page |
| --- | --- |
| `index.html` | [About Us](https://www.wmuindia.com/about-us/) |
| `about-you.html` | [About You](https://www.wmuindia.com/about-you/) |
| `products.html` | [Products](https://www.wmuindia.com/products/) |
| `wmu-advantage.html` | [WMU Advantage](https://www.wmuindia.com/wmu-advantage/) |
| `people.html` | [People](https://www.wmuindia.com/people/) |
| `private-wealth-management.html`, `family-office.html`, `investment-banking.html` | Services pages |
| `blog.html` + `blog-*.html` | [Blog](https://www.wmuindia.com/category/blog/) and its three posts |

Shared files: `styles.css` (all styling), `script.js` (nav, mobile menu, scroll reveals, boomerang video, Get in Touch form), `assets/blog/` (images from the original blog posts).

The Get in Touch form opens the visitor's email app addressed to feedback@wmuindia.com, since
GitHub Pages cannot process form submissions. Swap in a form service (Formspree, Basin, etc.)
to receive submissions directly.

No build step or dependencies.
