## Projectstructuur

```
src/
├── assets/       # Afbeeldingen, iconen en andere statische bestanden
├── components/   # Herbruikbare React componenten
├── pages/        # Pagina-componenten (views)
├── services/     # API calls en communicatie met de backend
│   └── Api.js
├── App.jsx       # Root component
├── main.jsx      # Entry point van de app
└── index.css     # Globale styles (Tailwind)
```

### 🔹 Uitleg

* **components/**
  Bevat herbruikbare UI-componenten zoals buttons, cards, modals, enz.

* **pages/**
  Bevat de verschillende pagina’s van de applicatie (bijv. Home, Login, Dashboard).

* **services/**
  Hier staan functies die communiceren met de backend API.
  `Api.js` zal in de toekomst gebruikt worden voor fetch/axios requests.

* **assets/**
  Voor afbeeldingen en statische bestanden.

* **App.jsx**
  Hoofdcomponent waarin routing en globale layout komt.

* **main.jsx**
  Startpunt van de React applicatie.

* **index.css**
  Bevat de Tailwind import en globale styling.
