// The Mausoleum at Halicarnassus: everything about this world in one place. World.jsx, layout.js,
// the guide and the chat all read from here; Scene.jsx draws the tomb.
const HUB = 'https://zlisto.github.io/hub_world/'

// the tomb, scaled to about 0.7 of its real ~45 m height: podium, colonnade, stepped roof, chariot
export const PODIUM = { x0: -13, x1: 13, z0: -21, z1: 1, h: 14 }

export default {
  id: 'mausoleum',
  name: 'Mausoleum at Halicarnassus',
  place: 'Halicarnassus, Caria · c. 350 BCE',
  blurb: 'Stand in the courtyard of the tomb that gave us the word "mausoleum": a towering podium, a ring of Ionic columns, a stepped pyramid roof and a marble chariot on top. Scopabubu the sculptor will tell you its story.',

  guideName: 'Scopabubu',
  guideRole: 'sculptor of the Mausoleum',
  guideIcon: '🔨',
  greeting: (v) =>
    `Ah, welcome${v ? `, ${v}` : ''}! I'm Scopabubu, one of the sculptors carving this tomb. Every grand tomb in the world will one day be called a "mausoleum," after the man buried here. Look up at our work, then ask me anything.`,
  facts: [
    {
      q: 'Whose tomb is this?',
      a: `**Mausolus**, ruler of **Caria** in what's now southwest Turkey. He governed for the Persian Empire as a satrap, but ruled like a king from his capital, **Halicarnassus** (today's Bodrum).

He died in **353 BCE**. His wife, who was also his sister, **Artemisia II**, carried on the building, and it was finished after her own death around **350 BCE**.`,
    },
    {
      q: 'Where does the word "mausoleum" come from?',
      a: `From **Mausolus** himself. His tomb was so famous that the Greeks and Romans started calling any grand tomb a *mausoleum*, and the word stuck in many languages.

So the Taj Mahal, Lenin's tomb and many family crypts are all, in a sense, named after this building.`,
    },
    {
      q: 'What did it look like?',
      a: `It rose about **45 m** in three parts:
- A tall **podium** of stone, wrapped in sculpted friezes.
- A ring of **36 Ionic columns**.
- A **stepped pyramid roof** of 24 steps, topped by a marble **four-horse chariot** (a *quadriga*).
The Greek architects **Satyros** and **Pytheos** designed it. This one is scaled to about 70%.`,
    },
    {
      q: 'Who made the sculptures?',
      a: `According to **Pliny the Elder**, four of the most famous Greek sculptors each took one side: **Scopas** on the east, **Bryaxis** on the north, **Timotheus** on the south and **Leochares** on the west.

Their friezes showed battles, like Greeks fighting **Amazons** and **centaurs**. Pliny says the sculptors kept working after Artemisia died, for their own glory and the art itself.`,
    },
    {
      q: 'Is it true Artemisia drank his ashes?',
      a: `So the story goes. Later Roman writers said Artemisia was so heartbroken that she **mixed Mausolus's ashes into her drink** every day, and died of grief two years later.

It's a legend, not a fact we can check. What's certain is that she held a famous **contest of speeches** in his honor and pushed the tomb to completion.`,
    },
    {
      q: 'What happened to it?',
      a: `It stood for about **1,700 years**, surviving even Alexander the Great's siege of the city in 334 BCE. Then **earthquakes** between the 12th and 15th centuries brought it down.

Around 1494–1522, the **Knights of St. John** took its stones, and burned much of its marble for lime, to build and strengthen **Bodrum Castle**, where you can still see some blocks today.`,
    },
    {
      q: 'Can you still see any of it?',
      a: `Yes, in two places:
- In **Bodrum**, the site has foundations, scattered column pieces and a small museum.
- In the **British Museum** in London, which holds pieces of the Amazon frieze, a huge marble horse from the chariot, and two colossal statues long thought to be Mausolus and Artemisia. They were excavated by **Charles Newton** in 1856–57.`,
    },
  ],

  outfit: {
    fur: '#9a7a5a',
    expression: 'grin',
    shirt: '#7a8fa8', // a working tunic
    skirt: '#7a8fa8',
    skirtLength: 0.24,
    parts: [['himation', { a: '#efe8da' }], ['mallet']],
  },

  env: { sky: '#9fc6ea', fog: '#d9e2e8', fogNear: 110, fogFar: 430, ground: '#b7ad98', hemiSky: '#fff4e2', hemiGround: '#8a8270', sun: [50, 80, 40], sunIntensity: 1.8 },
  speed: { walk: 5, run: 9 },
  bound: 70,
  spawn: { x: 0, z: 44, yaw: 0 },
  portal: { x: -9, z: 50, rot: Math.PI, href: HUB, spawn: 'by_mausoleum' },
  guide: { x: 4, z: 39, rot: Math.atan2(-4, 5) },
  boxes: [
    { x0: PODIUM.x0 - 0.6, x1: PODIUM.x1 + 0.6, z0: PODIUM.z0 - 0.6, z1: PODIUM.z1 + 0.6 },
    // the courtyard walls (the gateway in the south wall stays open)
    { x0: -36, x1: -35, z0: -46, z1: 30 },
    { x0: 35, x1: 36, z0: -46, z1: 30 },
    { x0: -36, x1: 36, z0: -47, z1: -46 },
    { x0: -36, x1: -5, z0: 30, z1: 31 },
    { x0: 5, x1: 36, z0: 30, z1: 31 },
  ],
  circles: [-1, 1].flatMap((s) => [-16, -6, 4].map((z) => ({ x: s * 16.5, z: z - 4, r: 1.1 }))), // the lions
  areas: [
    { x: 0, z: -10, r: 20, label: 'at the foot of the Mausoleum' },
    { x: 0, z: 0, r: 36, label: 'in the courtyard of the Mausoleum' },
  ],
  elsewhere: 'in Halicarnassus',
}
