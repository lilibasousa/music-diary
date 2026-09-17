/* Base de sugestões por estilo. Guardamos apenas título + artista (sem IDs
   de vídeo fixos) e usamos a pesquisa incorporada do YouTube para tocar —
   assim a sugestão nunca fica presa a um link que deixou de existir. */

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

const SONGS_BY_GENRE = {
  infantil: [
    { title: 'Baby Shark', artist: 'Pinkfong' },
    { title: 'Wheels on the Bus', artist: 'Cocomelon' },
    { title: 'Twinkle Twinkle Little Star', artist: 'Tradicional' },
    { title: 'Old MacDonald Had a Farm', artist: 'Tradicional' },
    { title: 'If You\'re Happy and You Know It', artist: 'Tradicional' },
    { title: 'A Barata diz que tem', artist: 'Tradicional' },
    { title: 'Cabeça, Ombros, Joelho e Pé', artist: 'Tradicional' },
    { title: 'Head, Shoulders, Knees and Toes', artist: 'Tradicional' },
  ],
  'bandas-sonoras': [
    { title: 'Let It Go', artist: 'Idina Menzel (Frozen)' },
    { title: 'Can\'t Stop the Feeling!', artist: 'Justin Timberlake (Trolls)' },
    { title: 'Hakuna Matata', artist: 'O Rei Leão' },
    { title: 'A Whole New World', artist: 'Aladdin' },
    { title: 'You\'ve Got a Friend in Me', artist: 'Randy Newman (Toy Story)' },
    { title: 'How Far I\'ll Go', artist: 'Auli\'i Cravalho (Vaiana)' },
    { title: 'Under the Sea', artist: 'A Pequena Sereia' },
    { title: 'Try Everything', artist: 'Shakira (Zootopia)' },
  ],
  pop: [
    { title: 'Happy', artist: 'Pharrell Williams' },
    { title: 'Shape of You', artist: 'Ed Sheeran' },
    { title: 'Uptown Funk', artist: 'Mark Ronson ft. Bruno Mars' },
    { title: 'Roar', artist: 'Katy Perry' },
    { title: 'Can\'t Stop the Feeling', artist: 'Justin Timberlake' },
    { title: 'Sunflower', artist: 'Post Malone & Swae Lee' },
    { title: 'Counting Stars', artist: 'OneRepublic' },
    { title: 'Good Life', artist: 'OneRepublic' },
  ],
  rock: [
    { title: 'Bohemian Rhapsody', artist: 'Queen' },
    { title: 'We Will Rock You', artist: 'Queen' },
    { title: 'Don\'t Stop Believin\'', artist: 'Journey' },
    { title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses' },
    { title: 'Livin\' on a Prayer', artist: 'Bon Jovi' },
    { title: 'Eye of the Tiger', artist: 'Survivor' },
    { title: 'Here Comes the Sun', artist: 'The Beatles' },
    { title: 'Hey Jude', artist: 'The Beatles' },
  ],
  classica: [
    { title: 'Clair de Lune', artist: 'Claude Debussy' },
    { title: 'Für Elise', artist: 'Ludwig van Beethoven' },
    { title: 'Canon in D', artist: 'Johann Pachelbel' },
    { title: 'The Four Seasons - Spring', artist: 'Antonio Vivaldi' },
    { title: 'Nocturne Op. 9 No. 2', artist: 'Frédéric Chopin' },
    { title: 'Gymnopédie No. 1', artist: 'Erik Satie' },
    { title: 'Ave Maria', artist: 'Franz Schubert' },
    { title: 'Eine kleine Nachtmusik', artist: 'Wolfgang Amadeus Mozart' },
  ],
  jazz: [
    { title: 'What a Wonderful World', artist: 'Louis Armstrong' },
    { title: 'Fly Me to the Moon', artist: 'Frank Sinatra' },
    { title: 'Take Five', artist: 'Dave Brubeck' },
    { title: 'Feeling Good', artist: 'Nina Simone' },
    { title: 'La Vie en Rose', artist: 'Louis Armstrong' },
    { title: 'Autumn Leaves', artist: 'Miles Davis' },
    { title: 'Summertime', artist: 'Ella Fitzgerald' },
    { title: 'Sway', artist: 'Michael Bublé' },
  ],
  eletronica: [
    { title: 'Clarity', artist: 'Zedd ft. Foxes' },
    { title: 'Wake Me Up', artist: 'Avicii' },
    { title: 'Levels', artist: 'Avicii' },
    { title: 'Titanium', artist: 'David Guetta ft. Sia' },
    { title: 'Faded', artist: 'Alan Walker' },
    { title: 'Symphony', artist: 'Clean Bandit ft. Zara Larsson' },
    { title: 'On My Mind', artist: 'Jorja Smith' },
    { title: 'Strobe', artist: 'Deadmau5' },
  ],
  latina: [
    { title: 'Despacito', artist: 'Luis Fonsi ft. Daddy Yankee' },
    { title: 'Bailando', artist: 'Enrique Iglesias' },
    { title: 'La Camisa Negra', artist: 'Juanes' },
    { title: 'Vivir Mi Vida', artist: 'Marc Anthony' },
    { title: 'Danza Kuduro', artist: 'Don Omar ft. Lucenzo' },
    { title: 'Waka Waka', artist: 'Shakira' },
    { title: 'Chantaje', artist: 'Shakira ft. Maluma' },
    { title: 'Vivo Para Ella', artist: 'Marc Anthony' },
  ],
};

function genreLabel(id) {
  const g = GENRES.find((x) => x.id === id);
  return g ? g.label : id;
}

/* Escolhe uma música do estilo, evitando repetir as últimas usadas nesse
   estilo enquanto houver alternativas por ouvir. */
function pickSong(genreId, recentlyUsedTitles, excludeTitle) {
  const list = SONGS_BY_GENRE[genreId] || [];
  if (!list.length) return null;
  let pool = list.filter((s) => s.title !== excludeTitle);
  if (!pool.length) pool = list.slice();
  let fresh = pool.filter((s) => !recentlyUsedTitles.includes(s.title));
  if (!fresh.length) fresh = pool;
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
