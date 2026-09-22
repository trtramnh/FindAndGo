import { expect, test } from '@playwright/test';

const preview = (page) => page.getByRole('region', { name: 'Bản trải nghiệm khám phá FIND&GO' });
const venueCards = (page) => preview(page).locator('.venue-card');

// Kiểm tra các kích thước thật, gồm ảnh tải chậm ở phần cuối trang.
for (const width of [1440, 1024, 768, 390, 375]) {
  test(`landing page fits ${width}px and loads its images`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Đi đâu hôm nay?');
    await expect(venueCards(page)).toHaveCount(3);

    for (const id of ['hero', 'explore', 'features', 'how-it-works', 'about', 'contact']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expect.poll(() => page.evaluate(() =>
        Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth,
      )).toBeLessThanOrEqual(1);
    }
    await expect.poll(() => page.locator('img').evaluateAll((images) =>
      images.every((image) => image.complete && image.naturalWidth > 0),
    )).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('navigation reaches each real section and updates the header', async ({ page }) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Điều hướng chính', exact: true });
  for (const [name, id] of [
    ['Tính năng', 'features'], ['Cách hoạt động', 'how-it-works'],
    ['Giới thiệu', 'about'], ['Liên hệ', 'contact'],
  ]) {
    await navigation.getByRole('link', { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await expect(page.locator('.site-header')).toHaveClass(/is-scrolled/);
  }
  await page.getByRole('link', { name: 'FIND&GO — Trang chủ', exact: true }).click();
  await expect(page).toHaveURL(/#hero$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(20);
});

test('mobile menu closes after navigation, Escape, and an outside click', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto('/');
  const mobileNavigation = page.getByRole('navigation', { name: 'Điều hướng di động' });
  await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Đóng menu' })).toHaveAttribute('aria-expanded', 'true');
  await mobileNavigation.getByRole('link', { name: 'Tính năng', exact: true }).click();
  await expect(mobileNavigation).toHaveCount(0);
  await expect(page).toHaveURL(/#features$/);

  await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(mobileNavigation).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Mở menu', exact: true })).toBeFocused();

  await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
  await page.mouse.click(5, 700);
  await expect(mobileNavigation).toHaveCount(0);

  await page.getByRole('button', { name: 'Mở menu', exact: true }).click();
  await mobileNavigation.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  const login = page.getByRole('dialog', { name: 'Hẹn bạn ở phiên bản tiếp theo' });
  await expect(login).toContainText('Đăng nhập chưa khả dụng');
  await login.getByRole('button', { name: 'Đóng hộp thoại' }).click();
  await expect(login).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Mở menu', exact: true })).toBeFocused();
});

test('local search, categories, combined criteria, and reset narrow the venue data', async ({ page }) => {
  await page.goto('/');
  const app = preview(page);
  const search = app.getByRole('searchbox', { name: 'Tìm địa điểm mẫu' });
  await search.fill('garden');
  await expect(venueCards(page)).toHaveCount(1);
  await expect(venueCards(page).getByRole('heading')).toHaveText('The Garden Room');
  await search.fill('');
  await expect(venueCards(page)).toHaveCount(3);

  const activity = app.getByRole('group', { name: 'Mục đích chuyến đi' });
  await activity.getByRole('button', { name: 'Ăn uống', exact: true }).click();
  await expect(venueCards(page).getByRole('heading')).toHaveText('Gather & Eat');
  await activity.getByRole('button', { name: 'Ăn uống', exact: true }).click();
  await expect(venueCards(page)).toHaveCount(3);

  await app.getByRole('button', { name: 'Thử tìm ngay', exact: true }).click();
  await expect(venueCards(page)).toHaveCount(1);
  await expect(venueCards(page).getByRole('heading')).toHaveText('The Little Corner');
  await expect(activity.getByRole('button', { name: 'Học tập', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(app.getByRole('combobox', { name: 'Ngân sách mỗi người' })).toHaveValue('70000');
  await expect(app.getByRole('combobox', { name: 'Số người', exact: true })).toHaveValue('4');
  await expect(app.getByRole('button', { name: 'Wi-Fi', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await expect(app.getByRole('button', { name: 'Ổ cắm', exact: true })).toHaveAttribute('aria-pressed', 'true');

  await app.getByRole('combobox', { name: 'Số người', exact: true }).selectOption('8');
  await expect(venueCards(page)).toHaveCount(0);
  await expect(app.getByRole('heading', { name: 'Chưa có địa điểm mẫu phù hợp' })).toBeVisible();
  await app.getByRole('button', { name: 'Xóa bộ lọc', exact: true }).first().click();
  await expect(venueCards(page)).toHaveCount(3);
  await app.getByRole('combobox', { name: 'Khoảng cách minh họa' }).selectOption('2');
  await expect(venueCards(page)).toHaveCount(2);
  await search.fill('a-place-that-does-not-exist');
  await expect(venueCards(page)).toHaveCount(0);
  await app.getByRole('button', { name: 'Xóa bộ lọc', exact: true }).first().click();
  await expect(search).toHaveValue('');
  await expect(venueCards(page)).toHaveCount(3);
});

test('favorites survive reload and can be removed from the saved view', async ({ page }) => {
  await page.goto('/');
  await preview(page).getByRole('button', { name: 'Lưu The Little Corner', exact: true }).click();
  await expect(preview(page).getByRole('button', { name: 'Bỏ lưu The Little Corner', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(preview(page).getByRole('button', { name: 'Bỏ lưu The Little Corner', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('navigation', { name: 'Điều hướng bản demo' }).getByRole('button', { name: /Yêu thích/ }).click();
  await expect(venueCards(page)).toHaveCount(1);
  await expect(venueCards(page).getByRole('heading')).toHaveText('The Little Corner');
  await preview(page).getByRole('button', { name: 'Bỏ lưu The Little Corner', exact: true }).click();
  await expect(venueCards(page)).toHaveCount(0);
  await expect(preview(page).getByRole('heading', { name: 'Lưu một nơi bạn muốn ghé' })).toBeVisible();
});

test('venue details and the honest login placeholder close correctly', async ({ page }) => {
  await page.goto('/');
  const detailsButton = venueCards(page).first().getByRole('button', { name: 'Xem chi tiết', exact: true });
  await detailsButton.click();
  const details = page.getByRole('dialog', { name: 'The Little Corner', exact: true });
  await expect(details).toBeVisible();
  await expect(details).toContainText('không phải địa điểm đã được xác minh');
  await expect(details.getByRole('button', { name: 'Đóng hộp thoại' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(details).toHaveCount(0);
  await expect(detailsButton).toBeFocused();

  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
  const login = page.getByRole('dialog', { name: 'Hẹn bạn ở phiên bản tiếp theo' });
  await expect(login).toContainText('Đăng nhập chưa khả dụng');
  await login.getByRole('link', { name: 'Khám phá bản demo', exact: true }).click();
  await expect(login).toHaveCount(0);
  await expect(page).toHaveURL(/#explore$/);
});

test('reduced motion disables decorative movement and smooth scrolling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const selector of ['.marquee-track', '.preview-float-top', '.preview-float-bottom', '.preview-float-side']) {
    await expect(page.locator(selector)).toHaveCSS('animation-name', 'none');
  }
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  await expect.poll(() => page.locator('.pulse-dot').evaluate((element) =>
    getComputedStyle(element, '::after').animationName,
  )).toBe('none');
});

test('an unavailable venue photo uses the local image fallback', async ({ page }) => {
  await page.route('**/assets/cafe-interior.jpg', (route) => route.abort());
  await page.goto('/');
  const photo = venueCards(page).first().getByRole('img');
  await expect(photo).toHaveAttribute('src', '/assets/venue-fallback.svg');
  await expect.poll(() => photo.evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
});
