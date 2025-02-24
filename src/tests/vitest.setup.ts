/// <reference types="vitest" />
import { vi, beforeEach } from 'vitest';
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Mock process.exit
const mockExit = vi.spyOn(process, 'exit')
  .mockImplementation((() => undefined) as any);

// Mock fs promises
vi.mock('fs/promises', () => ({
  default: {
    writeFile: vi.fn(),
    readFile: vi.fn(),
    mkdir: vi.fn()
  }
}));

// Mock inquirer
vi.mock('inquirer', () => ({
  default: {
    prompt: vi.fn()
  }
}));

// Mock cli-utils with all required exports
vi.mock('@/main/utils/cli-utils', () => ({
  showSpinner: vi.fn().mockReturnValue({ 
    success: vi.fn(),
    error: vi.fn(),
    stop: vi.fn()
  }),
  showSuccess: vi.fn(),
  showError: vi.fn(),
  showInfo: vi.fn(),
  selectCollections: vi.fn().mockResolvedValue(['test-collection-id']),
  selectSite: vi.fn().mockResolvedValue('test-site-id'),
  pastel: {
    multiline: vi.fn()
  }
}));

// Reset all mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockExit.mockClear();
}); 