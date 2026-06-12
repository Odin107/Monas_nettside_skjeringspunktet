// projekt.js – renders a single project detail page

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const content = document.getElementById('projekt-content');

  const notFound = '<section><p>Prosjekt ikke funnet.</p><p><a href="index.html" class="back-link">← Tilbake til forsiden</a></p></section>';

  if (!id || typeof PROJECTS === 'undefined') {
    content.innerHTML = notFound;
    return;
  }

  const project = PROJECTS.find(function(p) { return p.id === id; });

  if (!project) {
    content.innerHTML = notFound;
    return;
  }

  document.title = project.title + ' – Skjæringspunktet';

  let imagesHTML = '';
  if (project.images && project.images.length > 0) {
    imagesHTML = '<div class="projekt-images">' +
      project.images.map(function(src) {
        return '<img src="' + src + '" alt="' + project.title + '" class="projekt-image" loading="lazy" />';
      }).join('') +
      '</div>';
  } else {
    imagesHTML = '<div class="projekt-images-placeholder">Bilder kommer</div>';
  }

  const desc = project.description || project.shortDescription || '';

  // Prev/next navigation between projects, newest first
  const sorted = [...PROJECTS].sort(function(a, b) { return b.year - a.year; });
  const idx = sorted.findIndex(function(p) { return p.id === project.id; });
  const prev = idx > 0 ? sorted[idx - 1] : null;
  const next = idx < sorted.length - 1 ? sorted[idx + 1] : null;

  let navHTML = '';
  if (prev || next) {
    navHTML = '<nav class="projekt-nav" aria-label="Flere prosjekter">' +
      (prev
        ? '<a href="projekt.html?id=' + encodeURIComponent(prev.id) + '" class="nav-prev">' +
          '<span class="nav-label">← Nyere</span>' + prev.title + '</a>'
        : '') +
      (next
        ? '<a href="projekt.html?id=' + encodeURIComponent(next.id) + '" class="nav-next">' +
          '<span class="nav-label">Eldre →</span>' + next.title + '</a>'
        : '') +
      '</nav>';
  }

  content.innerHTML =
    '<section class="projekt-detail">' +
      '<div class="projekt-meta">' +
        '<span class="projekt-year">' + project.year + '</span>' +
        '<span class="projekt-categories">' + project.categories.join(', ') + '</span>' +
      '</div>' +
      '<h1 class="projekt-title">' + project.title + '</h1>' +
      imagesHTML +
      '<div class="projekt-description"><p>' + desc + '</p></div>' +
      navHTML +
    '</section>';

  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
