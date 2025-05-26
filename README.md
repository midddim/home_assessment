# 🎭 Playwright E2E Framework

Automated end-to-end testing framework using [Playwright](https://playwright.dev/) and TypeScript.

## 📦 Tech Stack

- [Playwright](https://playwright.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub Actions](https://docs.github.com/actions) for CI
- Node.js 18+

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run all tests
npm run test

# Run tests in headed mode (with browser UI)
npm run test:headed

# Generate test scripts with Codegen
npm run codegen
```

## 🗂️ Project Structure

```
.
├── tests/               # E2E test scenarios
├── pages/               # Page Object classes
├── utils/               # Utility functions and helpers
├── config/              # Environment variables and shared configs
├── playwright.config.ts # Playwright configuration
├── global.setup.ts      # Setup logic (e.g., login before tests)
└── .github/workflows/   # CI configuration (GitHub Actions)
```

## 🧪 Example Test

```ts
test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});
```

## 🔧 NPM Scripts

| Command               | Description                           |
|-----------------------|---------------------------------------|
| `npm run test`        | Run all Playwright tests              |
| `npm run test:headed` | Run tests with browser UI             |
| `npm run codegen`     | Open Playwright Codegen               |

## ⚙️ Continuous Integration

This project uses **GitHub Actions** to automatically run tests on every push and pull request.

## 🛣️ Roadmap / TODO

- [ ] Add Page Objects for major flows
- [ ] Implement login/auth setup in `global.setup.ts`
- [ ] Create reusable API client module
- [ ] Add Slack or Telegram notifications on failure
