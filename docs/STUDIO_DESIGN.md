# Studio homepage

Main public URL: https://pathai.name.ng

The studio uses a charcoal canvas, warm white text, dark grey surfaces and soft yellow actions. Kitchen, Salon and Fashion retain their own palettes; homepage tokens and colour-scheme are scoped to the studio.

Geist is self-hosted (29.4 KB Latin variable WOFF2, weights 100–900), paired with Instrument Serif italic (22.1 KB Latin WOFF2). Both SIL Open Font License notices are beside their assets. Sources: Google Fonts, https://fonts.google.com/specimen/Geist and https://fonts.google.com/specimen/Instrument+Serif.

The layout uses a 1280 px maximum width, 48/32/20 px responsive side gutters and a predominantly 8 px spacing scale. The first screen pairs an editorial headline and serif accent with independently linked, overlapping Fashion and Tevo previews. The illustration is HTML/CSS using existing imagery, not a generated UI screenshot. Below 760 px the hero stacks. Native horizontal galleries keep project and business previews compact, with numbered section labels and large titles. Five compact service rows retain working enquiry links.

Colour tokens: canvas #101010, surfaces #1B1C19, text #EFEEE8, supporting text #ADAFA4, dividers #34352F, accent #E9D86E. Yellow buttons use dark text. Form states and keyboard focus are visible. Motion uses short CSS transforms/opacity and respects reduced-motion settings; content remains present without JavaScript. No new runtime dependencies, shaders, cursor tracking or generated UI imagery.

The reusable project skill `.agents/skills/studio-ui-design/SKILL.md` includes selected MIT-licensed prompts from ui-prompt-library, claude-directory and awesome-web-prompts, with attribution and pinned source commits. Editorial typography, asymmetry and explicit measurements inform the implementation; upstream dependency commands, agents and asset URLs are not imported. Layout precision comes from CSS measurements and responsive checks, not image-generation terminology.
