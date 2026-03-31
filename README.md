![CI](https://github.com/VladNachev/playwright-testing-lab/actions/workflows/ci.yml/badge.svg)

# Playwright Automation Framework Project

UI automation framework built with Playwright, TypeScript, and ESLint for [Automation Exercise](https://automationexercise.com/).

## Project Goals

This framework includes:

- Playwright Test runner usage
- TypeScript-based automation design
- Page Object Model structure
- reusable workflows and utilities
- parallel-safe test design
- reporting and test evidence collection
- retry strategy and stability handling
- environment-based configuration
- test data generation
- credential encryption support
- GitHub Actions CI integration

## Tech Stack

- Playwright
- TypeScript
- ESLint
- Faker
- Node.js
- GitHub Actions

## Current Coverage

The suite currently automates all **27 official Automation Exercise test cases**.

Feature coverage includes:

- user registration
- login and logout
- invalid login handling
- duplicate email validation
- contact form flow
- products page and product details
- search
- cart management
- quantity validation
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

Selectors and UI interactions are isolated into page classes under [`src/pages`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/src/pages).  
This keeps tests readable and reduces maintenance when the UI changes.

### Workflow Layer

Reusable business actions are placed in [`src/workflows`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/src/workflows).  
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

- cookie/consent overlays
- unstable UI overlays for add-to-cart flows
- contact form confirmation behavior
- ad/vignette navigation interruptions

## Project Structure

```text
.github/workflows/       GitHub Actions CI pipeline
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

- [`tests/auth`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/tests/auth)
- [`tests/navigation`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/tests/navigation)
- [`tests/products`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/tests/products)
- [`tests/cart`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/tests/cart)
- [`tests/checkout`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/tests/checkout)

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

These checks are also part of CI.

## Environment Configuration

Environment values are managed through:

- [`.env.example`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/.env.example)
- [`.env.local`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/.env.local)
- [`src/config/env.ts`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/src/config/env.ts)

Examples of configurable values:

- `BASE_URL`
- `HEADLESS`
- `DEFAULT_PASSWORD`
- `ENCRYPTION_KEY`

## Credential Encryption

The framework includes simple credential encryption helpers for local usage:

- [`src/utils/crypto.util.ts`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/src/utils/crypto.util.ts)
- [`scripts/encrypt-secret.ts`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/scripts/encrypt-secret.ts)
- [`scripts/decrypt-secret.ts`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/scripts/decrypt-secret.ts)

Examples:

```bash
npm run secret:encrypt -- MyPassword123!
npm run secret:decrypt -- <encrypted-value>
```

## Reporting Output

Generated outputs include:

- [`playwright-report`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/playwright-report)
- [`test-results`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/test-results)

These artifacts are useful for debugging, demonstrations, and CI review.

## CI Pipeline

The GitHub Actions pipeline is defined in [`.github/workflows/ci.yml`](C:/Users/nache/Documents/VSCode_projects/pw_automation_framework/.github/workflows/ci.yml).

It runs on:

- pushes to `master`
- pull requests targeting `master`

The workflow performs:

- dependency installation
- Playwright browser installation
- ESLint validation
- TypeScript type checking
- Playwright test execution
- artifact upload for reports and test results