/* Persistência local (localStorage) — sem servidor nem login, tal como o
   FitTrack. Uma entrada por dia, indexada pela data (YYYY-MM-DD). */

const STORAGE_KEYS = {
  entries: 'diariomusical_entries',
};

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const Storage = {
  getEntries() {
    const raw = localStorage.getItem(STORAGE_KEYS.entries);
    const list = raw ? JSON.parse(raw) : [];
    list.sort((a, b) => (a.date < b.date ? 1 : -1));
    return list;
  },
  getEntryByDate(date) {
    return Storage.getEntries().find((e) => e.date === date) || null;
  },
  /* Guarda ou substitui a entrada do dia (uma música por dia). */
  upsertEntry(entry) {
    const list = Storage.getEntries().filter((e) => e.date !== entry.date);
    list.push({ id: entry.id || makeId(), ...entry });
    localStorage.setItem(STORAGE_KEYS.entries, JSON.stringify(list));
  },
  deleteEntry(date) {
    const list = Storage.getEntries().filter((e) => e.date !== date);
    localStorage.setItem(STORAGE_KEYS.entries, JSON.stringify(list));
  },
  getFavorites() {
    return Storage.getEntries().filter((e) => e.favorite);
  },
  /* Todos os títulos já usados neste estilo, para não repetir uma música
     enquanto houver outra por ouvir (ver pickSong em songs.js). */
  usedTitlesForGenre(genreId) {
    return Storage.getEntries()
      .filter((e) => e.genre === genreId)
      .map((e) => e.title);
  },
};

function todayLocalIso() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60000);
  return local.toISOString().slice(0, 10);
}
function exactDateLabel(iso) {
  const d = new Date(iso + 'T00:00:00');
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  return `${dd}/${mm}/${d.getFullYear()}`;
}
function weekdayLabel(iso) {
  const days = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  return days[new Date(iso + 'T00:00:00').getDay()];
}
