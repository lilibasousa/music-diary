# Diário Musical (music-diary)

App web para o ritual de mostrar uma música nova ao teu filho todos os dias antes de dormir: escolhem o estilo, ouvem a música juntos e depois avaliam-na, com comentário opcional e favoritos. HTML, CSS e JavaScript puro — sem instalação, sem conta, sem passo de build.

## Como experimentar

- **No computador**: faz duplo-clique em `index.html` (ou abre-o a partir do browser). Funciona offline.
- **No telemóvel / publicado**: a forma mais simples é o **GitHub Pages**, gratuito, direto deste repositório:
  1. No GitHub, vai a Settings → Pages do repositório.
  2. Em "Source", escolhe a branch `main` e a pasta `/ (root)`.
  3. Guarda. Ao fim de um ou dois minutos, o GitHub dá-te um link (algo como `https://lilibasousa.github.io/music-diary/`) — abre esse link no telemóvel e podes "Adicionar ao ecrã principal" para parecer uma app.

## Como funciona

1. **Escolher o estilo** — Infantil, Bandas sonoras, Pop, Rock, Clássica, Jazz, Eletrónica ou Latina.
2. **Escolher a época** — Anos 60, 70, 80, 90, Y2K (2000s), Anos 2010 ou Atual. Se não houver nenhuma música dessa época no estilo escolhido, a app avisa e sugere outra época do mesmo estilo.
3. **Sugestão de música** — a app escolhe uma música desse estilo e época (evitando repetir as últimas usadas) e mostra dois botões para a tocar: **YouTube** ou **Spotify**, que abrem a busca dessa música na app/site respetivo. Há também um botão para pedir outra sugestão.
4. **Avaliar** — depois de ouvirem, dão de 1 a 5 estrelas, podem escrever um comentário e marcar a música como favorita.
5. **Diário** — cada dia fica registado (uma música por dia; escolher outra substitui a do dia). O histórico completo fica em "Diário", e as músicas marcadas com coração ficam em "Favoritos".

## Porque não toca a música dentro da app

Tocar uma música específica dentro da página, sem pedir nada ao utilizador, exigiria uma chave de API paga/registada (Spotify Web API) ou depender de truques não-oficiais do leitor incorporado do YouTube, que falham com frequência e sem aviso. Em vez disso, os botões abrem a pesquisa dessa música diretamente na app do YouTube ou do Spotify do telemóvel — a música toca lá (com controlos completos, qualidade e sem anúncios de reprodução extra), e ao voltar ao Diário Musical a avaliação está sempre pronta a preencher.

## Decisões tomadas

1. **Dados guardados só no telemóvel/browser** (`localStorage`), sem servidor nem login. Se limpares os dados do browser, perdes o histórico — não há sincronização entre dispositivos.
2. **Uma entrada por dia**: escolher uma nova música substitui a avaliação desse dia; dias diferentes ficam sempre no histórico.
3. **Sem repetições até esgotar as opções**: cada estilo+época só volta a sugerir uma música já usada depois de todas as outras dessa combinação já terem sido ouvidas. O botão "sugerir outra" só aparece quando há de facto uma alternativa diferente para mostrar.
4. **Época por música, não por app**: algumas músicas (ex.: canções de embalar tradicionais, clássicos instrumentais) são atemporais e aparecem em qualquer época escolhida.
5. **Sem dependências, sem `npm install`, sem build.** Os únicos pedidos à internet são as fontes (Google Fonts) e, ao tocar, o YouTube/Spotify — se não houver internet, a app continua a funcionar com uma fonte alternativa do sistema (a escolha/avaliação de músicas não precisa de rede).

## Estrutura

```
music-diary/
  index.html
  css/
    style.css
  js/
    storage.js   — leitura/escrita das entradas do diário (localStorage)
    songs.js     — lista de músicas por estilo e época + construção dos links de YouTube/Spotify
    app.js       — ecrãs, navegação e lógica da app
```

## Testado

Fluxo completo verificado num browser automatizado: escolher estilo, escolher época (incluindo o caso sem correspondência exata, com aviso e sugestão de outra época), sugestão de música, avaliar e guardar, listar no Diário, listar em Favoritos, editar avaliação de um dia já guardado e apagar um registo — sem erros de JavaScript.
