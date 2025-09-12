import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test('should display about heading and project info', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading', { name: /About form-filler/i })).toBeVisible();
    await expect(page.getByText(/Learn more about this Angular/i)).toBeVisible();
    await expect(page.getByRole('heading', { name: /Project Overview/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Technology Stack/i })).toBeVisible();
  });
});
