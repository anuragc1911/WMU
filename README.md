# Wealth Managers United — website

A redesign of [wmuindia.com](https://www.wmuindia.com/) in the visual style of the
[WriteMate AI](https://writemate.demos.tailgrids.com/) template, in a light theme with WMU red accents.
Content is kept as on the original pages.

Live: https://anuragc1911.github.io/WMU/

## Pages

| File | Original page |
| --- | --- |
| `index.html` | [About Us](https://www.wmuindia.com/about-us/) |
| `about-you.html` | [About You](https://www.wmuindia.com/about-you/) |
| `products.html` | [Products](https://www.wmuindia.com/products/) |
| `wmu-advantage.html` | [WMU Advantage](https://www.wmuindia.com/wmu-advantage/) |
| `blog.html` + `blog-*.html` | [Blog](https://www.wmuindia.com/category/blog/) and its three posts |

Shared files: `styles.css` (all styling), `script.js` (menu, scroll reveal, Get in Touch form), `assets/blog/` (images from the original blog posts).

The Get in Touch form opens the visitor's email app addressed to feedback@wmuindia.com, since
GitHub Pages cannot process form submissions. Swap in a form service (Formspree, Basin, etc.)
to receive submissions directly.

No build step or dependencies.
