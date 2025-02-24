import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import { validateEnv } from '@/main/env';
import type { Env } from '@/main/env';

describe('Environment Validation', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Clear and reset process.env before each test
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    // Restore original process.env after all tests
    process.env = originalEnv;
  });

  it('should validate a valid environment', () => {
    process.env.WEBFLOW_ACCESS_TOKEN = 'valid-token';
    process.env.WEBFLOW_SITE_ID = 'valid-site-id';
    process.env.NODE_ENV = 'development';

    const env = validateEnv();

    expect(env).toEqual({
      WEBFLOW_ACCESS_TOKEN: 'valid-token',
      WEBFLOW_SITE_ID: 'valid-site-id',
      NODE_ENV: 'development'
    });
  });

  it('should throw error when WEBFLOW_ACCESS_TOKEN is missing', () => {
    process.env.WEBFLOW_ACCESS_TOKEN = '';
    
    expect(() => validateEnv()).toThrow('WEBFLOW_ACCESS_TOKEN is required');
  });

  it('should allow missing WEBFLOW_SITE_ID', () => {
    process.env.WEBFLOW_ACCESS_TOKEN = 'valid-token';
    delete process.env.WEBFLOW_SITE_ID;

    const env = validateEnv();

    expect(env.WEBFLOW_SITE_ID).toBeUndefined();
    expect(env.WEBFLOW_ACCESS_TOKEN).toBe('valid-token');
  });

  it('should default NODE_ENV to development when not provided', () => {
    process.env.WEBFLOW_ACCESS_TOKEN = 'valid-token';
    delete process.env.NODE_ENV;

    const env = validateEnv();

    expect(env.NODE_ENV).toBe('development');
  });

  it('should throw error for invalid NODE_ENV value', () => {
    process.env.WEBFLOW_ACCESS_TOKEN = 'valid-token';
    process.env.NODE_ENV = 'invalid';

    expect(() => validateEnv()).toThrow();
  });

  it('should validate all valid NODE_ENV values', () => {
    process.env.WEBFLOW_ACCESS_TOKEN = 'valid-token';
    
    const validEnvs = ['development', 'production', 'test'] as const;
    
    validEnvs.forEach(envValue => {
      process.env.NODE_ENV = envValue;
      const env = validateEnv();
      expect(env.NODE_ENV).toBe(envValue);
    });
  });

  it('should handle empty environment gracefully', () => {
    // Clear all relevant env vars
    delete process.env.WEBFLOW_ACCESS_TOKEN;
    delete process.env.WEBFLOW_SITE_ID;
    delete process.env.NODE_ENV;

    expect(() => validateEnv()).toThrow('WEBFLOW_ACCESS_TOKEN is required');
  });

  it('should validate type constraints', () => {
    process.env.WEBFLOW_ACCESS_TOKEN = 'valid-token';
    process.env.NODE_ENV = 'test';

    const env = validateEnv();

    // Type validation through satisfies operator
    const _typedEnv: Env = env;
    
    // Runtime checks
    expect(typeof env.WEBFLOW_ACCESS_TOKEN).toBe('string');
    expect(['development', 'production', 'test']).toContain(env.NODE_ENV);
    expect(typeof env.WEBFLOW_SITE_ID === 'string' || env.WEBFLOW_SITE_ID === undefined).toBe(true);
  });
}); 