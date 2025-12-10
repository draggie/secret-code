# Secret Code - React SPA

Tajemnicza aplikacja zagadkowa z zamkiem kodowym.

## Rozwój lokalny

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy na Firebase Hosting

### 1. Pierwsza konfiguracja

Jeśli jeszcze nie masz konta Firebase:
1. Przejdź na [Firebase Console](https://console.firebase.google.com/)
2. Utwórz nowy projekt (lub użyj istniejącego)
3. Włącz Firebase Hosting w projekcie

### 2. Logowanie do Firebase CLI

```bash
npx firebase login
```

### 3. Inicjalizacja projektu Firebase

```bash
npx firebase init hosting
```

Podczas inicjalizacji:
- Wybierz istniejący projekt Firebase (lub utwórz nowy)
- **Public directory**: `dist` (domyślny folder build Vite)
- **Single-page app**: `Yes` (dla React SPA)
- **Set up automatic builds**: `No` (możesz później włączyć GitHub Actions)

### 4. Deploy

```bash
npm run deploy
```

Lub tylko hosting:
```bash
npm run deploy:hosting
```

### 5. Aktualizacja aplikacji

Po każdej zmianie w kodzie:
```bash
npm run deploy
```

Aplikacja będzie dostępna pod adresem: `https://[twoj-projekt].web.app`

## Skrypty

- `npm run dev` - Uruchomienie serwera deweloperskiego
- `npm run build` - Zbudowanie aplikacji produkcyjnej
- `npm run preview` - Podgląd zbudowanej aplikacji lokalnie
- `npm run deploy` - Zbudowanie i deploy na Firebase
- `npm run deploy:hosting` - Deploy tylko hosting (po buildzie)

## Konfiguracja

- **Kod zamka**: Edytuj `src/config.js` → `SECRET_CODE`
- **Lista osób**: Edytuj `src/config.js` → `FAMILY_MEMBERS`
