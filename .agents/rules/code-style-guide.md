---
trigger: always_on
---

22. Coding Standards
22.1 General
•	TypeScript strict mode in all packages; no any without a comment; shared types come from zod schemas.
•	ESLint (typescript-eslint, react-hooks, jsx-a11y, import order) and Prettier; formatting is never debated in reviews.
•	Functions small and single-purpose; early returns; no deep nesting; meaningful names; comments explain why, not what.
•	No magic numbers or strings: use constants or enums.
•	Do not leave console.log, commented-out code or TODOs without an issue id.
•	Dates stored in UTC; displayed in Hong Kong time (Asia/Hong_Kong).
•	Money handled only as integer cents using shared helpers.
22.2 Frontend rules
•	Pages are thin: they compose feature components and call hooks; logic lives in features.
•	Server data via RTK Query only; client state via slices; forms via RHF + zod.
•	Styling with Tailwind utilities and tokens; no inline styles; no hard-coded colours; use cn() for conditional classes.
•	Every list handles loading (skeleton), empty and error; every image uses LazyImage with width and height.
•	Accessibility: semantic elements, labels, aria where needed, keyboard support.
•	All text through i18n keys; no string concatenation for sentences.
•	Avoid premature memoisation; measure first; use React.memo for heavy list items.
•	Imports through path aliases (@/features/...); no deep relative paths across features.
22.3 Backend rules
•	Layering: route, controller, service, repository. Controllers parse and respond; services hold business rules; repositories talk to Prisma.
•	Validate every input with zod; never trust client totals; compute prices on the server.
•	Use transactions for multi-table changes (orders, stock, refunds).
•	Throw ApiError with a code; one central error handler formats responses.
•	Async handler wrapper on all routes; no unhandled promise rejections.
•	Log with pino including requestId; no sensitive data in logs.
•	Background work (emails, SMS, image processing, imports) goes to BullMQ jobs, not request handlers.
•	Each module has tests for services and key routes.
22.4 Database rules
•	Schema changes only via migrations; review SQL for locks on big tables.
•	Add indexes with the feature that needs them.
•	Seed script creates roles, permissions, HK districts, delivery slot templates and about 200 demo products.
•	Backwards compatible changes: add column, deploy code, backfill, then drop old column in a later release.
