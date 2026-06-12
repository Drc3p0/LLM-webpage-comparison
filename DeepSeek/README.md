# LLM-webpage-comparison
Each LLM given the same prompt to create a static webpage with index.html, styles.css, and script.js to see how the results compare. 

DeepSeek one-shot results using free version of DeepSeek at chat.deepseek.com
DeepSeek cannot accept image uploads, so I told it the name of the files to include, and said to use the title descriptions to modify the web content as it saw fit. 

Prompt given: 

Build a cat portfolio website for GitHub Pages.

OUTPUT REQUIREMENTS:
- Three files, each clearly labeled with its filename before the code block:
    index.html (structure and content only)
    styles.css (all styling)
    script.js (any interactivity — omit if unused)
- index.html must link to styles.css and script.js using relative paths
- Must work as a static GitHub Page with no build step
- Output raw code only — no markdown explanation, just filename labels and code blocks
- If you cannot complete all three files within your token limit,
  prioritize index.html, then styles.css, then script.js

DESIGN REQUIREMENTS:
- Cyberpunk color palette — your choice of specific colors, make them feel intentional
- Layout, typography, and structure are entirely your creative call
- Must be fully responsive (mobile and desktop)
- Keyboard accessible interactive elements

CONTENT TO INCLUDE:
- A gallery using all the uploaded images.
  Each image must degrade gracefully if missing (styled placeholder, not a broken img tag)
- A link to Instagram: https://www.instagram.com/cats.bounce/
- A link to the main website: https://cat-bounce.com/
- A mailto contact link
- Write real, witty cat-themed copy throughout — no lorem ipsum

CONSTRAINTS:
- No external dependencies, frameworks, or CDN links
- Respect prefers-reduced-motion for any transitions
