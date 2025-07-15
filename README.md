# Playwright Test Suite for Web Application

> **Purpose:** This README is designed to help you understand how to use Playwright to generate modular, maintainable test cases. The project demonstrates these practices by utilizing a demo website (e.g., https://www.saucedemo.com).
>
> For more information, see the [Playwright Documentation](https://playwright.dev/).

## Quick Start

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - For local/dev: Create a `.env` file in the project root:
     ```env
     BASE_URL=https://www.saucedemo.com
     LOGIN_USERNAME=standard_user
     LOGIN_PASSWORD=secret_sauce
     ```
   - For CI: Add these as GitHub Actions secrets (see CI section below).
4. **Run all tests:**
   ```sh
   npx playwright test
   ```

## Demo Website

This project uses [SauceDemo](https://www.saucedemo.com) as the demo application for all test case demonstrations. You can use any similar public demo site for your own practice.

<!--
## Screenshots or GIFs

Consider adding screenshots or GIFs of tests running here for visual learners.
-->

## Project Structure

```
.
├── tests/
│   ├── login/
│   │   ├── login.positive.spec.ts      # Positive (successful login) scenarios
│   │   ├── login.negative.spec.ts      # Negative (invalid login) scenarios
│   │   ├── login.security.spec.ts      # Security-related scenarios
│   │   ├── login.performance.spec.ts   # Performance scenarios
│   │   ├── login.uiux.spec.ts          # UI/UX and accessibility scenarios
│   ├── checkout/
│   │   ├── checkout.positive.spec.ts   # Positive checkout scenarios
│   │   ├── checkout.negative.spec.ts   # Negative checkout scenarios
│   │   ├── checkout.security.spec.ts   # Security checkout scenarios
│   │   ├── checkout.performance.spec.ts# Performance checkout scenarios
│   │   ├── checkout.uiux.spec.ts       # UI/UX and accessibility checkout
│   │   ├── checkout.data.spec.ts       # Data-driven checkout scenarios
│   ├── page-objects/
│   │   ├── login.page.ts               # Page Object Model for login
│   │   ├── checkout.page.ts            # Page Object Model for checkout
│   ├── helpers/
│   │   ├── testDataFactory.ts          # Shared test data factory
│   │   ├── axeHelper.ts                # Accessibility helper (axe-core)
│   │   ├── networkHelper.ts            # Network assertion helper
│   │   ├── dataFactory.ts              # Random data factory
│   ├── baseTest.ts                     # Custom base test with global hooks
├── playwright.config.ts                # Playwright configuration
├── package.json                        # Project dependencies
├── .env                                # Environment variables (not committed)
```

## Setup

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Set up environment variables:**
   - For local/dev: Create a `.env` file as shown above.
   - For CI: Add `BASE_URL`, `LOGIN_USERNAME`, and `LOGIN_PASSWORD` as GitHub Actions secrets.

3. **Environment variables are loaded automatically in tests and helpers.**

## Best Practices

- **Modular Test Files:** Organize tests by scenario type for clarity and maintainability.
- **Page Object Model:** Encapsulate all UI interactions in POMs using resilient selectors (`getByRole`, `getByLabel`, `getByTestId`).
- **Test Data Management:** Use shared helpers and factories; avoid hardcoded sensitive data.
- **Assertions:** Assert both UI and network responses where relevant. Use helpers like `expectApiResponse` for network checks.
- **Accessibility:** Use the `axeHelper.ts` for automated accessibility checks in UI/UX tests.
- **Test Hygiene:** Clean up test data after each test (clear cookies, local storage, etc.).
- **Tags:** Use tags (e.g., [@smoke], [@regression], [@security], [@ui], [@performance], [@data]) in test titles for filtering and reporting.
- **Global Hooks:** Use `baseTest.ts` for global hooks (e.g., screenshots on failure).
- **Screenshots:** Screenshots are automatically taken on test failure and saved in the `screenshots` directory.
- **TypeScript Strict Mode:** Enabled for better type safety.

## Running Tests

- **Run all tests:**
  ```sh
  npx playwright test
  ```
- **Run a specific file:**
  ```sh
  npx playwright test tests/login/login.positive.spec.ts
  ```
- **Filter by tag:**
  ```sh
  npx playwright test --grep @security
  ```

## Adding New Features

1. Create a new POM in `tests/page-objects/` if needed.
2. Add modular test files for each scenario type in the relevant subdirectory.
3. Use shared helpers and factories for data management.
4. Use `baseTest.ts` for global hooks and customizations.
5. Follow the best practices outlined above.

---

**This project follows industry best practices for Playwright test automation: modular, maintainable, and scalable.**

## Continuous Integration (CI) Example

If you use GitHub Actions, your workflow should look like this:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    environment: qa
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: lts/*
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright Browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test
        env:
          BASE_URL: ${{ secrets.BASE_URL }}
          LOGIN_USERNAME: ${{ secrets.LOGIN_USERNAME }}
          LOGIN_PASSWORD: ${{ secrets.LOGIN_PASSWORD }}
      - uses: actions/upload-artifact@v3
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report
```

- **Note:** Set your secrets in GitHub under Settings → Environments → `qa`.

---

## Troubleshooting

- **Playwright install SSL errors:**
  See the earlier advice about `NODE_EXTRA_CA_CERTS` and proxy settings.
- **Environment variables not loading:**
  Ensure `.env` exists for local/dev and that secrets are set for CI. `dotenv.config()` is called automatically.
- **Selectors not found:**
  Double-check your POM selectors match the actual app markup.

---

## Contribution Guidelines

1. **Follow the modular structure and best practices outlined above.**
2. **Write clear, descriptive test names and comments.**
3. **Add or update Page Object Models as needed, but do not duplicate code.**
4. **Use tags for new tests to aid filtering and reporting.**
5. **Update the README if you add new features or change the structure.**

---

## Contact

For questions, support, or to contribute, please reach out via:
- Slack: [your-slack-channel]
- Discord: [your-discord-link]
- Email: [your-email@example.com]

(Replace with your actual contact details.)

## Prompt for Adding a New Feature

When adding a new feature to this Playwright test suite, use the following prompt to ensure consistency and best practices:

---

**Generate Playwright test cases for the '<feature>' feature, covering positive, negative, security, performance, UI/UX (including accessibility), and data-driven scenarios.**

- Organize tests by scenario type in separate files within `tests/<feature>/` (e.g., `<feature>.positive.spec.ts`, `<feature>.negative.spec.ts`, etc.).
- Use the Page Object Model for all UI interactions, placing POMs in `tests/page-objects/`.
- Prefer resilient selectors (`getByRole`, `getByLabel`, `getByTestId`) for stability and accessibility.
- Use shared helpers and test data factories for setup and data management; avoid hardcoded data.
- Assert both UI and network responses where relevant.
- Ensure comprehensive coverage of edge cases and error handling.
- Include accessibility checks in UI/UX tests.
- Clean up any test data after tests run (clear cookies, local storage, etc.).
- Use clear, descriptive test names and comments.
- Tag tests (e.g., [@smoke], [@regression], [@security], [@ui], [@performance], [@data]) for filtering and reporting.
- Update the README and POMs as needed.

---

**This prompt ensures new features are tested in a modular, maintainable, and scalable way, following the standards of this project.** 