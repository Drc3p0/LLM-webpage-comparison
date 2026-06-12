// CYBERPUNK CAT GALLERY GENERATOR — 5 CUSTOM IMAGES WITH THEMED CONTENT
// Filenames: cats.jpg, cuddlecats.jpg, cutekitten.jpg, fightingcats.jpg, kittens.jpg
// No external dependencies — pure vanilla DOM manipulation

(function () {
  // Witty cat-themed data matching the 5 specific images
  // Each entry includes alt text, caption, and filename
  const catGalleryData = [
    {
      filename: "cats.jpg",
      alt: "Cyberpunk collective of cats hacking the mainframe — neon whiskers and glowing eyes",
      caption: "COLLECTIVE_MEOW",
      wittyDesc: "// gang of digital strays //",
    },
    {
      filename: "cuddlecats.jpg",
      alt: "Two cats in a cuddle puddle — chaotic affection levels off the charts",
      caption: "CUDDLE_OVERFLOW",
      wittyDesc: "// purr unit: affectionate.exe //",
    },
    {
      filename: "cutekitten.jpg",
      alt: "Smol kitten with cyberpunk collar — weaponized cuteness detected",
      caption: "KITTEN_BOOT",
      wittyDesc: "// danger: extreme fluff //",
    },
    {
      filename: "fightingcats.jpg",
      alt: "Dramatic cat battle — blur motion, flying fur, zero actual violence",
      caption: "CLAW_CONFLICT",
      wittyDesc: "// aggressive negotiations //",
    },
    {
      filename: "kittens.jpg",
      alt: "Multiple kittens staging a server room takeover — tiny paws, big chaos",
      caption: "KITTEN_RAID",
      wittyDesc: "// swarm mode activated //",
    },
  ];

  const galleryContainer = document.getElementById("cat-gallery");
  if (!galleryContainer) return;

  // Clear any placeholder content
  galleryContainer.innerHTML = "";

  // Loop through all 5 images and generate gallery cards
  catGalleryData.forEach((item, index) => {
    const imageSrc = item.filename;

    const card = document.createElement("article");
    card.className = "cat-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Cat gallery item: ${item.alt}`);

    const imgContainer = document.createElement("div");
    imgContainer.className = "image-container";

    const img = document.createElement("img");
    img.className = "cat-img";
    img.src = imageSrc;
    img.alt = item.alt;
    img.loading = "lazy";

    // Create stylish fallback placeholder (shown only if image fails to load)
    const fallbackDiv = document.createElement("div");
    fallbackDiv.className = "fallback-placeholder";
    fallbackDiv.setAttribute("aria-hidden", "true");

    // Themed fallback content based on image type
    let fallbackIcon = "🐈‍⬛💾";
    if (item.caption === "CUDDLE_OVERFLOW") fallbackIcon = "🤗🐱";
    else if (item.caption === "KITTEN_BOOT") fallbackIcon = "🐱✨";
    else if (item.caption === "CLAW_CONFLICT") fallbackIcon = "⚔️🐈";
    else if (item.caption === "KITTEN_RAID") fallbackIcon = "🐱🐱🐱";

    fallbackDiv.innerHTML = `
            <span>${fallbackIcon}</span>
            <span>#[${item.caption}]</span>
            <small>${item.wittyDesc}</small>
            <small style="font-size:0.6rem;">(pixel stream offline // check data cable)</small>
        `;
    fallbackDiv.style.display = "none";

    // Handle broken images: hide img and show fallback
    const handleImageError = () => {
      img.style.display = "none";
      fallbackDiv.style.display = "flex";
      img.classList.add("error-fallback");
    };

    // Success handler: ensure fallback hidden
    img.onload = () => {
      img.style.display = "block";
      fallbackDiv.style.display = "none";
    };

    // Error handler: display fallback
    img.onerror = handleImageError;

    imgContainer.appendChild(img);
    imgContainer.appendChild(fallbackDiv);

    // Create caption section with witty tags
    const captionDiv = document.createElement("div");
    captionDiv.className = "cat-caption";
    captionDiv.innerHTML = `
            <span class="chip">[${item.caption}]</span>
            <span class="chip">🐾 0x${(index + 1).toString(16).toUpperCase()}</span>
        `;

    card.appendChild(imgContainer);
    card.appendChild(captionDiv);

    galleryContainer.appendChild(card);

    // Additional safety check for cached images that might have failed before event binding
    if (img.complete) {
      if (img.naturalWidth === 0) {
        handleImageError();
      }
    }
  });

  // Add a console message to confirm gallery initialization
  console.log(
    "%c🐱 NEON CLAWS — 5-IMAGE GALLERY ACTIVE // cats.jpg, cuddlecats.jpg, cutekitten.jpg, fightingcats.jpg, kittens.jpg",
    "color: #05f0fc; font-size: 12px; font-family: monospace",
  );

  // Add hover and keyboard accessibility effects (respects reduced motion)
  const cards = document.querySelectorAll(".cat-card");
  cards.forEach((card) => {
    // Mouse enter animation (only if motion is allowed)
    card.addEventListener("mouseenter", () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      card.style.transform = "translateY(-3px)";
      card.style.transition = "transform 0.15s";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });

    // Keyboard accessibility: Enter or Space triggers a visual feedback
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.style.outline = "3px solid #ffd319";
        card.style.outlineOffset = "2px";
        setTimeout(() => {
          card.style.outline = "";
        }, 200);

        // Announce the image caption via console or could be expanded
        const caption =
          card.querySelector(".cat-caption .chip:first-child")?.innerText ||
          "cat image";
        console.log(`🐱 Keyboard activated: ${caption}`);
      }
    });
  });

  // Optional: Add a dynamic terminal-style status update
  const statusLed = document.querySelector(".status-led");
  if (statusLed) {
    setInterval(() => {
      if (statusLed.style.opacity === "0.5") {
        statusLed.style.opacity = "1";
      } else {
        statusLed.style.opacity = "0.5";
      }
    }, 800);
  }
})();
