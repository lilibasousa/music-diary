/* ---------- Icons (inline SVG, dependency-free) ---------- */
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-7 9 7"/><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"/></svg>',
  diary: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 012-2h11a1 1 0 011 1v15a1 1 0 01-1 1H6a2 2 0 00-2 2V5z"/><path d="M4 19.5A2.5 2.5 0 016.5 17H18"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20s-7-4.35-9.5-8.8C.7 8 2 4.5 5.5 4c2-.3 3.8.7 6.5 3.2C14.7 4.7 16.5 3.7 18.5 4 22 4.5 23.3 8 21.5 11.2 19 15.65 12 20 12 20z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 20s-7-4.35-9.5-8.8C.7 8 2 4.5 5.5 4c2-.3 3.8.7 6.5 3.2C14.7 4.7 16.5 3.7 18.5 4 22 4.5 23.3 8 21.5 11.2 19 15.65 12 20 12 20z"/></svg>',
  arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>',
  external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2"/><path d="M6 7l1 13a1 1 0 001 1h8a1 1 0 001-1l1-13"/><path d="M10 11v6M14 11v6"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L6 21l1.6-7L2.2 9.2l7.1-.6L12 2z"/></svg>',
};

function starSvg() {
  return ICONS.star;
}
function starDisplayHtml(rating) {
  let out = '<span class="star-display">';
  for (let i = 0; i < 5; i++) {
    out += `<svg viewBox="0 0 24 24" fill="currentColor" class="${i < rating ? 'filled' : ''}"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L6 21l1.6-7L2.2 9.2l7.1-.6L12 2z"/></svg>`;
  }
  return out + '</span>';
}
function starButtonsHtml(id, initialRating) {
  let out = `<div class="star-rating" id="${id}">`;
  for (let i = 1; i <= 5; i++) {
    out += `<button type="button" data-i="${i}" class="${i <= initialRating ? 'filled' : ''}">${starSvg()}</button>`;
  }
  return out + '</div>';
}
function wireStarRating(id, initialRating, onChange) {
  const btns = Array.from(document.querySelectorAll(`#${id} button`));
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const i = parseInt(btn.dataset.i, 10);
      btns.forEach((b) => b.classList.toggle('filled', parseInt(b.dataset.i, 10) <= i));
      onChange(i);
    });
  });
}
function wireFavoriteSwitch(id, initial, onChange) {
  const el = document.getElementById(id);
  let state = !!initial;
  el.classList.toggle('on', state);
  el.addEventListener('click', () => {
    state = !state;
    el.classList.toggle('on', state);
    onChange(state);
  });
}

function escapeHtml(s) {
  const d = document.createElement('div');
  d.textContent = s == null ? '' : s;
  return d.innerHTML;
}
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('show'));
  setTimeout(() => {
    t.classList.remove('show');
    setTimeout(() => t.remove(), 300);
  }, 2200);
}
function bottomNavHtml(active) {
  return `
  <nav class="bottom-nav">
    <a href="#/hoje" class="nav-item ${active === 'hoje' ? 'active' : ''}">${ICONS.home}<span>Hoje</span></a>
    <a href="#/diario" class="nav-item ${active === 'diario' ? 'active' : ''}">${ICONS.diary}<span>Diário</span></a>
    <a href="#/favoritos" class="nav-item ${active === 'favoritos' ? 'active' : ''}">${ICONS.heart}<span>Favoritos</span></a>
  </nav>`;
}
function brandHtml() {
  return `<div class="brand">${ICONS.music}<span>Diário Musical</span></div>`;
}

/* ---------- Router ---------- */
function parseHash() {
  const hash = location.hash.slice(1) || '/hoje';
  const [path, query] = hash.split('?');
  const params = new URLSearchParams(query || '');
  return { path: path.replace(/^\//, '') || 'hoje', params };
}
function router() {
  const { path, params } = parseHash();
  switch (path) {
    case 'hoje': return renderHome();
    case 'estilo': return renderGenrePicker();
    case 'epoca': return renderEraPicker(params);
    case 'ouvir': return renderPlayer(params);
    case 'diario': return renderDiary();
    case 'favoritos': return renderFavorites();
    case 'entrada': return renderEntryDetail(params);
    default: return renderHome();
  }
}
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', () => {
  if (!location.hash) location.hash = '#/hoje';
  router();
});

/* ---------- Home ---------- */
function renderHome() {
  const today = todayLocalIso();
  const entry = Storage.getEntryByDate(today);

  const body = entry ? `
    <div class="song-card">
      <div class="song-card-top">
        <div>
          <span class="genre-chip">${escapeHtml(genreLabel(entry.genre))}</span>
          ${entry.era ? `<span class="era-chip">${escapeHtml(eraChipLabel(entry.era))}</span>` : ''}
        </div>
        ${entry.favorite ? `<span class="entry-heart" style="width:20px;height:20px;">${ICONS.heartFilled}</span>` : ''}
      </div>
      <div class="song-title">${escapeHtml(entry.title)}</div>
      <div class="song-artist">${escapeHtml(entry.artist)}</div>
      <div style="margin-top:14px;">${starDisplayHtml(entry.rating)}</div>
      ${entry.comment ? `<p class="muted" style="margin-top:12px;">"${escapeHtml(entry.comment)}"</p>` : ''}
    </div>
    <a href="#/entrada?date=${today}" class="btn-secondary" style="margin-top:16px;">${ICONS.music} Ouvir novamente / editar avaliação</a>
    <a href="#/estilo" class="btn-ghost">Escolher outra música para hoje</a>
  ` : `
    <div class="empty-state" style="padding:20px 4px 0;">
      <div class="empty-icon">${ICONS.music}</div>
      <p class="title-lg">Ainda não ouviram a música de hoje</p>
      <p class="muted">Escolhe um estilo, ouve a sugestão juntos e no fim avaliem-na como um pequeno ritual antes de dormir.</p>
      <a href="#/estilo" class="btn-primary" style="margin-top:20px;">Escolher estilo de música</a>
    </div>
  `;

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="dash-header">
        <div class="brand-row">${brandHtml()}</div>
        <div>
          <div class="name-hero">Olá! 👋</div>
          <div class="date-sub">${weekdayLabel(today)}, ${exactDateLabel(today)}</div>
        </div>
      </div>
      <div class="header-divider"></div>
      <div class="scroll-body">${body}</div>
      ${bottomNavHtml('hoje')}
    </div>`;
}

/* ---------- Genre picker ---------- */
function renderGenrePicker() {
  const cards = GENRES.map((g) => `
    <a class="genre-card" href="#/epoca?genre=${g.id}">
      <div class="genre-name">${escapeHtml(g.label)}</div>
      <div class="genre-desc">${escapeHtml(g.desc)}</div>
    </a>`).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="topbar spread">
        <a href="#/hoje" class="back-btn">${ICONS.arrowLeft}</a>
        <div class="topbar-title">Que estilo apetece hoje?</div>
        <span class="spacer-36"></span>
      </div>
      <div class="scroll-body">
        <p class="hint-text" style="margin:8px 0 16px;">Escolhe um estilo e a seguir a época da música.</p>
        <div class="genre-grid">${cards}</div>
      </div>
    </div>`;
}

/* ---------- Era picker ---------- */
function renderEraPicker(params) {
  const genreId = params.get('genre');
  if (!GENRES.find((g) => g.id === genreId)) {
    location.hash = '#/estilo';
    return;
  }
  const cards = ERAS.map((e) => `
    <a class="genre-card" href="#/ouvir?genre=${genreId}&era=${e.id}">
      <div class="genre-name">${escapeHtml(e.label)}</div>
      <div class="genre-desc">${escapeHtml(e.desc)}</div>
    </a>`).join('');

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="topbar spread">
        <a href="#/estilo" class="back-btn">${ICONS.arrowLeft}</a>
        <div class="topbar-title">De que época?</div>
        <span class="spacer-36"></span>
      </div>
      <div class="scroll-body">
        <p class="hint-text" style="margin:8px 0 16px;">${escapeHtml(genreLabel(genreId))} — escolhe a época e a app sugere logo uma música para ouvirem juntos.</p>
        <div class="genre-grid">${cards}</div>
      </div>
    </div>`;
}

/* ---------- Player (today's pick, not yet saved) ---------- */
let playerState = null;

function renderPlayer(params) {
  const genreId = params.get('genre');
  const eraId = params.get('era');
  if (!GENRES.find((g) => g.id === genreId)) {
    location.hash = '#/estilo';
    return;
  }
  if (!ERAS.find((e) => e.id === eraId)) {
    location.hash = `#/epoca?genre=${genreId}`;
    return;
  }
  if (!playerState || playerState.genre !== genreId || playerState.era !== eraId) {
    const used = Storage.usedTitlesForGenre(genreId);
    const song = pickSong(genreId, eraId, used, null);
    playerState = { genre: genreId, era: eraId, song, rating: 0, comment: '', favorite: false };
  }
  drawPlayerScreen();
}

function drawPlayerScreen() {
  const { genre, era, song, rating, comment, favorite } = playerState;
  const noEraMatch = !eraHasSongs(genre, era);
  const canShuffle = hasAlternative(genre, era, song.title);

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="topbar spread">
        <a href="#/epoca?genre=${genre}" class="back-btn">${ICONS.arrowLeft}</a>
        <div class="topbar-title">${escapeHtml(genreLabel(genre))}</div>
        <span class="spacer-36"></span>
      </div>
      <div class="scroll-body">
        <div class="song-card">
          <span class="genre-chip">${escapeHtml(genreLabel(genre))}</span>
          <span class="era-chip">${escapeHtml(eraChipLabel(song.era))}</span>
          <div class="song-title">${escapeHtml(song.title)}</div>
          <div class="song-artist">${escapeHtml(song.artist)}</div>
        </div>
        ${noEraMatch ? `<p class="hint-text" style="margin:12px 0 0;">Ainda não temos sugestões de ${escapeHtml(eraLabel(era)).toLowerCase()} neste estilo — escolhemos outra época deste estilo.</p>` : ''}
        <p class="hint-text" style="margin:14px 0;">Toquem a música num destes sítios. Quando terminarem de ouvir, voltem aqui para avaliar.</p>
        <div class="listen-buttons">
          <a class="btn-primary" href="${youtubeSearchUrl(song)}" target="_blank" rel="noopener">${ICONS.external} Tocar no YouTube</a>
          <a class="btn-secondary" href="${spotifySearchUrl(song)}" target="_blank" rel="noopener">${ICONS.external} Ouvir no Spotify</a>
        </div>
        ${canShuffle ? `<button class="btn-ghost" id="shuffle-btn">${ICONS.shuffle} Sugerir outra música deste estilo</button>` : ''}

        <div class="section-divider" style="margin:18px 0;"></div>

        <p class="section-label" style="margin-top:0;">O que acharam?</p>
        ${starButtonsHtml('rate-stars', rating)}

        <div class="favorite-toggle">
          <span class="favorite-toggle-label">${ICONS.heart} Adicionar aos favoritos</span>
          <div class="switch" id="fav-switch"></div>
        </div>

        <div class="field">
          <span class="field-label">Comentário (opcional)</span>
          <div class="textarea-box">
            <textarea id="comment-input" placeholder="O que gostaram nesta música?">${escapeHtml(comment)}</textarea>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <button class="btn-primary" id="save-btn">Guardar avaliação de hoje</button>
      </div>
    </div>`;

  const shuffleBtn = document.getElementById('shuffle-btn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      const used = Storage.usedTitlesForGenre(playerState.genre);
      playerState.song = pickSong(playerState.genre, playerState.era, used, playerState.song.title);
      playerState.rating = 0;
      playerState.comment = '';
      playerState.favorite = false;
      drawPlayerScreen();
    });
  }
  wireStarRating('rate-stars', rating, (v) => { playerState.rating = v; });
  wireFavoriteSwitch('fav-switch', favorite, (v) => { playerState.favorite = v; });
  document.getElementById('comment-input').addEventListener('input', (e) => { playerState.comment = e.target.value; });

  document.getElementById('save-btn').addEventListener('click', () => {
    if (!playerState.rating) {
      toast('Escolhe pelo menos uma estrela.');
      return;
    }
    Storage.upsertEntry({
      date: todayLocalIso(),
      genre: playerState.genre,
      era: playerState.song.era,
      title: playerState.song.title,
      artist: playerState.song.artist,
      rating: playerState.rating,
      comment: playerState.comment.trim(),
      favorite: playerState.favorite,
      createdAt: new Date().toISOString(),
    });
    playerState = null;
    toast('Avaliação guardada!');
    location.hash = '#/hoje';
  });
}

/* ---------- Diary (history) ---------- */
function entryRowHtml(e) {
  const d = new Date(e.date + 'T00:00:00');
  const day = String(d.getDate()).padStart(2, '0');
  const month = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][d.getMonth()];
  return `
    <a class="entry-row" href="#/entrada?date=${e.date}">
      <div class="entry-date-badge">
        <div class="entry-date-day">${day}</div>
        <div class="entry-date-month">${month}</div>
      </div>
      <div class="entry-info">
        <div class="entry-title">${escapeHtml(e.title)}</div>
        <div class="entry-artist">${escapeHtml(e.artist)}${e.era ? ` · ${escapeHtml(eraChipLabel(e.era))}` : ''}</div>
        <div class="entry-meta">
          ${starDisplayHtml(e.rating)}
          ${e.favorite ? `<span class="entry-heart">${ICONS.heartFilled}</span>` : ''}
        </div>
      </div>
    </a>`;
}

function renderDiary() {
  const entries = Storage.getEntries();
  const body = entries.length
    ? entries.map(entryRowHtml).join('')
    : `<div class="empty-state"><div class="empty-icon">${ICONS.diary}</div><p class="title-lg">Ainda sem registos</p><p class="muted">As músicas que ouvirem e avaliarem vão aparecer aqui, dia a dia.</p></div>`;

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="dash-header">
        <div class="brand-row">${brandHtml()}</div>
        <div class="name-hero">Diário</div>
      </div>
      <div class="header-divider"></div>
      <div class="scroll-body">${body}</div>
      ${bottomNavHtml('diario')}
    </div>`;
}

/* ---------- Favorites ---------- */
function renderFavorites() {
  const entries = Storage.getFavorites();
  const body = entries.length
    ? entries.map(entryRowHtml).join('')
    : `<div class="empty-state"><div class="empty-icon">${ICONS.heart}</div><p class="title-lg">Sem favoritos ainda</p><p class="muted">Quando avaliarem uma música que adoraram, marquem-na como favorita para a encontrar aqui.</p></div>`;

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="dash-header">
        <div class="brand-row">${brandHtml()}</div>
        <div class="name-hero">Favoritos</div>
      </div>
      <div class="header-divider"></div>
      <div class="scroll-body">${body}</div>
      ${bottomNavHtml('favoritos')}
    </div>`;
}

/* ---------- Entry detail (view/edit a saved day, today or past) ---------- */
function renderEntryDetail(params) {
  const date = params.get('date');
  const entry = Storage.getEntryByDate(date);
  if (!entry) {
    location.hash = '#/diario';
    return;
  }
  const song = { title: entry.title, artist: entry.artist };

  document.getElementById('app').innerHTML = `
    <div class="screen">
      <div class="topbar spread">
        <a href="#/diario" class="back-btn">${ICONS.arrowLeft}</a>
        <div class="topbar-title">${exactDateLabel(date)}</div>
        <button class="icon-btn" id="delete-btn">${ICONS.trash}</button>
      </div>
      <div class="scroll-body">
        <div class="song-card">
          <span class="genre-chip">${escapeHtml(genreLabel(entry.genre))}</span>
          ${entry.era ? `<span class="era-chip">${escapeHtml(eraChipLabel(entry.era))}</span>` : ''}
          <div class="song-title">${escapeHtml(song.title)}</div>
          <div class="song-artist">${escapeHtml(song.artist)}</div>
        </div>
        <div class="listen-buttons">
          <a class="btn-primary" href="${youtubeSearchUrl(song)}" target="_blank" rel="noopener">${ICONS.external} Ouvir de novo no YouTube</a>
          <a class="btn-secondary" href="${spotifySearchUrl(song)}" target="_blank" rel="noopener">${ICONS.external} Ouvir de novo no Spotify</a>
        </div>

        <div class="section-divider" style="margin:18px 0;"></div>

        <p class="section-label" style="margin-top:0;">Avaliação</p>
        ${starButtonsHtml('rate-stars', entry.rating)}

        <div class="favorite-toggle">
          <span class="favorite-toggle-label">${ICONS.heart} Favorita</span>
          <div class="switch" id="fav-switch"></div>
        </div>

        <div class="field">
          <span class="field-label">Comentário (opcional)</span>
          <div class="textarea-box">
            <textarea id="comment-input" placeholder="O que gostaram nesta música?">${escapeHtml(entry.comment || '')}</textarea>
          </div>
        </div>
      </div>
      <div class="bottom-bar">
        <button class="btn-primary" id="save-btn">Guardar alterações</button>
      </div>
    </div>`;

  const edited = { rating: entry.rating, comment: entry.comment || '', favorite: !!entry.favorite };
  wireStarRating('rate-stars', edited.rating, (v) => { edited.rating = v; });
  wireFavoriteSwitch('fav-switch', edited.favorite, (v) => { edited.favorite = v; });
  document.getElementById('comment-input').addEventListener('input', (e) => { edited.comment = e.target.value; });

  document.getElementById('save-btn').addEventListener('click', () => {
    if (!edited.rating) {
      toast('Escolhe pelo menos uma estrela.');
      return;
    }
    Storage.upsertEntry({ ...entry, rating: edited.rating, comment: edited.comment.trim(), favorite: edited.favorite });
    toast('Avaliação atualizada!');
    location.hash = '#/diario';
  });

  document.getElementById('delete-btn').addEventListener('click', () => {
    if (!confirm('Apagar este registo do diário? Esta ação não pode ser desfeita.')) return;
    Storage.deleteEntry(date);
    toast('Registo apagado.');
    location.hash = '#/diario';
  });
}
