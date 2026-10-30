import{expect, test} from "@playwright/test";
const baseUrl = "https://sdetqa.vercel.app/autoplay";
test.describe("Mouse click Validation", { tag: '@smoke',annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  }, }, () => {
    test.beforeEach(async({page})=>{
            await page.goto(baseUrl);
            await expect(page).toHaveTitle("Web Automation Playground");
              await expect(page.getByText("Autoplay")).toBeVisible();
        })

        test("1. Mouse click actionvalidation",async({page})=>{
            //open the page and validate the url and title
            await expect(page).toHaveURL(baseUrl);
           // Generic click
await page.getByRole('button').click();

// Double click
await page.getByText('Item').dblclick();

// Right click
await page.getByText('Item').click({ button: 'right' });

// Shift + click
await page.getByText('Item').click({ modifiers: ['Shift'] });

// Ctrl + click on Windows and Linux
// Meta + click on macOS
await page.getByText('Item').click({ modifiers: ['ControlOrMeta'] });

// Hover over element
await page.getByText('Item').hover();

// Click the top left corner
await page.getByText('Item').click({ position: { x: 0, y: 0 } });
        });
});