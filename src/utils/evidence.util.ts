import type { Page, TestInfo } from '@playwright/test';

export const attachJson = async (
  testInfo: TestInfo,
  name: string,
  payload: unknown
): Promise<void> => {
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(payload, null, 2)),
    contentType: 'application/json'
  });
};

export const attachScreenshot = async (
  page: Page,
  testInfo: TestInfo,
  name: string
): Promise<void> => {
  await testInfo.attach(name, {
    body: await page.screenshot({ fullPage: true }),
    contentType: 'image/png'
  });
};
