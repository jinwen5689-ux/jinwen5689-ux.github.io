const data = window.PROFILE_DATA;

if (!data) {
  throw new Error("Profile data was not loaded.");
}

const profile = data.profile;
const sections = data.sections;

document.title = profile.siteTitle;
document.getElementById("hero-title").textContent = profile.heroTitle;
document.getElementById("hero-subtitle").textContent = profile.heroSubtitle;
document.getElementById("hero-meta").textContent = profile.heroMeta || "";
document.getElementById("hero-intro").textContent = profile.heroIntro;

const navLinks = document.getElementById("nav-links");
const rail = document.getElementById("section-rail");
const heroTags = document.getElementById("hero-tags");
const content = document.getElementById("content");

profile.heroTags.forEach((tagText) => {
  const tag = document.createElement("span");
  tag.className = "tag";
  tag.textContent = tagText;
  heroTags.appendChild(tag);
});

sections.forEach((section, index) => {
  const navLink = document.createElement("a");
  navLink.href = `#${section.id}`;
  navLink.textContent = section.title;
  navLinks.appendChild(navLink);

  const railLink = document.createElement("a");
  railLink.href = `#${section.id}`;
  railLink.textContent = `${String(index + 1).padStart(2, "0")} ${section.title}`;
  rail.appendChild(railLink);

  const card = document.createElement("section");
  card.className = `section-card theme-${section.theme}`;
  card.id = section.id;

  const head = document.createElement("div");
  head.className = "section-head";
  head.innerHTML = `
    <div>
      <p class="section-index">Section ${String(index + 1).padStart(2, "0")}</p>
      <h2 class="section-title">${section.title}</h2>
    </div>
  `;
  card.appendChild(head);

  if (section.theme === "honors" || section.theme === "skills") {
    const grid = document.createElement("div");
    grid.className = "pill-grid";
    section.items.forEach((item) => {
      const pill = document.createElement("div");
      pill.className = "pill-entry";
      pill.textContent = item.text;
      grid.appendChild(pill);
    });
    card.appendChild(grid);
  } else {
    const list = document.createElement("div");
    list.className = "section-list";
    section.items.forEach((item) => {
      const entry = document.createElement("article");
      entry.className = "entry";

      const title = document.createElement("h3");
      title.className = "entry-title";
      title.textContent = item.title;
      entry.appendChild(title);

      if (item.details.length) {
        const ul = document.createElement("ul");
        item.details.forEach((detail) => {
          const li = document.createElement("li");
          li.textContent = detail.replace(/^•\s*/, "");
          ul.appendChild(li);
        });
        entry.appendChild(ul);
      }

      list.appendChild(entry);
    });
    card.appendChild(list);
  }

  content.appendChild(card);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".section-card").forEach((card, index) => {
  card.style.transitionDelay = `${index * 70}ms`;
  observer.observe(card);
});
