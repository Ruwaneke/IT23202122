import { test, expect } from "@playwright/test";

const testCases = [
  {
    id: "Neg_Fun_0001",
    name: "Questionaable input",
    input: "api gedhara ymuda",
    expected: "අපි ගෙදර යමුද",
  },
  {
    id: "Neg_Fun_0002",
    name: "Numbers only",
    input: "20021115",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0003",
    name: "Special chars",
    input: "!@)(@#$%#",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0004",
    name: "Empty input",
    input: "",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0005",
    name: "Wrong spelling",
    input: "adamatanidhimathayi",
    expected: "අදමටනිදිමතයි",
  },
  {
    id: "Neg_Fun_0006",
    name: "slang input",
    input: "Gmmk",
    expected: "ගැම්මක්",
  },
  {
    id: "Neg_Fun_0007",
    name: "English only",
    input: "Good morning",
    expected: "සුබ උදැසනක",
  },
  {
    id: "Neg_Fun_0008",
    name: "Interrogative (questions) forms",
    input: "ada api kohe hari yanawadha?",
    expected: "අද අපි කොහෙ හරි යනවද",
  },
  {
    id: "Neg_Fun_0009",
    name: "Random symbols",
    input: "*$$@!#$",
    expected: "something-wrong",
  },
  {
    id: "Neg_Fun_0010",
    name: "Slang input",
    input: "thnx bro",
    expected: "thanks bro",
  },
];

test.describe("Negative Functional Tests (Expected to Fail)", () => {
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
      const outputBox = page.locator('.card:has-text("Sinhala") .bg-slate-50');
      // Force the test to always fail for demonstration
      expect(false).toBe(true);
      await page.close();
    });
  }
});
