# Playwright Automation Framework Project

UI automation framework built with Playwright, TypeScript, and ESLint for [Automation Exercise](https://automationexercise.com/).

## Project Goals

This framework includes:

- Playwright Test runner usage.
- TypeScript-based automation design.
- Page Object Model structure.
- reusable workflows and utilities.
- parallel-safe test design.
- reporting and test evidence collection.
- retry strategy and stability handling.
- environment-based configuration.
- test data generation.
- credential encryption support.

## Tech Stack

- Playwright
- TypeScript
- ESLint
- Faker
- Node.js

### View the live report

The latest Playwright HTML report is published after every push to `master`:

**<https://vladnachev.github.io/playwright-testing-lab/>**

### Download artifacts

From any workflow run you can download:

- `playwright-report` — the full interactive HTML report
- `test-results` — raw JSON, JUnit XML, screenshots, videos, and traces

Go to **Actions → select a run → Artifacts** at the bottom of the run summary page.

## Current Coverage

The suite automates all **26 official Automation Exercise test cases** plus **5 additional edge-case and consistency tests**.

Feature coverage includes:

- user registration
- login and logout
- invalid login handling
- duplicate email validation
- session persistence across page reloads
- contact form flow
- products page and product details
- product listing vs detail page price consistency
- search with results
- search with no results (empty state)
- cart management
- quantity validation
- checkout modal guard (guest user)
- cart total calculation
- checkout and payment
- address verification
- invoice download
- categories and brands
- product reviews
- subscriptions
- scroll behavior
- recommended items

## Framework Highlights

### Page Object Model

Selectors and UI interactions are isolated into page classes under [`src/pages`](src/pages).  
This keeps tests readable and reduces maintenance when the UI changes.

### Workflow Layer

Reusable business actions are placed in [`src/workflows`](src/workflows).  
For example, user registration is treated as a reusable business flow instead of being rewritten in every test.

### Strong Typing

TypeScript interfaces and structured factories help keep test data safe and predictable.  
This improves refactoring, readability, and developer confidence.

### Parallel-Friendly Design

Tests are built to avoid order dependency:

- each test creates its own data when needed
- user emails are generated dynamically
- shared state is minimized

This makes the suite safer for parallel execution.

### Reporting and Evidence

The framework produces:

- HTML reports
- JSON reports
- JUnit XML reports
- screenshots on failure
- videos on failure
- Playwright traces on failure
- custom JSON attachments

### Stability Engineering

Real-world site behavior was handled in the framework itself, including:

- cookie/consent overlays with DOM-removal fallback
- consent banner retry logic on navigation (reload, delete account)
- unstable UI overlays for add-to-cart flows
- contact form confirmation behavior
- ad/vignette navigation interruptions

## Project Structure

```text
.github/workflows/       CI/CD pipeline definitions
scripts/                 Helper scripts
src/config/              Environment and config handling
src/data/                Test data factories
src/fixtures/            Shared Playwright fixtures
src/pages/               Page Object Model classes
src/types/               TypeScript interfaces
src/utils/               Logging, crypto, evidence helpers
src/workflows/           Reusable business flows
test-data/               Supporting input files
tests/                   Automated test specs grouped by feature
```

## Test Organization

The suite is grouped by functional area:

- [`tests/auth`](tests/auth)
- [`tests/navigation`](tests/navigation)
- [`tests/products`](tests/products)
- [`tests/cart`](tests/cart)
- [`tests/checkout`](tests/checkout)

This organization keeps the suite scalable and easier to debug than storing all scenarios in one large file.

## Setup

### Prerequisites

- Node.js 22+
- npm

### Install

```bash
npm install
npx playwright install chromium
```

## Run the Framework

### Run all tests

```bash
npm test
```

### Run in headed mode

```bash
npm run test:headed
```

### Open Playwright UI mode

```bash
npm run test:ui
```

### Open the HTML report

```bash
npm run test:report
```

## Code Quality

### Lint

```bash
npm run lint
```

### Typecheck

```bash
npm run typecheck
```

## Environment Configuration

Environment values are managed through:

- [`.env.example`](.env.example)
- [`.env.local`](.env.local) *(local only, not committed)*
- [`src/config/env.ts`](src/config/env.ts)

Configurable values:

| Variable | Default | Description |
|---|---|---|
| `BASE_URL` | `https://automationexercise.com` | Target site URL |
| `HEADLESS` | `true` | Run browser headlessly |
| `DEFAULT_PASSWORD` | `Password123!` | Password used for generated test users |
| `ENCRYPTION_KEY` | *(passphrase)* | Key for the credential encryption helpers |

## Credential Encryption

The framework includes simple credential encryption helpers for local usage:

- [`src/utils/crypto.util.ts`](src/utils/crypto.util.ts)
- [`scripts/encrypt-secret.ts`](scripts/encrypt-secret.ts)
- [`scripts/decrypt-secret.ts`](scripts/decrypt-secret.ts)

```bash
npm run secret:encrypt -- MyPassword123!
npm run secret:decrypt -- <encrypted-value>
```
