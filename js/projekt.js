// projekt.js – renders a single project detail page

document.addEventListener('DOMContentLoaded', function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const content = document.getElementById('projekt-content');

  if (!id || typeof PROJECTS === 'undefined') {
    content.innerHTML = '<section><p>Prosjekt ikke funnet.</p><a href="index.html">← Tilbake</a></section>';
    return;
  }

  const project = PROJECTS.find(function(p) { return p.id === id; });

  if (!project) {
    content.innerHTML = '<section><p>Prosjekt ikke funnet.</p><a href="index.html">← Tilbake</a></section>';
    return;
  }

  document.title = project.title + ' – Skjæringspunktet';

  let imagesHTML = '';
  if (project.images && project.images.length > 0) {
    imagesHTML = '<div class="projekt-images">' +
      project.images.map(function(src) {
        return '<img src="' + src + '" alt="' + project.title + '" class="projekt-image" />';
      }).join('') +
      '</div>';
  } else {
    imagesHTML = '<div class="projekt-images-placeholder">Bilder kommer</div>';
  }

  const desc = project.description || project.shortDescription || '';

  content.innerHTML =
    '<section class="projekt-detail">' +
      '<div class="projekt-meta">' +
        '<span class="projekt-year">' + project.year + '</span>' +
        '<span class="projekt-categories">' + project.categories.join(', ') + '</span>' +
      '</div>' +
      '<h1 class="projekt-title">' + project.title + '</h1>' +
      imagesHTML +
      '<div class="projekt-description"><p>' + desc + '</p></div>' +
    '</section>';
});
