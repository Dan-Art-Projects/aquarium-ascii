'use strict';

// ============================================================
// CONSTANTS
// ============================================================
const FONT_SIZE    = 14;
const FONT         = `${FONT_SIZE}px 'Courier New', Courier, monospace`;
const LINE_HEIGHT  = FONT_SIZE * 1.45;
const SAND_ROWS    = 3;
const SURFACE_ROWS = 1;
const FOOD_COUNT   = 6;
const FOOD_SPEED   = 2.2;
const SEEK_RANGE   = 26;
const DEFAULT_BG   = '#061420';
const WAVE_COLOR   = '#4DABF7';
const SAND_TOP     = '#C49A3C';
const SAND_BOT     = '#7A5C1E';
const BUBBLE_COLOR = '#88CCFF';
const FOOD_COLOR   = '#E8C87A';

// ============================================================
// ENTITY DEFINITIONS
// ============================================================
const FISH_TYPES = [
  {
    id: 'goldfish', name: 'Goldfish', label: '><(((º>',
    rightArt: ['><(((º>'],
    leftArt:  ['<º)))><'],
    speed: 3.0, defaultColor: '#FFD700'
  },
  {
    id: 'tropical', name: 'Tropical', label: '><((°>',
    rightArt: ['><((°>'],
    leftArt:  ['<°))><'],
    speed: 4.5, defaultColor: '#FF6B6B'
  },
  {
    id: 'big', name: 'Big Fish', label: '><((((º>',
    rightArt: ['><((((((º>'],
    leftArt:  ['<º))))))><'],
    speed: 1.8, defaultColor: '#4ECDC4'
  },
  {
    id: 'clown', name: 'Clownfish', label: '><(#(º>',
    rightArt: ['><(#(º>'],
    leftArt:  ['<º)#)><'],
    speed: 3.2, defaultColor: '#FF7043'
  },
  {
    id: 'puffer', name: 'Puffer', label: '(o  )',
    rightArt: [' .--. ', '(o  ))', ' `--` '],
    leftArt:  [' .--. ', '((  o)', ' `--` '],
    speed: 1.4, defaultColor: '#90EE90'
  },
  {
    id: 'shark', name: 'Shark', label: '><(  )>',
    rightArt: ['    /\\ ', '><(    )>', '    \\/ '],
    leftArt:  [' /\\    ', '<(    )<', ' \\/    '],
    speed: 5.5, defaultColor: '#778CA3'
  },
  {
    id: 'jellyfish', name: 'Jellyfish', label: '(*)',
    rightArt: [' (*) ', ' )() ', '/ | \\'],
    leftArt:  [' (*) ', ' )() ', '/ | \\'],
    speed: 0.9, defaultColor: '#FF9FF3', vertical: true
  },
  {
    id: 'angel', name: 'Angelfish', label: '><}}>',
    rightArt: ['  /\\ ', '><}}>', '  \\/ '],
    leftArt:  [' /\\  ', '<{{><', ' \\/  '],
    speed: 2.5, defaultColor: '#A8E6CF'
  },
  {
    id: 'eel', name: 'Eel', label: '~S~>',
    rightArt: ['~~S~S~S~>'],
    leftArt:  ['<~S~S~S~~'],
    speed: 2.8, defaultColor: '#6C5CE7'
  },
  {
    id: 'minnow', name: 'Minnow', label: '><>',
    rightArt: ['><>'],
    leftArt:  ['<><'],
    speed: 7.0, defaultColor: '#C0C0C0'
  },
  {
    id: 'sardine', name: 'Sardine', label: '>->',
    rightArt: ['>->'],
    leftArt:  ['<-<'],
    speed: 6.0, defaultColor: '#A8B8C8'
  },
  {
    id: 'swordfish', name: 'Swordfish', label: '---><(>',
    rightArt: ['---><(((º>'],
    leftArt:  ['<º)))><---'],
    speed: 4.5, defaultColor: '#5B8DB8'
  },
  {
    id: 'narwhal', name: 'Narwhal', label: '*><(>',
    rightArt: ['*--><(((>'],
    leftArt:  ['<)))<--*'],
    speed: 2.4, defaultColor: '#B0D8E8'
  },
  {
    id: 'barracuda', name: 'Barracuda', label: '><====>',
    rightArt: ['><=======>'],
    leftArt:  ['<=======><'],
    speed: 7.5, defaultColor: '#607080'
  },
  {
    id: 'catfish', name: 'Catfish', label: '~~><(>',
    rightArt: ['~~><((º>'],
    leftArt:  ['<º))><~~'],
    speed: 1.8, defaultColor: '#8B7355'
  },
  {
    id: 'piranha', name: 'Piranha', label: '><{^>',
    rightArt: ['><{^{>'],
    leftArt:  ['<{^{><'],
    speed: 4.8, defaultColor: '#DC143C'
  },
  {
    id: 'blobfish', name: 'Blobfish', label: '(·_·)',
    rightArt: ['><(·_·)>'],
    leftArt:  ['<(·_·)<'],
    speed: 0.7, defaultColor: '#FFB6C1'
  },
  {
    id: 'lantern', name: 'Lanternfish', label: '·><(>',
    rightArt: ['·><(((>'],
    leftArt:  ['<)))<·'],
    speed: 2.0, defaultColor: '#00CED1'
  },
  {
    id: 'snapper', name: 'Snapper', label: '><(v>',
    rightArt: ['><(((v>'],
    leftArt:  ['<v)))><'],
    speed: 3.8, defaultColor: '#E8A020'
  },
  {
    id: 'seahorse', name: 'Seahorse', label: ',~,',
    rightArt: [' ,~, ', ' (º) ', '  )( ', '  )( ', '  \\/ '],
    leftArt:  [' ,~, ', ' (º) ', '  )( ', '  )( ', '  \\/ '],
    speed: 0.6, defaultColor: '#DDA0DD', vertical: true
  },
  {
    id: 'whale', name: 'Whale', label: 'º)\\~',
    rightArt: ['   _____  ', '  /  º   \\', ' |        \\___~', '  \\_________/ '],
    leftArt:  ['   _____  ', '  /   º  \\', '~___/        | ', '   \\_________/'],
    speed: 0.7, defaultColor: '#3A6EA5'
  },
  {
    id: 'turtle', name: 'Turtle', label: '_(oo)_',
    rightArt: ['   __   ', ' _(oo)_ ', ' \\____/ '],
    leftArt:  ['   __   ', ' _(oo)_ ', ' \\____/ '],
    speed: 1.0, defaultColor: '#2E8B57'
  },
  {
    id: 'manta', name: 'Manta Ray', label: '\\/~',
    rightArt: ['\\       / ', ' \\     /  ', '  \\___/~~~'],
    leftArt:  [' \\       /', '  \\     / ', '~~~\\___/  '],
    speed: 2.5, defaultColor: '#2C4A6E'
  },
  {
    id: 'octopus', name: 'Octopus', label: '(°°)',
    rightArt: ['  (°°)  ', ' /|  |\\ ', '~  ~~  ~'],
    leftArt:  ['  (°°)  ', ' /|  |\\ ', '~  ~~  ~'],
    speed: 1.1, defaultColor: '#9370DB', vertical: true
  },
];

const PLANT_TYPES = [
  {
    id: 'seaweed', name: 'Seaweed', label: '}{',
    art: ['  }', ' { ', '  }', ' { ', '  }', '  |'],
    defaultColor: '#2ECC71'
  },
  {
    id: 'coral', name: 'Coral', label: '\\|/',
    art: [' \\|/ ', '  |  ', ' /|\\ ', '  |  '],
    defaultColor: '#FF7675'
  },
  {
    id: 'kelp', name: 'Kelp', label: '*|',
    art: [' *|', '  |*', ' *|', '  |*', ' *|', '  |'],
    defaultColor: '#00B894'
  },
  {
    id: 'anemone', name: 'Anemone', label: 'vVv',
    art: ['vVvVv', ' ||| ', '(((()))', ' ||| '],
    defaultColor: '#FD79A8'
  },
  {
    id: 'fern', name: 'Fern', label: '\\v/',
    art: [' \\v/ ', ' /v\\ ', ' \\v/ ', '  |  '],
    defaultColor: '#27AE60'
  },
  {
    id: 'seagrass', name: 'Sea Grass', label: '|||',
    art: ['||  ||', '||  ||', '||  ||', '||  ||', '||  ||'],
    defaultColor: '#7EC850'
  },
  {
    id: 'fanCoral', name: 'Fan Coral', label: '\\|/\\|/',
    art: ['\\|/\\|/\\|/', ' \\|/ \\|/ ', '  \\   /  ', '   \\ /   ', '    |    '],
    defaultColor: '#FF8C69'
  },
  {
    id: 'tubeWorms', name: 'Tube Worms', label: '(*)(*)' ,
    art: ['(*)(*)(*)', ' |  |  | ', ' |  |  | ', '[========]'],
    defaultColor: '#FF69B4'
  },
  {
    id: 'bubbleAlgae', name: 'Bubble Algae', label: 'O o O',
    art: [' O  o  O ', ' o  O  o ', '  O  o   ', '   ||||  '],
    defaultColor: '#90EE90'
  },
  {
    id: 'sponge', name: 'Sea Sponge', label: 'oOoO',
    art: ['oOoOo', 'OoOoO', 'oOoOo', 'OoOoO', '|||||'],
    defaultColor: '#FFA500'
  },
  {
    id: 'featherDuster', name: 'Feather Duster', label: '((|))',
    art: ['(((|)))', ' ((|)) ', '  (|)  ', '   |   '],
    defaultColor: '#FF1493'
  },
  {
    id: 'brainCoral', name: 'Brain Coral', label: '~^~',
    art: ['(~^~^~^)', '(~^~^~^)', '(~^~^~^)', '(_______)', ],
    defaultColor: '#CD853F'
  },
  {
    id: 'softCoral', name: 'Soft Coral', label: 'Y|Y',
    art: [' Y   Y ', ' |Y Y| ', ' Y|Y|Y ', '  Y|Y  ', '   |   '],
    defaultColor: '#FF6EB4'
  },
];

const DECORATION_TYPES = [
  {
    id: 'castle', name: 'Castle', label: '|^|',
    art: ['|^|^|^|', '|      |', '/|      |\\', '|________|'],
    defaultColor: '#B2BEC3'
  },
  {
    id: 'rock', name: 'Rock', label: '(  )',
    art: ['  .--. ', ' /    \\', '/      \\', '`------`'],
    defaultColor: '#636E72'
  },
  {
    id: 'treasure', name: 'Treasure', label: '[$$]',
    art: ['.-------.',  '|$$$$$$$|', '`-------`'],
    defaultColor: '#FDCB6E'
  },
  {
    id: 'anchor', name: 'Anchor', label: '-+-',
    art: ['   T   ', '  -+-  ', '   |   ', '  /|\\  ', ' `-|-` '],
    defaultColor: '#636E72'
  },
  {
    id: 'skull', name: 'Skull', label: 'o.o',
    art: [' .---. ', '|o . o|', ' \\___/ ', '  ||| '],
    defaultColor: '#DFE6E9'
  },
  {
    id: 'ruins', name: 'Ruins', label: '| |',
    art: ['||  | |', '||  | |', '||__|_|', '|______|'],
    defaultColor: '#7F8C8D'
  },
  {
    id: 'shipwreck', name: 'Shipwreck', label: ')=(',
    art: [' ____ ', '|    |', '|____|', ')===( '],
    defaultColor: '#8D6E63'
  },
  {
    id: 'lighthouse', name: 'Lighthouse', label: '/|\\',
    art: [' /|\\ ', ' |*| ', ' | | ', '/___\\'],
    defaultColor: '#E74C3C'
  },
];

// ============================================================
// UTILITIES
// ============================================================
const rand      = (a, b) => Math.random() * (b - a) + a;
const randInt   = (a, b) => Math.floor(rand(a, b + 1));
const clamp     = (v, a, b) => Math.max(a, Math.min(b, v));
const randomHex = () => '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0');

// ============================================================
// RENDERER
// ============================================================
class Renderer {
  constructor(canvas) {
    this.canvas  = canvas;
    this.ctx     = canvas.getContext('2d');
    this.bgColor = DEFAULT_BG;
    canvas.style.background = DEFAULT_BG;
    this.charW   = 8.4;
    this.charH   = LINE_HEIGHT;
    this.cols    = 0;
    this.rows    = 0;
    this.cells   = [];
  }

  resize() {
    const c = this.canvas;
    c.width  = c.offsetWidth;
    c.height = c.offsetHeight;
    const ctx = this.ctx;
    ctx.font = FONT;
    this.charW = ctx.measureText('M').width;
    this.charH = LINE_HEIGHT;
    this.cols  = Math.max(1, Math.floor(c.width  / this.charW));
    this.rows  = Math.max(1, Math.floor(c.height / this.charH));
    this.resetCells();
  }

  resetCells() {
    this.cells = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => ({ ch: ' ', color: this.bgColor }))
    );
  }

  clear() {
    for (let r = 0; r < this.rows; r++)
      for (let c = 0; c < this.cols; c++)
        this.cells[r][c] = { ch: ' ', color: this.bgColor };
  }

  set(col, row, ch, color) {
    const c = Math.round(col), r = Math.round(row);
    if (c < 0 || c >= this.cols || r < 0 || r >= this.rows || ch === ' ') return;
    this.cells[r][c] = { ch, color };
  }

  text(col, row, str, color) {
    const c0 = Math.round(col), r0 = Math.round(row);
    for (let i = 0; i < str.length; i++) this.set(c0 + i, r0, str[i], color);
  }

  art(col, row, lines, color) {
    lines.forEach((line, i) => this.text(col, row + i, line, color));
  }

  flush() {
    const { ctx, canvas, charW, charH, cols, rows, cells } = this;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = FONT;
    ctx.textBaseline = 'top';
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cell = cells[r][c];
        if (cell.ch !== ' ') {
          ctx.fillStyle = cell.color;
          ctx.fillText(cell.ch, c * charW, r * charH);
        }
      }
    }
  }
}

// ============================================================
// FOOD
// ============================================================
class Food {
  constructor(x, y) {
    this.x     = x;
    this.y     = y;
    this.eaten = false;
  }

  update(dt) { this.y += FOOD_SPEED * dt; }

  draw(r) { r.set(this.x, this.y, '·', FOOD_COLOR); }
}

// ============================================================
// BUBBLE
// ============================================================
class Bubble {
  constructor(x, y) {
    this.x        = x;
    this.y        = y;
    this.speed    = rand(1.8, 4.5);
    this.drift    = rand(-0.25, 0.25);
    this.ch       = Math.random() < 0.5 ? 'o' : '°';
    this.life     = 0;
    this.maxLife  = rand(2, 7);
  }

  update(dt) {
    this.y    -= this.speed * dt;
    this.x    += this.drift * dt;
    this.life += dt;
  }

  dead() { return this.y < SURFACE_ROWS || this.life > this.maxLife; }

  draw(r) { r.set(this.x, this.y, this.ch, BUBBLE_COLOR); }
}

// ============================================================
// FISH
// ============================================================
class Fish {
  constructor(type, color, x, y) {
    this.type       = type;
    this.color      = color;
    this.x          = x;
    this.y          = y;
    this.dir        = Math.random() < 0.5 ? 1 : -1;
    this.speed      = type.speed;
    this.targetFood = null;
    this.yTarget    = y;
    this.yTimer     = 0;
    this.yInterval  = rand(2, 7);
    this.bubTimer   = 0;
    this.bubInterval= rand(3, 9);
    this.time       = 0;
    this.vertical   = !!type.vertical;
    this.vertDir    = 1;
    this.width      = Math.max(...type.rightArt.map(l => l.length));
    this.height     = type.rightArt.length;
  }

  get art() { return this.dir === 1 ? this.type.rightArt : this.type.leftArt; }

  update(dt, foods, sandRow, cols, bubbles) {
    this.time += dt;
    const minY = SURFACE_ROWS + 1;
    const maxY = sandRow - this.height - 1;

    // Emit bubble
    this.bubTimer += dt;
    if (this.bubTimer > this.bubInterval) {
      this.bubTimer    = 0;
      this.bubInterval = rand(3, 9);
      const bx = this.dir === 1 ? this.x + this.width : this.x - 1;
      const by = this.y + Math.floor(this.height / 2);
      bubbles.push(new Bubble(bx, by));
    }

    // Discard eaten food target
    if (this.targetFood && this.targetFood.eaten) this.targetFood = null;

    // Find nearest food
    if (!this.targetFood) {
      let best = null, bestDist = SEEK_RANGE;
      for (const f of foods) {
        if (f.eaten) continue;
        const dx = f.x - (this.x + this.width / 2);
        const dy = f.y - (this.y + this.height / 2);
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < bestDist) { bestDist = d; best = f; }
      }
      this.targetFood = best;
    }

    if (this.targetFood) {
      // Seek food
      const cx = this.x + this.width / 2, cy = this.y + this.height / 2;
      const dx = this.targetFood.x - cx, dy = this.targetFood.y - cy;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 1.5) {
        this.targetFood.eaten = true;
        this.targetFood = null;
      } else {
        const s = (this.speed * 2 * dt) / d;
        this.x  += dx * s;
        this.y  += dy * s;
        this.dir = dx > 0 ? 1 : -1;
      }
    } else if (this.vertical) {
      // Jellyfish / vertical swimmers
      this.y += this.vertDir * this.speed * dt;
      if (this.y >= maxY) this.vertDir = -1;
      if (this.y <= minY) this.vertDir  = 1;
      this.x += Math.sin(this.time * 0.7) * 0.5 * dt;
    } else {
      // Normal swim
      this.x += this.dir * this.speed * dt;

      // Gentle vertical drift
      this.yTimer += dt;
      if (this.yTimer > this.yInterval) {
        this.yTimer    = 0;
        this.yInterval = rand(2, 7);
        this.yTarget   = rand(minY, maxY);
      }
      this.y += (this.yTarget - this.y) * 0.5 * dt;

      // Wall bounce
      const w = Math.max(...this.art.map(l => l.length));
      if (this.x < 0)          { this.x = 0;         this.dir =  1; }
      if (this.x + w > cols)   { this.x = cols - w;  this.dir = -1; }
    }

    this.x = clamp(this.x, 0, cols - this.width - 1);
    this.y = clamp(this.y, minY, maxY);
  }

  draw(r) { r.art(this.x, this.y, this.art, this.color); }
}

// ============================================================
// PLANT
// ============================================================
class Plant {
  constructor(type, color, x, sandRow) {
    this.type   = type;
    this.color  = color;
    this.x      = x;
    this.art    = type.art;
    this.height = type.art.length;
    this.width  = Math.max(...type.art.map(l => l.length));
    this.y      = sandRow - this.height;
    this.t      = rand(0, Math.PI * 2);
  }

  reposition(sandRow) { this.y = sandRow - this.height; }

  update(dt) { this.t += dt * 0.6; }

  draw(r) {
    const half  = Math.floor(this.height / 2);
    const sway  = Math.round(Math.sin(this.t));
    this.art.forEach((line, i) => {
      const offset = i < half ? sway : 0;
      r.text(this.x + offset, this.y + i, line, this.color);
    });
  }
}

// ============================================================
// DECORATION
// ============================================================
class Decoration {
  constructor(type, color, x, sandRow) {
    this.type   = type;
    this.color  = color;
    this.x      = x;
    this.art    = type.art;
    this.height = type.art.length;
    this.width  = Math.max(...type.art.map(l => l.length));
    this.y      = sandRow - this.height;
  }

  reposition(sandRow) { this.y = sandRow - this.height; }
  update() {}
  draw(r) { r.art(this.x, this.y, this.art, this.color); }
}

// ============================================================
// AQUARIUM
// ============================================================
class Aquarium {
  constructor(canvas) {
    this.renderer    = new Renderer(canvas);
    this.fish        = [];
    this.plants      = [];
    this.decorations = [];
    this.foods       = [];
    this.bubbles     = [];
    this.time        = 0;
    this.lastTime    = 0;
    this.sandRow     = 0;
    this.cols        = 0;
    this.rows        = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.renderer.resize();
    this.cols    = this.renderer.cols;
    this.rows    = this.renderer.rows;
    this.sandRow = Math.max(4, this.rows - SAND_ROWS);
    this.fish.forEach(f => {
      f.x = clamp(f.x, 0, this.cols - f.width - 1);
      f.y = clamp(f.y, SURFACE_ROWS + 1, this.sandRow - f.height - 1);
    });
    this.plants.forEach(p => p.reposition(this.sandRow));
    this.decorations.forEach(d => d.reposition(this.sandRow));
  }

  addFish(type, color) {
    const w = Math.max(...type.rightArt.map(l => l.length));
    const h = type.rightArt.length;
    const x = rand(2, Math.max(2, this.cols - w - 2));
    const y = rand(SURFACE_ROWS + 1, Math.max(SURFACE_ROWS + 2, this.sandRow - h - 2));
    this.fish.push(new Fish(type, color, x, y));
  }

  addPlant(type, color) {
    const w = Math.max(...type.art.map(l => l.length));
    const x = randInt(1, Math.max(1, this.cols - w - 1));
    this.plants.push(new Plant(type, color, x, this.sandRow));
  }

  addDecoration(type, color) {
    const w = Math.max(...type.art.map(l => l.length));
    const x = randInt(1, Math.max(1, this.cols - w - 1));
    this.decorations.push(new Decoration(type, color, x, this.sandRow));
  }

  feedFish() {
    for (let i = 0; i < FOOD_COUNT; i++) {
      this.foods.push(new Food(randInt(2, this.cols - 2), SURFACE_ROWS));
    }
  }

  clearAll() {
    this.fish = []; this.plants = []; this.decorations = [];
    this.foods = []; this.bubbles = [];
  }

  setBgColor(color) {
    this.renderer.bgColor = color;
    this.renderer.canvas.style.background = color;
    document.body.style.background = color;
  }

  drawBg() {
    const r = this.renderer;

    // Animated surface waves
    const waves = '~≈~~ ≈ ~  ≈~';
    for (let c = 0; c < this.cols; c++) {
      const ch = waves[(c + Math.floor(this.time * 1.8)) % waves.length];
      if (ch && ch !== ' ') r.set(c, 0, ch, WAVE_COLOR);
    }

    // Second wave row (dimmer)
    const waves2 = ' ~  ≈ ~  ~  ';
    for (let c = 0; c < this.cols; c++) {
      const ch = waves2[(c + Math.floor(this.time * 1.2) + 4) % waves2.length];
      if (ch && ch !== ' ') r.set(c, 1, ch, '#2980B9');
    }

    // Sand bed
    const sChars = ['.', ':', '.', '·', ':', '.', ',', '.', '·', ':'];
    for (let row = this.sandRow; row < this.rows; row++) {
      const color = row === this.sandRow ? SAND_TOP : SAND_BOT;
      for (let c = 0; c < this.cols; c++) {
        r.set(c, row, sChars[(c * 3 + row * 7) % sChars.length], color);
      }
    }

    // Occasional ambient bubble from sand
    if (Math.random() < 0.12) {
      this.bubbles.push(new Bubble(randInt(1, this.cols - 2), this.sandRow - 1));
    }
  }

  update(dt) {
    this.time += dt;
    this.fish.forEach(f =>
      f.update(dt, this.foods, this.sandRow, this.cols, this.bubbles)
    );
    this.plants.forEach(p => p.update(dt));
    this.foods   = this.foods.filter(f   => { f.update(dt); return !f.eaten && f.y < this.sandRow; });
    this.bubbles = this.bubbles.filter(b => { b.update(dt); return !b.dead(); });
  }

  draw() {
    const r = this.renderer;
    r.clear();
    this.drawBg();
    this.decorations.forEach(d => d.draw(r));
    this.plants.forEach(p     => p.draw(r));
    this.foods.forEach(f      => f.draw(r));
    this.bubbles.forEach(b    => b.draw(r));
    this.fish.forEach(f       => f.draw(r));
    r.flush();
  }

  start() {
    const loop = (ts) => {
      const dt = Math.min((ts - this.lastTime) / 1000, 0.1);
      this.lastTime = ts;
      this.update(dt);
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(ts => { this.lastTime = ts; requestAnimationFrame(loop); });
  }
}

// ============================================================
// TOOLBAR
// ============================================================
class Toolbar {
  constructor(aq) {
    this.aq          = aq;
    this.color       = '#FFD700';
    this.randomColor = false;
    this.build();
  }

  getColor() {
    return this.randomColor ? randomHex() : this.color;
  }

  build() {
    this.buildSection('fish-items', FISH_TYPES,
      t => { this.aq.addFish(t, this.getColor()); this.updateStats(); });
    this.buildSection('plant-items', PLANT_TYPES,
      t => { this.aq.addPlant(t, this.getColor()); this.updateStats(); });
    this.buildSection('deco-items', DECORATION_TYPES,
      t => { this.aq.addDecoration(t, this.getColor()); this.updateStats(); });

    document.getElementById('btn-feed').onclick  = () => this.aq.feedFish();
    document.getElementById('btn-clear').onclick = () => {
      if (confirm('Clear all fish, plants and decorations?')) {
        this.aq.clearAll();
        this.updateStats();
      }
    };

    // Entity color picker
    this.preview = document.getElementById('color-preview');
    const picker  = document.getElementById('color-picker');
    this.preview.style.background = this.color;

    const openPicker = () => { this.setRandomMode(false); picker.click(); };
    this.preview.addEventListener('click', openPicker);
    document.getElementById('color-section').querySelector('label')
      .addEventListener('click', openPicker);

    const onColorChange = e => {
      this.color = e.target.value;
      this.preview.style.background = this.color;
    };
    picker.addEventListener('input',  onColorChange);
    picker.addEventListener('change', onColorChange);

    // Random color toggle button
    this.randBtn = document.createElement('button');
    this.randBtn.className = 'action-btn rand-btn';
    this.randBtn.title     = 'Random color per item';
    this.randBtn.textContent = 'Rand';
    this.randBtn.onclick = () => this.setRandomMode(!this.randomColor);
    document.getElementById('color-section').appendChild(this.randBtn);

    // Water / background color picker
    const bgPreview = document.getElementById('bg-color-preview');
    const bgPicker  = document.getElementById('bg-color-picker');
    bgPreview.style.background = DEFAULT_BG;

    const openBgPicker = () => bgPicker.click();
    bgPreview.addEventListener('click', openBgPicker);
    document.getElementById('bg-color-section').querySelector('label')
      .addEventListener('click', openBgPicker);

    const onBgChange = e => {
      bgPreview.style.background = e.target.value;
      this.aq.setBgColor(e.target.value);
    };
    bgPicker.addEventListener('input',  onBgChange);
    bgPicker.addEventListener('change', onBgChange);
  }

  setRandomMode(on) {
    this.randomColor = on;
    if (on) {
      this.randBtn.classList.add('active');
      this.preview.style.background =
        'conic-gradient(red,orange,yellow,green,cyan,blue,violet,red)';
    } else {
      this.randBtn.classList.remove('active');
      this.preview.style.background = this.color;
    }
  }

  buildSection(id, types, onClick) {
    const container = document.getElementById(id);
    types.forEach(t => {
      const btn = document.createElement('button');
      btn.className   = 'entity-btn';
      btn.title       = t.name;
      btn.style.color = t.defaultColor;
      btn.innerHTML   = `<span class="btn-ascii">${t.label}</span><span class="btn-name">${t.name}</span>`;
      btn.onclick     = () => onClick(t);
      container.appendChild(btn);
    });
  }

  updateStats() {
    const aq = this.aq;
    document.getElementById('stats').textContent =
      `Fish: ${aq.fish.length}  Plants: ${aq.plants.length}  Decos: ${aq.decorations.length}`;
  }
}

// ============================================================
// INIT
// ============================================================
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('aquarium-canvas');
  const aq = new Aquarium(canvas);
  const tb = new Toolbar(aq);

  // Starter scene
  aq.addFish(FISH_TYPES[0], '#FFD700');   // goldfish
  aq.addFish(FISH_TYPES[1], '#FF6B6B');   // tropical
  aq.addFish(FISH_TYPES[2], '#4ECDC4');   // big fish
  aq.addFish(FISH_TYPES[3], '#FF7043');   // clownfish
  aq.addFish(FISH_TYPES[7], '#A8E6CF');   // angelfish
  aq.addPlant(PLANT_TYPES[0], '#2ECC71');  // seaweed
  aq.addPlant(PLANT_TYPES[1], '#FF7675');  // coral
  aq.addPlant(PLANT_TYPES[2], '#00B894');  // kelp
  aq.addPlant(PLANT_TYPES[3], '#FD79A8');  // anemone
  aq.addDecoration(DECORATION_TYPES[0], '#B2BEC3'); // castle
  aq.addDecoration(DECORATION_TYPES[2], '#FDCB6E'); // treasure
  aq.addDecoration(DECORATION_TYPES[4], '#DFE6E9'); // skull

  tb.updateStats();
  aq.start();
});
