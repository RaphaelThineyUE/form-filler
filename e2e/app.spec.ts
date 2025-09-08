import { test, expect } from '@playwright/test';

test.describe('form-filler App', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/form-filler - Home/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Welcome to form-filler/i })).toBeVisible();
    
    // Check navigation
    await expect(page.getByRole('link', { name: /form-filler/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Home/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /About/i })).toBeVisible();
  });

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/');
    
    // Click about link
    await page.getByRole('link', { name: /About/i }).click();
    
    // Check we're on about page
    await expect(page).toHaveURL(/.*\/about/);
    await expect(page.getByRole('heading', { name: /About form-filler/i })).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    await page.goto('/');
    
    // Check initial state (should be light mode by default)
    const body = page.locator('body');
    await expect(body).not.toHaveClass(/dark/);
    
    // Toggle dark mode
    const darkModeButton = page.getByRole('button', { name: /Switch to dark mode/i });
    await darkModeButton.click();
    
    // Check dark mode is applied
    const html = page.locator('html');
    await expect(html).toHaveClass(/dark/);
  });

  test('should work on mobile devices', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/');
    
    // Check mobile menu button is visible
    const mobileMenuButton = page.getByRole('button', { name: /Toggle navigation menu/i });
    await expect(mobileMenuButton).toBeVisible();
    
    // Open mobile menu
    await mobileMenuButton.click();
    
    // Check mobile navigation is visible
    await expect(page.getByRole('link', { name: /Home/i }).nth(1)).toBeVisible();
  });
});
