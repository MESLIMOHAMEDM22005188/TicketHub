# TicketHub

A modern, responsive support ticket dashboard built with vanilla HTML, CSS and JavaScript.

TicketHub is a **front-end-only prototype** for exploring a support workflow. It uses sample data and keeps interactions in browser memory. It does not connect to a database or a backend API.

## Features

- Responsive dashboard with ticket metrics and team workload
- Ticket list with search and status/priority filtering
- Ticket detail modal with status changes
- Create-ticket form with basic validation
- Assign tickets to the current demo user
- Activity timeline and personal ticket queue
- Mobile-friendly navigation
- Accessible labels, dialog controls and empty states
- No build step or third-party JavaScript dependencies

## Run locally

Open `index.html` in a browser, or serve the folder with a local HTTP server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy with GitHub Pages

1. Open the repository settings on GitHub.
2. Go to **Pages**.
3. Select **Deploy from a branch**.
4. Select the `main` branch and `/(root)`, then save.
5. Wait for the Pages deployment to finish.

## Project structure

```text
TicketHub/
├── index.html   # Page structure and dialogs
├── styles.css   # Design system, layout and responsive styles
├── app.js       # Demo tickets, rendering and front-end interactions
└── README.md
```

## Scope and limitations

This repository intentionally implements only the front end. Ticket changes, new tickets and activity events exist only in the current page session and reset on refresh. Authentication, authorization, persistence, file uploads, email delivery and real notifications require a backend and are not implemented here.

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- Google Fonts: DM Sans and Manrope

## License

No license has been added yet. Add a license file before redistributing this project.