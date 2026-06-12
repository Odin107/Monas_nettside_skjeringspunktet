// main.js – entry point for Skjæringspunktet

// Render chronological project timeline
function renderKronologisk() {
  const view = document.getElementById('kronologisk');
  if (!view || typeof PROJECTS === 'undefined' || PROJECTS.length === 0) return;

  const sorted = [...PROJECTS].sort(function(a, b) { return b.year - a.year; });

  view.innerHTML = '';
  sorted.forEach(function(project) {
    const entry = document.createElement('div');
    entry.className = 'timeline-entry';
    entry.innerHTML =
      '<span class="timeline-entry-year">' + project.year + '</span>' +
      '<a href="projekt.html?id=' + encodeURIComponent(project.id) + '" class="timeline-entry-title">' + project.title + '</a>';
    view.appendChild(entry);
  });
}

// Render thematic project list with accordion
function renderTematisk() {
  const themeList = document.querySelector('.theme-list');
  if (!themeList || typeof PROJECTS === 'undefined') return;

  const categories = [
    'Offentlige prosjekter',
    'Historisk interiør',
    'Konsulent oppdrag',
    'Historisk verktøy',
    'Skulptur',
    'Personlige favoritter'
  ];

  themeList.innerHTML = '';

  categories.forEach(function(cat) {
    const projects = PROJECTS.filter(function(p) {
      return p.categories.includes(cat);
    });

    const li = document.createElement('li');
    li.className = 'theme-category-item';

    const btn = document.createElement('button');
    btn.className = 'theme-category-btn';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML =
      '<span class="theme-category-name">' + cat + '</span>' +
      (projects.length > 0
        ? '<span class="theme-category-count">(' + projects.length + ')</span>'
        : '');

    const sublist = document.createElement('ul');
    sublist.className = 'theme-project-list';
    sublist.hidden = true;

    if (projects.length === 0) {
      const empty = document.createElement('li');
      empty.className = 'theme-no-projects';
      empty.textContent = 'Ingen prosjekter ennå';
      sublist.appendChild(empty);
    } else {
      projects.sort(function(a, b) { return b.year - a.year; });
      projects.forEach(function(p) {
        const pli = document.createElement('li');
        pli.innerHTML =
          '<a href="projekt.html?id=' + encodeURIComponent(p.id) + '">' +
          p.title +
          '<span class="theme-project-year"> ' + p.year + '</span>' +
          '</a>';
        sublist.appendChild(pli);
      });
    }

    btn.addEventListener('click', function() {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      sublist.hidden = expanded;
    });

    li.appendChild(btn);
    li.appendChild(sublist);
    themeList.appendChild(li);
  });
}

// Toggle between kronologisk and tematisk views
function initProjectsToggle() {
  const buttons = document.querySelectorAll('.projects-toggle-btn');
  const views = document.querySelectorAll('.projects-view');

  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const target = btn.getAttribute('data-view');

      buttons.forEach(function(b) {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });

      views.forEach(function(v) {
        v.hidden = v.id !== target;
      });
    });
  });
}

// Keep footer year current
function updateFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

// Fade sections in as they scroll into view
function initReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll('#about, #projects, #contact');
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function(t) {
    t.classList.add('reveal');
    observer.observe(t);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderKronologisk();
  renderTematisk();
  initProjectsToggle();
  updateFooterYear();
  initReveal();
});
