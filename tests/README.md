# Testing with Vitest

This project uses Vitest for testing. Vitest is a modern testing framework that's built on top of Vite, offering fast, reliable testing with first-class TypeScript support.

## Running Tests

You can run tests using the following npm scripts:

```bash
# Run tests in watch mode (development)
npm test

# Run tests with coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

## Test Structure

Tests are organized following the source code structure:

```
src/
├── main/
│   ├── cli.ts
│   ├── cli.test.ts           # Tests for CLI functionality
│   └── serializers/
│       └── typescript/
│           ├── typescript-serializer.ts
│           └── typescript-serializer.test.ts  # Tests for TypeScript serializer
```

## Writing Tests

Tests are written using Vitest's testing API. Here's a basic example:

```typescript
import { describe, it, expect } from 'vitest';

describe('MyFunction', () => {
  it('should do something specific', () => {
    const result = myFunction();
    expect(result).toBe(expectedValue);
  });
});
```

### Mocking

The project uses Vitest's mocking capabilities for external dependencies. Common mocks are set up in `tests/vitest.setup.ts`:

- `fs/promises` for file system operations
- `inquirer` for CLI prompts

Example of using mocks in tests:

```typescript
import { vi } from 'vitest';
import fs from 'fs/promises';
import inquirer from 'inquirer';

describe('Feature', () => {
  it('should handle file operations', async () => {
    // Mock file read
    vi.mocked(fs.readFile).mockResolvedValueOnce('file content');
    
    // Mock user input
    vi.mocked(inquirer.prompt).mockResolvedValueOnce({ choice: 'option1' });
    
    // Test your feature
    const result = await yourFeature();
    expect(result).toBeDefined();
  });
});
```

## Coverage Reports

Coverage reports are generated using V8's coverage provider. The reports include:
- Text summary in the console
- Detailed HTML report
- JSON report for CI/CD integration

Coverage configuration can be found in `vitest.config.ts`.

## Best Practices

1. **Test Organization**
   - Keep test files next to the source files they test
   - Use descriptive test names that explain the expected behavior
   - Group related tests using `describe` blocks

2. **Mocking**
   - Mock external dependencies
   - Reset mocks between tests using `beforeEach`
   - Use type-safe mocking with `vi.mocked()`

3. **Assertions**
   - Write specific assertions that test one thing at a time
   - Use appropriate matchers for different types of assertions
   - Include both positive and negative test cases

4. **Async Testing**
   - Always await async operations
   - Use `try/catch` blocks to test error cases
   - Mock timeouts and intervals when needed

## Environment Variables

Test-specific environment variables are defined in `.env.test`. These are automatically loaded during test execution.

## Debugging Tests

You can debug tests using:
1. The Vitest UI (`npm run test:ui`)
2. VS Code's debugger with the following launch configuration:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "autoAttachChildProcesses": true,
  "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
  "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
  "args": ["run", "${relativeFile}"],
  "smartStep": true,
  "console": "integratedTerminal"
}
```

## Continuous Integration

Tests are automatically run in CI/CD pipelines. The coverage reports are used to ensure maintaining high test coverage standards.
