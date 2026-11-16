# Giulia Belloni — Portfolio 2026

Landing page responsive realizzata con React 19, TypeScript, Vite, Framer Motion, Vercel Analytics e Speed Insights.

## Avvio locale

```bash
npm install
npm run dev
```

Apri l'indirizzo mostrato da Vite (di solito http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Deploy Vercel

1. Carica il progetto in un repository GitHub (escludendo `node_modules` e `dist`).
2. Su Vercel seleziona **Add New → Project**, importa il repository.
3. Framework **Vite**, build `npm run build`, output `dist` (già indicati in `vercel.json`).
4. Pubblica con **Deploy**.
5. Abilita **Analytics** e **Speed Insights** nella dashboard del progetto Vercel. I componenti sono già integrati in `src/main.tsx`.

## Navigazione

- Desktop: rotella del mouse, trackpad, frecce da tastiera, controlli in basso, menu.
- Mobile/tablet: scorrimento verticale touch.
- Clic sulle immagini per ingrandirle; Esc per chiudere.
- Il menu e i collegamenti sono ancore interne alla stessa pagina.

## Personalizzazione

- Testi e ordine dei sei progetti: `src/projects.json`.
- Immagini estratte dal PDF: `public/images/`.
- Stili, colori e breakpoint: `src/style.css`.
- Email e numero di telefono: `src/App.tsx` (verificare i recapiti prima della pubblicazione).
- Titolo, descrizione SEO e Open Graph: `index.html`.

**Nota:** le immagini provengono dal PDF fornito; verificare che i diritti d'uso e la pubblicazione online siano autorizzati. Il numero di telefono è quello presente nel PDF e va verificato prima di rendere pubblico il sito. Non è stato configurato alcun cookie banner: valutare gli obblighi privacy in base ai servizi effettivamente attivati.
