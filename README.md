# Cypress Test Automation Framework

This Cypress-based automation framework is designed to test the functionality of your web application efficiently and reliably. The framework includes modular Page Object Model (POM) classes, test cases, and utilities to ensure maintainability and scalability.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Setup and Installation](#setup-and-installation)
3. [Running Tests](#running-tests)
4. [Framework Components](#framework-components)
    - [Page Object Model](#page-object-model)
    - [Custom Commands](#custom-commands)
5. [Key Features](#key-features)
6. [Writing New Tests](#writing-new-tests)
7. [Contributing](#contributing)
8. [License](#license)

---

## Setup and Installation

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Install Dependencies**:
   Ensure Node.js is installed, then run:
   ```bash
   npm install
   ```

3. **Verify Installation**:
   Ensure Cypress is installed correctly:
   ```bash
   npx cypress verify
   ```

---

## Running Tests

The framework provides multiple ways to run tests using either direct commands or npm scripts defined in `package.json`.

### Available Scripts in `package.json`:
```json
"scripts": {
  "open": "cypress open",
  "run": "cypress run"
}
```

### Using NPM Scripts:
1. **Open Cypress Test Runner**:
   ```bash
   npm run open
   ```
   - This runs the script `"open": "cypress open"` defined in `package.json`.
   - Opens the Cypress Test Runner GUI for running tests interactively.

2. **Run All Tests in Headless Mode**:
   ```bash
   npm run run
   ```
   - This runs the script `"run": "cypress run"` defined in `package.json`.
   - Executes all test cases in headless mode (no GUI).

### Using Direct Commands:
You can bypass the npm scripts and use Cypress commands directly:

1. **Open Cypress Test Runner**:
   ```bash
   npx cypress open
   ```
   - This directly invokes Cypress Test Runner without relying on `package.json` scripts.

2. **Run All Tests in Headless Mode**:
   ```bash
   npx cypress run
   ```
   - This directly runs all tests in headless mode.

### Key Differences:
- **NPM Scripts**:
  - Useful for standardizing test commands.
  - Scripts are predefined in `package.json`, making them easier to use and consistent across environments.

- **Direct Commands**:
  - Bypass `package.json` and run Cypress commands manually.
  - Useful for ad-hoc testing or debugging scenarios.

---

## Framework Components

### Page Object Model (POM)

The framework uses POM to abstract the UI elements and actions for better reusability and maintainability. Each POM file is structured to represent specific pages or components in the application.

#### Example: CategoriesPage
```javascript
export class CategoriesPage {
    btnCreateCategory = () => cy.get('[routerlink="../create-category"]');
    searchCategory(categoryName) 
        this.txtSearch().clear().type(categoryName);
        this.btnSearch().click();
    }
}
```

#### Included Pages:
- `LoginPage`: Handles login functionality.
- `CreateCategoryPage`: Manages category creation.
- `UpdateCategoryPage`: Handles category updates.
- `CategoriesPage`: Manages categories (search, delete, etc.).
- `DeletePopupPage`: Handles confirmation popups for deletion.
- `SideMenuPage`: Handles navigation through the side menu.

### Custom Commands

The `commands.js` file contains reusable custom Cypress commands to simplify and enhance test readability.

#### Example:
```javascript
Cypress.Commands.add('login', (email, password) => {
    cy.get('#username').type(email);
    cy.get('#password').type(password);
    cy.get('#kc-login').click();
});
```

### Global Configuration

- **Base URL**: Set in `cypress.config.js`:
  ```javascript
  baseUrl: 'https://test-cloud.intellifinder.dk'
  ```

---

## Key Features

1. **Page Object Model**:
   - Abstracts UI elements for better test structure.
2. **Custom Commands**:
   - Reduces repetitive code.
3. **Scalable Design**:
   - Easily add new pages and tests.

---

## Writing New Tests

1. Create a new test file in the `e2e` directory.
2. Use existing POM classes to interact with the application.
3. Follow the Cypress test structure:
   ```javascript
   describe('New Test Suite', () => {
       const loginPage = new LoginPage();

       it('Sample Test', () => {
           loginPage.login('username', 'password');
           // Add test steps
       });
   });
   ```

4. Run and validate the test locally.

---
