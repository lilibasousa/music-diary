/* Base de sugestões por estilo + época. Guardamos apenas título + artista
   (sem IDs de vídeo fixos) e usamos a pesquisa do YouTube/Spotify para
   tocar — assim a sugestão nunca fica presa a um link que deixou de existir.

   Cada música tem uma `era`. Músicas verdadeiramente atemporais (ex.:
   canções de embalar tradicionais, clássicos instrumentais com séculos)
   usam a era especial 'all', que corresponde a qualquer época escolhida. */

const GENRES = [
  { id: 'infantil', label: 'Infantil', desc: 'Canções animadas e fáceis de cantar' },
  { id: 'bandas-sonoras', label: 'Bandas sonoras', desc: 'Músicas de filmes e animações' },
  { id: 'pop', label: 'Pop', desc: 'Sucessos conhecidos e cantados por todos' },
  { id: 'rock', label: 'Rock', desc: 'Guitarras e energia' },
  { id: 'classica', label: 'Clássica', desc: 'Instrumental, calma para adormecer' },
  { id: 'jazz', label: 'Jazz', desc: 'Suave e envolvente' },
  { id: 'eletronica', label: 'Eletrónica', desc: 'Sons modernos e ritmados' },
  { id: 'latina', label: 'Latina', desc: 'Ritmo e boa disposição' },
];

const ERAS = [
  { id: '60s', label: 'Anos 60', desc: 'Motown e os Beatles' },
  { id: '70s', label: 'Anos 70', desc: 'Disco e rock clássico' },
  { id: '80s', label: 'Anos 80', desc: 'Sintetizadores e cassetes' },
  { id: '90s', label: 'Anos 90', desc: 'Grunge, boybands e girl groups' },
  { id: 'y2k', label: 'Y2K (anos 2000)', desc: 'A viragem do século' },
  { id: '2010s', label: 'Anos 2010', desc: 'A era do streaming' },
  { id: 'atual', label: 'Atual', desc: 'Os sucessos de agora' },
];

const SONGS_BY_GENRE = {
  infantil: [
    { title: 'Baby Shark', artist: 'Pinkfong', era: '2010s' },
    { title: 'Wheels on the Bus', artist: 'Cocomelon', era: 'atual' },
    { title: 'Twinkle Twinkle Little Star', artist: 'Tradicional', era: 'all' },
    { title: 'Old MacDonald Had a Farm', artist: 'Tradicional', era: 'all' },
    { title: 'If You\'re Happy and You Know It', artist: 'Tradicional', era: 'all' },
    { title: 'A Barata diz que tem', artist: 'Tradicional', era: 'all' },
    { title: 'Cabeça, Ombros, Joelho e Pé', artist: 'Tradicional', era: 'all' },
    { title: 'Head, Shoulders, Knees and Toes', artist: 'Tradicional', era: 'all' },
  ],
  'bandas-sonoras': [
    { title: 'Chim Chim Cher-ee', artist: 'Mary Poppins', era: '60s' },
    { title: 'The Rainbow Connection', artist: 'Kermit the Frog (The Muppet Movie)', era: '70s' },
    { title: 'Under the Sea', artist: 'A Pequena Sereia', era: '80s' },
    { title: 'A Whole New World', artist: 'Aladdin', era: '90s' },
    { title: 'Hakuna Matata', artist: 'O Rei Leão', era: '90s' },
    { title: 'You\'ve Got a Friend in Me', artist: 'Randy Newman (Toy Story)', era: '90s' },
    { title: 'Married Life', artist: 'Michael Giacchino (Up - Altamente!)', era: 'y2k' },
    { title: 'Let It Go', artist: 'Idina Menzel (Frozen)', era: '2010s' },
    { title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake (Trolls)', era: '2010s' },
    { title: 'How Far I\'ll Go', artist: 'Auli\'i Cravalho (Vaiana)', era: '2010s' },
    { title: 'Try Everything', artist: 'Shakira (Zootopia)', era: '2010s' },
    { title: 'We Don\'t Talk About Bruno', artist: 'Encanto', era: 'atual' },
  ],
  pop: [
    { title: 'My Girl', artist: 'The Temptations', era: '60s' },
    { title: 'Dancing Queen', artist: 'ABBA', era: '70s' },
    { title: 'Billie Jean', artist: 'Michael Jackson', era: '80s' },
    { title: 'Wannabe', artist: 'Spice Girls', era: '90s' },
    { title: 'Hey Ya!', artist: 'OutKast', era: 'y2k' },
    { title: 'Happy', artist: 'Pharrell Williams', era: '2010s' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars', era: '2010s' },
    { title: 'Shape of You', artist: 'Ed Sheeran', era: '2010s' },
    { title: 'Flowers', artist: 'Miley Cyrus', era: 'atual' },
  ],
  rock: [
    { title: 'Hey Jude', artist: 'The Beatles', era: '60s' },
    { title: 'Bohemian Rhapsody', artist: 'Queen', era: '70s' },
    { title: 'We Will Rock You', artist: 'Queen', era: '70s' },
    { title: 'Livin\' on a Prayer', artist: 'Bon Jovi', era: '80s' },
    { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', era: '80s' },
    { title: 'Eye of the Tiger', artist: 'Survivor', era: '80s' },
    { title: 'Smells Like Teen Spirit', artist: 'Nirvana', era: '90s' },
    { title: 'Mr. Brightside', artist: 'The Killers', era: 'y2k' },
    { title: 'Radioactive', artist: 'Imagine Dragons', era: '2010s' },
    { title: 'Enemy', artist: 'Imagine Dragons, JID', era: 'atual' },
  ],
  classica: [
    { title: 'Eine kleine Nachtmusik', artist: 'Wolfgang Amadeus Mozart', era: 'all' },
    { title: 'Ave Maria', artist: 'Franz Schubert', era: 'all' },
    { title: 'Für Elise', artist: 'Ludwig van Beethoven', era: 'all' },
    { title: 'Canon in D', artist: 'Johann Pachelbel', era: 'all' },
    { title: 'The Four Seasons - Spring', artist: 'Antonio Vivaldi', era: 'all' },
    { title: 'Nocturne Op. 9 No. 2', artist: 'Frédéric Chopin', era: 'all' },
    { title: 'Clair de Lune', artist: 'Claude Debussy', era: 'all' },
    { title: 'Gymnopédie No. 1', artist: 'Erik Satie', era: 'all' },
  ],
  jazz: [
    { title: 'What a Wonderful World', artist: 'Louis Armstrong', era: '60s' },
    { title: 'Fly Me to the Moon', artist: 'Frank Sinatra', era: '60s' },
    { title: 'Feeling Good', artist: 'Nina Simone', era: '60s' },
    { title: 'Sway', artist: 'Michael Bublé', era: 'y2k' },
    { title: 'Take Five', artist: 'Dave Brubeck', era: 'all' },
    { title: 'La Vie en Rose', artist: 'Louis Armstrong', era: 'all' },
    { title: 'Autumn Leaves', artist: 'Miles Davis', era: 'all' },
    { title: 'Summertime', artist: 'Ella Fitzgerald', era: 'all' },
  ],
  eletronica: [
    { title: 'Popcorn', artist: 'Hot Butter', era: '70s' },
    { title: 'Blue Monday', artist: 'New Order', era: '80s' },
    { title: 'Better Off Alone', artist: 'Alice Deejay', era: '90s' },
    { title: 'Sandstorm', artist: 'Darude', era: 'y2k' },
    { title: 'Strobe', artist: 'Deadmau5', era: 'y2k' },
    { title: 'Levels', artist: 'Avicii', era: '2010s' },
    { title: 'Wake Me Up', artist: 'Avicii', era: '2010s' },
    { title: 'Titanium', artist: 'David Guetta ft. Sia', era: '2010s' },
    { title: 'Faded', artist: 'Alan Walker', era: '2010s' },
    { title: 'Miracle', artist: 'Calvin Harris & Ellie Goulding', era: 'atual' },
  ],
  latina: [
    { title: 'Guantanamera', artist: 'The Sandpipers', era: '60s' },
    { title: 'El Cantante', artist: 'Héctor Lavoe', era: '70s' },
    { title: 'La Bamba', artist: 'Los Lobos', era: '80s' },
    { title: 'Vivo Para Ella', artist: 'Marc Anthony', era: '90s' },
    { title: 'La Camisa Negra', artist: 'Juanes', era: 'y2k' },
    { title: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee', era: '2010s' },
    { title: 'Waka Waka', artist: 'Shakira', era: '2010s' },
    { title: 'Danza Kuduro', artist: 'Don Omar ft. Lucenzo', era: '2010s' },
    { title: 'Chantaje', artist: 'Shakira ft. Maluma', era: '2010s' },
    { title: 'TQG', artist: 'Karol G, Shakira', era: 'atual' },
  ],
};

function genreLabel(id) {
  const g = GENRES.find((x) => x.id === id);
  return g ? g.label : id;
}
function eraLabel(id) {
  const e = ERAS.find((x) => x.id === id);
  return e ? e.label : id;
}
/* Rótulo a mostrar junto de uma música concreta: 'all' (atemporal) tem um
   rótulo próprio em vez do id interno. */
function eraChipLabel(id) {
  return id === 'all' ? 'Atemporal' : eraLabel(id);
}

/* Há alguma música deste estilo marcada para esta época (ou atemporal)? */
function eraHasSongs(genreId, eraId) {
  const list = SONGS_BY_GENRE[genreId] || [];
  return list.some((s) => s.era === eraId || s.era === 'all');
}

/* Escolhe uma música do estilo + época, evitando repetir as últimas usadas
   enquanto houver alternativas por ouvir. Se não houver nenhuma música
   dessa época neste estilo, ignora a época e escolhe de todo o estilo. */
function pickSong(genreId, eraId, recentlyUsedTitles, excludeTitle) {
  const list = SONGS_BY_GENRE[genreId] || [];
  if (!list.length) return null;
  let pool = list.filter((s) => s.era === eraId || s.era === 'all');
  if (!pool.length) pool = list;

  let filtered = pool.filter((s) => s.title !== excludeTitle);
  if (!filtered.length) filtered = pool;
  let fresh = filtered.filter((s) => !recentlyUsedTitles.includes(s.title));
  if (!fresh.length) fresh = filtered;
  return fresh[Math.floor(Math.random() * fresh.length)];
}

function youtubeSearchQuery(song) {
  return `${song.title} ${song.artist} official`;
}
function youtubeSearchUrl(song) {
  const q = encodeURIComponent(youtubeSearchQuery(song));
  return `https://www.youtube.com/results?search_query=${q}`;
}
function spotifySearchUrl(song) {
  const q = encodeURIComponent(`${song.title} ${song.artist}`);
  return `https://open.spotify.com/search/${q}`;
}
