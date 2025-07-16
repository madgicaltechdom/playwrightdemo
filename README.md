# Playwright Test Suite for Web Application

## Prerequisites
- **Node.js** (v18 or later recommended): [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git**: [Download Git](https://git-scm.com/)

## Table of Contents
- [Purpose](#purpose)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Demo Website](#demo-website)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Best Practices](#best-practices)
- [Running Tests](#running-tests)
- [Adding New Features](#adding-new-features)
- [Continuous Integration (CI) Example](#continuous-integration-ci-example)
- [Troubleshooting](#troubleshooting)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact](#contact)
- [Prompt for Adding a New Feature](#prompt-for-adding-a-new-feature)
- [Prompt Example for Checkout Feature](#prompt-example-for-checkout-feature)
- [Debugging Example: Checkout Positive Test Case](#debugging-example-checkout-positive-test-case)
- [FAQ](#faq)
- [Example Prompt: Generate Playwright Test Cases for Cart Feature (from HTML)](#example-prompt-generate-playwright-test-cases-for-cart-feature-from-html)
- [Example Prompt: Generate All Types of Functional Playwright Test Cases for Cart Feature (from HTML)](#example-prompt-generate-all-types-of-functional-playwright-test-cases-for-cart-feature-from-html)

## Purpose
This repository is a comprehensive, real-world example of how to use Playwright for end-to-end testing in a modular, maintainable, and scalable way.
- It demonstrates best practices for test structure, Page Object Model, data-driven and accessibility testing, network assertions, and robust CI/CD integration using a demo website ([SauceDemo](https://www.saucedemo.com)).
- **AI Assistance:** This project leverages Playwright MCP (Microsoft CodePilot) for AI-assisted test generation, refactoring, and debugging. You can use tools like **Cursor**, **Windsurf**, or any editor that supports MCP to accelerate and standardize your test development.
- Developers can expect to learn how to:
  - Organize tests for clarity and scalability
  - Use and extend Page Object Models
  - Implement data-driven and accessibility tests
  - Assert on both UI and network responses
  - Integrate with GitHub Actions and manage environments securely
  - Debug and maintain a professional-grade test suite
- The project is designed for easy extension and team collaboration, making it ideal for both learning and real-world adoption.

For more information, see the [Playwright Documentation](https://playwright.dev/).

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
│   ├── cart/
│   │   ├── cart.positive.spec.ts        # Positive (functional) cart scenarios
│   │   ├── cart.negative.spec.ts        # Negative/edge cart scenarios
│   │   ├── cart.uiux.spec.ts            # UI/UX & accessibility cart scenarios
│   │   ├── cart.security.spec.ts        # Security cart scenarios
│   │   ├── cart.performance.spec.ts     # Performance cart scenarios
│   │   ├── cart.data.spec.ts            # Data-driven cart scenarios
│   │   ├── cart.functional.spec.ts      # Additional functional cart scenarios
│   ├── login/
│   │   ├── login.positive.spec.ts       # Positive login scenarios
│   │   ├── login.negative.spec.ts       # Negative login scenarios
│   │   ├── login.security.spec.ts       # Security login scenarios
│   │   ├── login.performance.spec.ts    # Performance login scenarios
│   │   ├── login.uiux.spec.ts           # UI/UX & accessibility login scenarios
│   ├── checkout/
│   │   ├── checkout.positive.spec.ts    # Positive checkout scenarios
│   │   ├── checkout.negative.spec.ts    # Negative checkout scenarios
│   │   ├── checkout.security.spec.ts    # Security checkout scenarios
│   │   ├── checkout.performance.spec.ts # Performance checkout scenarios
│   │   ├── checkout.uiux.spec.ts        # UI/UX & accessibility checkout scenarios
│   │   ├── checkout.data.spec.ts        # Data-driven checkout scenarios
│   ├── page-objects/
│   │   ├── cart.page.ts                 # Page Object Model for cart
│   │   ├── login.page.ts                # Page Object Model for login
│   │   ├── checkout.page.ts             # Page Object Model for checkout
│   ├── helpers/
│   │   ├── testDataFactory.ts           # Shared test data factory
│   │   ├── axeHelper.ts                 # Accessibility helper (axe-core)
│   │   ├── networkHelper.ts             # Network assertion helper
│   │   ├── dataFactory.ts               # Random data factory
│   ├── baseTest.ts                      # Custom base test with global hooks
├── playwright.config.ts                 # Playwright configuration
├── package.json                         # Project dependencies
├── .env                                 # Environment variables (not committed)
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

- **Comprehensive Functional Coverage:** The cart feature includes positive, negative, UI/UX, security, performance, data-driven, and additional functional test cases for robust validation.
- **Modular Test Files:** Organize tests by scenario type for clarity and maintainability.
- **Page Object Model:** Encapsulate all UI interactions in POMs using resilient selectors (`getByRole`, `getByLabel`, `getByTestId`).
- **Test Data Management:** Use shared helpers and factories; avoid hardcoded sensitive data.
- **Assertions:** Assert both UI and network responses where relevant. Use helpers like `expectApiResponse` for network checks.
- **Accessibility:** Use the `axeHelper.ts` for automated accessibility checks in UI/UX tests.
- **Test Hygiene:** Clean up test data after each test (clear cookies, local storage, etc.).
- **Tags:** Use tags (e.g., [@smoke], [@regression], [@security], [@ui], [@performance], [@data], [@functional]) in test titles for filtering and reporting.
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
  If you see errors like `UNABLE_TO_GET_ISSUER_CERT_LOCALLY` or SSL certificate issues during `npx playwright install`, try the following:
  1. **Set your company’s CA certificate:**
     ```sh
     export NODE_EXTRA_CA_CERTS=/path/to/your/cacert.crt
     npx playwright install
     ```
  2. **Temporarily disable strict SSL (not recommended for production):**
     ```sh
     npm config set strict-ssl false
     export NODE_TLS_REJECT_UNAUTHORIZED=0
     npx playwright install
     ```
  3. **Configure npm to use your CA:**
     ```sh
     npm config set cafile /path/to/your/cacert.crt
     ```
  4. **Set up proxy if behind a corporate proxy:**
     ```sh
     npm config set proxy http://your-proxy:port
     npm config set https-proxy http://your-proxy:port
     ```
  5. **Update Node.js and npm:**
     Sometimes updating Node.js and npm can resolve certificate issues.

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
- Email: [kapil.jain@madgicaltechdom.com]

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

## Prompt Example for Checkout Feature

When adding the checkout feature, use this prompt:

---

**Scenario:**
1. Login to the website
2. Click on the item 'Sauce Labs Backpack' for 'Add to cart' button
3. Click on the anchor with '.shopping_cart_link'
4. Click on the 'checkout' button
5. Add 'First Name', 'Last Name' and 'Postal code' and click on 'Continue' button
6. Click on 'Finish' button
7. 'THANK YOU FOR YOUR ORDER' should be visible

**Prompt:**
Generate Playwright test cases for the 'checkout' feature, covering positive, negative, security, performance, UI/UX (including accessibility), and data-driven scenarios.

- Organize tests by scenario type in separate files within `tests/checkout/` (e.g., `checkout.positive.spec.ts`, `checkout.negative.spec.ts`, etc.).
- Use the Page Object Model for all UI interactions, placing POMs in `tests/page-objects/checkout.page.ts`.
- Prefer resilient selectors (`getByRole`, `getByLabel`, `getByTestId`, `getByPlaceholder`) for stability and accessibility.
- Use shared helpers and test data factories for setup and data management; avoid hardcoded data.
- Assert both UI and network responses where relevant.
- Ensure comprehensive coverage of edge cases and error handling.
- Include accessibility checks in UI/UX tests using `axeHelper.ts`.
- Clean up any test data after tests run (clear cookies, local storage, etc.).
- Use clear, descriptive test names and comments.
- Tag tests (e.g., [@smoke], [@regression], [@security], [@ui], [@performance], [@data]) for filtering and reporting.
- Update the README and POMs as needed.

---

**This prompt ensures the checkout feature is tested in a modular, maintainable, and scalable way, following the standards of this project.**

## Debugging Example: Checkout Positive Test Case

When the positive checkout test case failed (e.g., due to a timeout on the 'Add to cart' button), we used the following debugging steps:

1. **Run in Debug Mode:**
   - Used Playwright Inspector with:
     ```sh
     npx playwright test tests/checkout/checkout.positive.spec.ts --debug
     ```
   - This allowed us to step through the test, pause at each action, and visually inspect the page.

2. **Review Selectors:**
   - Examined the DOM and realized the original selector chain for the 'Add to cart' button was too complex and did not match the actual structure.
   - Used Playwright’s codegen and Inspector to experiment with more resilient selectors.

3. **Fix Locator Strategy:**
   - Updated the Page Object Model to use:
     ```ts
     const item = this.page.locator('.inventory_item').filter({ hasText: itemName });
     await item.getByRole('button', { name: /add to cart/i }).click();
     ```
   - This approach scopes the button search to the correct product card, making the test robust and maintainable.

4. **Re-run and Validate:**
   - Re-ran the test to confirm the fix and ensure the scenario passed reliably.

**Tip:** Always use Playwright’s debug tools and review your selectors when a test fails due to timeouts or element not found errors. 

## FAQ

**Q: How do I add a new environment variable for my tests?**
A: Add it to your `.env` file for local runs and as a secret in GitHub Actions for CI. Access it in your code via `process.env.YOUR_VARIABLE`.

**Q: How do I run only failed tests?**
A: Use Playwright's `--last-failed` flag:
```sh
npx playwright test --last-failed
```

**Q: Where are screenshots saved?**
A: In the `screenshots` directory, only for failed tests by default.

**Q: How do I debug a test?**
A: Use the `--debug` flag:
```sh
npx playwright test <your-test-file> --debug
```

**Q: How do I update the test data or add new data-driven scenarios?**
A: Use or extend the helpers in `tests/helpers/dataFactory.ts` and `testDataFactory.ts`.

**Q: How do I contribute a new feature or scenario?**
A: See the [Prompt for Adding a New Feature](#prompt-for-adding-a-new-feature) and [Prompt Example for Checkout Feature](#prompt-example-for-checkout-feature) sections for templates and best practices.

--- 

**Q: How were many of these tests and best practices generated or refactored?**
A: We used Playwright MCP (Microsoft CodePilot) for AI-assisted test generation, refactoring, and debugging, ensuring rapid and consistent adoption of best practices. You can use **Cursor**, **Windsurf**, or any compatible tool that supports MCP for similar workflows. 

## Example Prompt: Generate Playwright Test Cases for Cart Feature (from HTML)

When adding or updating the cart feature based on a new HTML component, use the following prompt to generate comprehensive Playwright test cases and Page Object Models:

---

**Prompt:**

> Generate Playwright test cases for the following **cart** HTML component, covering positive, negative, security, performance, UI/UX (including accessibility), and data-driven scenarios.
>
> - Organize tests by scenario type in separate files within `tests/cart/` (e.g., `cart.positive.spec.ts`, `cart.negative.spec.ts`, etc.).
> - Use the Page Object Model for all UI interactions, placing POMs in `tests/page-objects/cart.page.ts`.
> - Prefer resilient selectors (`getByRole`, `getByLabel`, `getByTestId`) for stability and accessibility.
> - Use shared helpers and test data factories for setup and data management; avoid hardcoded data.
> - Assert both UI and network responses where relevant.
> - Ensure comprehensive coverage of edge cases and error handling.
> - Include accessibility checks in UI/UX tests.
> - Clean up any test data after tests run (clear cookies, local storage, etc.).
> - Use clear, descriptive test names and comments.
> - Tag tests (e.g., [@smoke], [@regression], [@security], [@ui], [@performance], [@data]) for filtering and reporting.
> - Update the README and POMs as needed.
>
> **HTML:**
> ```html
> <div id="cart">
>   <h2>Shopping Cart</h2>
>   <ul id="cart-items">
>     <li data-testid="cart-item">
>       <span class="item-name">Sauce Labs Backpack</span>
>       <span class="item-qty">1</span>
>       <button aria-label="Remove item" data-testid="remove-item">Remove</button>
>     </li>
>     <!-- More items... -->
>   </ul>
>   <div id="cart-summary">
>     <span id="total-label">Total:</span>
>     <span id="total-amount">$29.99</span>
>   </div>
>   <button id="checkout" aria-label="Checkout">Checkout</button>
> </div>
> ```

---

**How to use:**
- Submit this prompt to your AI tool to generate modular, best-practice Playwright test cases and a Page Object Model for the cart feature.
- The AI should generate:
  - A POM in `tests/page-objects/cart.page.ts`
  - Test files in `tests/cart/` for each scenario type (positive, negative, UI/UX, security, performance, data-driven)
  - Usage of resilient selectors and accessibility checks 

## Example Prompt: Generate All Types of Functional Playwright Test Cases for Cart Feature (from HTML)

When you want to generate comprehensive functional Playwright test cases for the cart feature, use the following prompt. This ensures coverage of all functional scenarios and follows the best practices of this project.

---

**Prompt:**

> Generate all types of functional Playwright test cases for the following cart HTML component. Cover positive, negative, edge, and regression scenarios. Ensure modularity, maintainability, and best practices:
>
> - Organize tests by scenario type in separate files within `tests/cart/` (e.g., `cart.positive.spec.ts`, `cart.negative.spec.ts`, `cart.functional.spec.ts`, etc.).
> - Use the Page Object Model for all UI interactions, placing POMs in `tests/page-objects/cart.page.ts`.
> - Prefer resilient selectors (`getByRole`, `getByLabel`, `getByTestId`) for stability and accessibility.
> - Use shared helpers and test data factories for setup and data management; avoid hardcoded data.
> - Assert both UI and network responses where relevant.
> - Ensure comprehensive coverage of edge cases and error handling.
> - Use clear, descriptive test names and comments.
> - Tag tests (e.g., [@smoke], [@regression], [@functional]) for filtering and reporting.
> - Update the README and POMs as needed.
>
> **HTML:**
> ```html
> <div id="cart">
>   <h2>Shopping Cart</h2>
>   <ul id="cart-items">
>     <li data-testid="cart-item">
>       <span class="item-name">Sauce Labs Backpack</span>
>       <span class="item-qty">1</span>
>       <button aria-label="Remove item" data-testid="remove-item">Remove</button>
>     </li>
>     <!-- More items... -->
>   </ul>
>   <div id="cart-summary">
>     <span id="total-label">Total:</span>
>     <span id="total-amount">$29.99</span>
>   </div>
>   <button id="checkout" aria-label="Checkout">Checkout</button>
> </div>
> ```

---

**How to use:**
- Adjust the cart HTML snippet as needed to match your actual component.
- Submit this prompt to your AI tool to generate modular, best-practice Playwright functional test cases and a POM for the cart feature. 