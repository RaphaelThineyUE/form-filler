import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display main heading and hero buttons', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Welcome to form-filler/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Get Started/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Learn More/i })).toBeVisible();
  });

  test('Get Started button should be clickable', async ({ page }) => {
    await page.goto('/');
    const getStarted = page.getByRole('button', { name: /Get Started/i });
    await expect(getStarted).toBeVisible();
    await getStarted.click();
    // Add assertion if button triggers navigation or modal
  });

  test('Learn More button should be clickable', async ({ page }) => {
    await page.goto('/');
    const learnMore = page.getByRole('button', { name: /Learn More/i });
    await expect(learnMore).toBeVisible();
    await learnMore.click();
    // Add assertion if button triggers navigation or modal
  });
});
