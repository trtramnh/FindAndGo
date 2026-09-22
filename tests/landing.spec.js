import { expect, test } from '@playwright/test';

const preview = (page) =>
  page.getByRole('region', {
    name: /FIND&GO Discovery Interactive Demo|Bản trải nghiệm khám phá FIND&GO/,
  });
const venueCards = (page) => preview(page).locator('.venue-card');

// Responsive check across desktop, laptop, tablet, and mobile
for (const width of [1440, 1024, 768, 390, 375]) {
  test(`landing page fits ${width}px and loads its images without overflow`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');

    // English by default
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'Find Your Place'
    );
    await expect(venueCards(page)).toHaveCount(3);

    for (const id of [
      'hero',
      'problem',
      'introducing',
      'how-it-works',
      'explore',
      'purpose',
      'why',
      'use-cases',
      'faq',
      'contact',
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              Math.max(
                document.documentElement.scrollWidth,
                document.body.scrollWidth
              ) - window.innerWidth
          )
        )
        .toBeLessThanOrEqual(1);
    }

    await expect
      .poll(() =>
        page
          .locator('img')
          .evaluateAll((images) =>
            images.every((image) => image.complete && image.naturalWidth > 0)
          )
      )
      .toBe(true);

    // Strictly no video elements
    await expect(page.locator('video')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('navigation reaches sections and updates header state', async ({
  page,
}) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', {
    name: 'Main Navigation',
    exact: true,
  });

  for (const [name, id] of [
    ['Why FIND&GO', 'why'],
    ['How It Works', 'how-it-works'],
    ['Explore', 'explore'],
    ['FAQ', 'faq'],
  ]) {
    await navigation.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await expect(page.locator('.site-header')).toHaveClass(/is-scrolled/);
  }

  await page.getByRole('link', { name: 'FIND&GO — Home', exact: true }).click();
  await expect(page).toHaveURL(/#hero$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(30);
});

test('color mode switcher toggles dark and light mode', async ({ page }) => {
  await page.goto('/');
  const toggleBtn = page.locator('.theme-toggle-btn');
  await expect(toggleBtn).toBeVisible();

  // Initial state check
  const isDarkInitial = await page.evaluate(() =>
    document.documentElement.classList.contains('theme-dark')
  );

  // Toggle mode
  await toggleBtn.click();
  const isDarkAfter = await page.evaluate(() =>
    document.documentElement.classList.contains('theme-dark')
  );
  expect(isDarkAfter).toBe(!isDarkInitial);

  // Toggle back
  await toggleBtn.click();
  const isDarkFinal = await page.evaluate(() =>
    document.documentElement.classList.contains('theme-dark')
  );
  expect(isDarkFinal).toBe(isDarkInitial);
});

test('language switcher toggles between English and Vietnamese', async ({
  page,
}) => {
  await page.goto('/');

  // English by default
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Find Your Place.'
  );

  const langBtn = page.locator('.lang-toggle-btn');
  await expect(langBtn).toContainText('VI');

  // Switch to Vietnamese
  await langBtn.click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    /Tìm đúng nơi/i
  );
  await expect(langBtn).toContainText('EN');

  // Switch back to English
  await langBtn.click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Find Your Place.'
  );
  await expect(langBtn).toContainText('VI');
});

test('FAQ accordion expands and collapses questions correctly', async ({
  page,
}) => {
  await page.goto('/');
  const faqSection = page.locator('#faq');
  await faqSection.scrollIntoViewIfNeeded();

  const firstQuestion = page.locator('#faq-btn-0');
  const secondQuestion = page.locator('#faq-btn-1');

  // Initially first question is open
  await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-answer-0')).toBeVisible();

  // Click first question to close
  await firstQuestion.click();
  await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#faq-answer-0')).toHaveCount(0);

  // Click second question to open
  await secondQuestion.click();
  await expect(secondQuestion).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#faq-answer-1')).toBeVisible();
});

test('interactive showcase search, filters, and reset narrow venue data', async ({
  page,
}) => {
  await page.goto('/');
  const app = preview(page);
  const search = app.locator('#venue-search');

  // Test search
  await search.fill('garden');
  await expect(venueCards(page)).toHaveCount(1);
  await expect(venueCards(page).getByRole('heading')).toHaveText(
    'The Garden Room'
  );
  await search.fill('');
  await expect(venueCards(page)).toHaveCount(3);

  // Test category chip
  const diningChip = app
    .getByRole('group', { name: 'Purpose / Activity Filter' })
    .getByRole('button', { name: /Dining/i });
  await diningChip.click();
  await expect(venueCards(page)).toHaveCount(1);
  await expect(venueCards(page).getByRole('heading')).toHaveText('Gather & Eat');
  await diningChip.click();
  await expect(venueCards(page)).toHaveCount(3);

  // Quick example button
  await app.getByRole('button', { name: /Try this search/i }).click();
  await expect(venueCards(page)).toHaveCount(1);
  await expect(venueCards(page).getByRole('heading')).toHaveText(
    'The Little Corner'
  );

  // Clear filters
  await app.getByRole('button', { name: /Reset filters/i }).click();
  await expect(venueCards(page)).toHaveCount(3);
});

test('favorites survive reload and are visible in saved view', async ({
  page,
}) => {
  await page.goto('/');
  const saveBtn = preview(page)
    .locator('.venue-card')
    .first()
    .locator('.favorite-button');

  await saveBtn.click();
  await expect(saveBtn).toHaveClass(/is-saved/);

  // Reload page
  await page.reload();
  const reloadedSaveBtn = preview(page)
    .locator('.venue-card')
    .first()
    .locator('.favorite-button');
  await expect(reloadedSaveBtn).toHaveClass(/is-saved/);

  // Switch to favorites view
  await preview(page)
    .getByRole('navigation', { name: 'Demo Navigation' })
    .getByRole('button', { name: /Favorites/i })
    .click();
  await expect(venueCards(page)).toHaveCount(1);
  await expect(venueCards(page).getByRole('heading')).toHaveText(
    'The Little Corner'
  );

  // Unsave
  await venueCards(page).first().locator('.favorite-button').click();
  await expect(venueCards(page)).toHaveCount(0);
});

test('Coming Soon page renders with status badge, form validation, honest notice, and Back to Home', async ({
  page,
}) => {
  await page.goto('/coming-soon');

  // Verify elements from DisNote reference screenshot
  await expect(
    page.getByText('FEATURE IN DEVELOPMENT · COMING SOON')
  ).toBeVisible();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'This Feature Is Coming Soon!'
  );
  await expect(
    page.getByText(/We're working on something new for FIND&GO/i)
  ).toBeVisible();

  // Email form
  const emailInput = page.getByRole('textbox', {
    name: 'Enter your email address...',
  });
  const notifyBtn = page.getByRole('button', { name: 'Notify Me' });
  await expect(emailInput).toBeVisible();

  // Invalid email test
  await emailInput.fill('invalid-email');
  await notifyBtn.click();
  await expect(page.locator('.cs-error')).toContainText(
    'Please enter a valid email address'
  );

  // Valid email test -> simulated success notification state
  await emailInput.fill('student@university.edu');
  await notifyBtn.click();
  await expect(page.locator('.cs-notice')).toBeVisible();
  await expect(page.locator('.cs-notice')).toContainText(
    'student@university.edu'
  );

  // Test dynamic feature query param allowlist
  await page.goto('/coming-soon?feature=signin');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Sign In Is Coming Soon!'
  );

  // Back to Home
  const backHomeLink = page.getByRole('link', { name: 'Back to Home' });
  await backHomeLink.click();
  await expect(page).toHaveURL(/^(http:\/\/127\.0\.0\.1:5173\/|\/)$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Find Your Place.'
  );
});

test('Sign In button in header redirects to /coming-soon?feature=signin', async ({
  page,
}) => {
  await page.goto('/');
  const signInBtn = page.locator('.header-signin-btn');
  await signInBtn.click();
  await expect(page).toHaveURL(/coming-soon\?feature=signin/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'Sign In Is Coming Soon!'
  );
});

test('venue details modal opens and closes with Escape key', async ({
  page,
}) => {
  await page.goto('/');
  const detailsBtn = venueCards(page)
    .first()
    .getByRole('button', { name: /View details/i });
  await detailsBtn.click();

  const dialog = page.getByRole('dialog', { name: 'The Little Corner' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('DEMO VENUE');

  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
});

test('reduced motion disables decorative animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const selector of [
    '.marquee-track',
    '.preview-float-top',
    '.preview-float-bottom',
    '.preview-float-side',
  ]) {
    await expect(page.locator(selector)).toHaveCSS('animation-name', 'none');
  }
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
});
