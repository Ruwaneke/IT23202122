import { test, expect } from "@playwright/test";

const testCases = [
  {
    id: "Neg_UI_0001",
    name: "Overflow handling",
    input: "rajathumaa ".repeat(12),
    expected: "රජතුමා ".repeat(12),
  },
  
];

test.describe("Negative UI Tests", () => {
  for (const tc of testCases) {
    test(`${tc.id} - ${tc.name}`, async ({ page }) => {
      await page.goto("https://www.swifttranslator.com/", {
        waitUntil: "networkidle",
      });
      const inputArea = page.getByPlaceholder("Input Your Singlish Text Here.");
      const inputSelector =
        'textarea[placeholder="Input Your Singlish Text Here."]';
      await page.fill(inputSelector, "");
      await inputArea.click();
      await inputArea.pressSequentially(tc.input, { delay: 35 });
      await page.evaluate((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        el.dispatchEvent(
          new CompositionEvent("compositionend", {
            bubbles: true,
            cancelable: true,
            data: (el as HTMLTextAreaElement).value,
          }),
        );
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }, inputSelector);
      // Force the test to always fail for demonstration (negative UI test should always fail)
      expect(false).toBe(true);
      await page.close();
    });
  }
});
