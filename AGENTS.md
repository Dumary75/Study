# AGENTS.md

Regeln für Coding-Agenten in diesem Repo. Kurz halten: Jede Zeile hier kostet in jeder Session Kontext.

## Projekt

Fullstack-Testprojekt: React-Frontend, ASP.NET-Minimal-API-Backend, MySQL. Lern-/Testprojekt, kein Produktivsystem. UI-Sprache ist Deutsch.

## Struktur & Start

- `backendTest/` – ASP.NET Minimal API, `net10.0`, Port **5298** (`dotnet run`). OpenAPI/Scalar nur in Development.
- `frontend_test/` – React 19 + Vite 8 + TypeScript 6, Port **5173** (`npm run dev`). Checks: `npm run build` (`tsc -b && vite build`), `npm run lint`.
- DB: MySQL lokal, Datenbank `testProject`, Connection String in `backendTest/appsettings.json`.
- Migrationen (in `backendTest/` ausführen): `dotnet ef migrations add <Name>`, `dotnet ef database update`.
- CORS erlaubt nur `http://localhost:5173` mit Credentials. Frontend nutzt absolute URLs + `credentials: "include"`, kein Vite-Proxy.

## Auth

- JWT im HttpOnly-Cookie `test_token` (`Secure=false`, `SameSite=Strict`, 1 h). Token **ausschließlich** über `TokenInCookieSchreiben(...)` in `Api_Routes/routes.cs` ausstellen.
- Claims: `ClaimTypes.NameIdentifier` = User-Id, `profile_id` = aktives Profil. Nur über `HttpContext.User.GetUserId()` / `GetProfileId()` (`Api_Routes/claimsHelper.cs`) lesen, nie selbst aus Claims parsen.
- Profilwahl stellt ein neues Token aus (JWT ist unveränderlich). `POST /profiles/select/{id}` prüft Besitz einmalig; danach kommt die Profil-Id aus dem Claim, MyList-Routen machen keine zusätzliche Ownership-Query.
- Bewusste Entscheidungen, nicht „fixen": `GET /usersGet` ohne Authorization und mit Passwort-Hashes in der Antwort; kein Unique-Index auf `(UserId, Name)`; kein Profil-Limit; Cascade-Delete überall.

## Datenmodell

`User 1—n Profiles 1—n MyListItems`, beide FKs mit `DeleteBehavior.Cascade`. `Profile.Name` (früher `Bio`), `MyListItem` hat kein `AddedAt`.

## Routen

`/usersGet`, `/usersCreate`, `/usersDelete/{id}`, `/usersLogin`, `/usersLogout`, `/authcheck`, `/myProfiles`, `/profilCreate`, `POST /profiles/select/{id}`, `DELETE /profiles/{id}`, `GET|POST /myList`, `DELETE /myList/{id}`.

Alte Namen (`usersGet`, `profilCreate`) sind Absicht und bleiben; neue Routen im REST-Stil. `/authcheck` liefert `{ isAuthenticated, activeProfile }`.

## Konventionen

- CSS-Klassen und Bezeichner snake_case (`.aktives_profil`, `.profil_kachel`), UI-Texte Deutsch.
- Komponenten: `src/page_Sections/` für Bereiche, `src/buttons/` für Buttons (Unterordner je Thema).
- JSON wird camelCase serialisiert; Model-Binding ist case-insensitiv.
- Boilerplate (Token-Ausstellung, Claims, Cookie-Optionen) gehört in die Helper, nicht in jede Route kopiert.

## No-Gos

- `bin/`, `obj/`, `dist/`, `node_modules/` nicht editieren. Build-Artefakte sind historisch in Git getrackt – nicht ungefragt entfernen oder ignorieren.
- Kein `dotnet ef database drop` ohne ausdrückliche Freigabe (Datenverlust).
- Generierte Migrationen lesen, nicht nur „Build succeeded" vertrauen – EF erkennt z. B. Umbenennungen und führt sie als `RENAME COLUMN` aus.
- Keine neuen Dependencies ohne Rückfrage.

## Verifikation

Backend: `dotnet build` (oder implizit über `dotnet ef`). Frontend: `npm run build`. Es gibt keinen Browser/Chrome in der Umgebung – UI-Änderungen sind nur typgeprüft, die visuelle Prüfung macht der Nutzer.
