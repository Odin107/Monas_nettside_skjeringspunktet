// main.js – entry point for Skjæringspunktet

// Render chronological project timeline
function renderKronologisk() {
  const timeline = document.querySelector('.timeline');
  if (!timeline || typeof PROJECTS === 'undefined' || PROJECTS.length === 0) return;

  const sorted = [...PROJECTS].sort((a, b) => b.year - a.year);

  timeline.innerHTML = '';
  sorted.forEach(project => {
    const entry = document.createElement('div');
    entry.className = 'timeline-entry';
    entry.innerHTML =
      '<span class="timeline-entry-year">' + project.year + '</span>' +
      '<a href="projekt.html?id=' + project.id + '" class="timeline-entry-title">' + project.title + '</a>';
    timeline.appendChild(entry);
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
          '<a href="projekt.html?id=' + p.id + '">' +
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

      buttons.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      views.forEach(function(v) {
        v.hidden = v.id !== target;
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderKronologisk();
  renderTematisk();
  initProjectsToggle();
});
