# ASCII Aquarium

A fully interactive ASCII-art aquarium that runs in your browser. Add fish, plants, and decorations, feed your fish, and watch the underwater world come alive — all rendered in glorious monospace characters.

**Live demo:** https://dan-art-projects.github.io/aquarium-ascii/

---

## Features

- **9 fish species** — Goldfish, Tropical, Big Fish, Clownfish, Puffer, Shark, Jellyfish, Angelfish, Eel
- **5 plant types** — Seaweed, Coral, Kelp, Anemone, Fern (with gentle sway animation)
- **8 decorations** — Castle, Rock, Treasure Chest, Anchor, Skull, Ruins, Shipwreck, Lighthouse
- **Custom colors** — Pick any color from the toolbar before adding an item
- **Feed your fish** — Drop food from the surface and watch fish swim toward it and eat
- **Bubbles** — Fish emit bubbles as they swim; ambient bubbles rise from the sand
- **Scales to any screen** — The character grid fills the full window and reflows on resize
- **Zero dependencies** — Pure HTML, CSS, and vanilla JavaScript; no build step required

## Controls

| Element | Action |
|---------|--------|
| Fish / Plant / Decoration buttons | Add that item at a random position using the selected color |
| Color swatch | Click to open the color picker |
| **Feed Fish** | Drop food particles from the surface |
| **Clear All** | Remove everything and start fresh |

## Running Locally

No build step required — just open `index.html`:

```bash
git clone git@github.com:Dan-Art-Projects/aquarium-ascii.git
cd aquarium-ascii
open index.html          # macOS
# or: start index.html  # Windows
# or: xdg-open index.html  # Linux
```

Or serve with any static file server:

```bash
npx serve .
python3 -m http.server 8080
```

## GitHub Pages Deployment

1. Push to the `main` branch
2. Go to **Settings → Pages** in the repository
3. Set **Source** to `Deploy from a branch`, branch `main`, folder `/` (root)
4. Save — your site will be live at `https://dan-art-projects.github.io/aquarium-ascii/`

## Project Structure

```
aquarium-ascii/
├── index.html     — page shell and toolbar markup
├── style.css      — dark-themed UI styles
├── aquarium.js    — all game logic (renderer, entities, aquarium, toolbar)
└── README.md
```

## How It Works

The aquarium renders a character grid onto an HTML5 `<canvas>` element using a monospace font. Each frame:

1. The grid is cleared to the water background color
2. Animated wave and sand characters are written to the grid
3. Decorations, plants, food, bubbles, and fish are drawn (in that order)
4. The grid is flushed to the canvas in a single pass

Fish use simple steering: they swim in their current direction, gently drift vertically toward a random target depth, and divert toward the nearest food particle when one is within range.

## Contributing

Pull requests are welcome. Some ideas for new features:

- Day/night cycle (gradually shift water color)
- Fish name tags on hover
- Sound effects
- Export as animated GIF
- Additional fish species and decorations

## License

MIT
