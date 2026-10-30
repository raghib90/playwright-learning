import{expect,test }from"@playwright/test";
const baseUrl = "https://sdetqa.vercel.app/autoplay";
test.describe("Mouse Actions Validation",()=>{
   
test.beforeEach(async({page})=>{
        await page.goto(baseUrl);
        await expect(page).toHaveTitle("Web Automation Playground");
          await expect(page.getByText("Autoplay")).toBeVisible();
    })
    test("1. Checkboxes and radio buttons",async({page})=>{
            //open the page and validate the url and title
            await expect(page).toHaveURL(baseUrl);
            await expect(page).toHaveTitle("Web Automation Playground");
            await expect(page.getByText("Autoplay")).toBeVisible();
             await page.getByRole('radio', { name: 'Male', exact: true }).check();
        await page.locator("div[class='radio-group'] label:nth-child(1)").click();
        // Scroll down by 500 pixels
await page.evaluate(() => {
  window.scrollBy(0, 500);
});
                 await expect(page.getByRole('radio', { name: 'Male', exact: true })).toBeChecked();
                   
                 await expect(page.getByRole('radio', { name: 'Female', exact: true })).not.toBeChecked();
         });
         test("3. Mouse Drop down select option",async({page})=>{
            //open the page and validate the url and title
            await expect(page).toHaveURL(baseUrl);
            await expect(page).toHaveTitle("Web Automation Playground");
            await expect(page.getByText("Autoplay")).toBeVisible();
            // Single selection matching the value or label
 //await page.getByLabel('country').selectOption({value:'usa'});
//await page.getByLabel('Country').selectOption({ label: 'USA' });
const countrySelect = page.locator("//select[@id='country']");
await expect(countrySelect).toBeVisible();
await page.locator("//select[@id='country']").selectOption({ value: 'usa' });
expect(await page.locator("//select[@id='country']").inputValue()).toBe('usa');
expect(await page.locator("//select[@id='country']").evaluate((el) => (el as HTMLSelectElement).value)).toBe('usa');
expect(await page.locator("//select[@id='country']").evaluate((el) => (el as HTMLSelectElement).selectedOptions[0].value)).toBe('usa');
await expect(page.locator("//select[@id='country']")).toHaveValue('usa');
// Multiple selected items
//await page.locator("//select[@id='country']").selectOption({ value: 'usa' });
//await page.locator("//select[@id='country']").selectOption({ value: 'canada' });  
// Multiple selected items
await page.locator("#colors").selectOption(['red', 'green', 'blue']);
const selectedColors = await page.locator("#colors option:checked").evaluateAll(
        options => options.map(option => (option as HTMLOptionElement).value)
);
 console.log('Total options first:', selectedColors);
// Locate all <option> elements inside the dropdown
const options = page.locator('#colors option');

// Get the count
const count = await options.count();
expect(count).toBe(4); // Assuming there are 4 options in the dropdown
console.log('Total options:', count);
 
// Get all visible texts of the options
const allOptions = await options.allTextContents();
console.log('Options:', allOptions);
const countOptions =  countrySelect.locator('option').count();
console.log('Total options count:', await countOptions);
expect(await countOptions).toBe(5); // Assuming there are 5 options in the dropdown
const allOptionTexts = await countrySelect.locator('option').allTextContents();
console.log('All option texts:', allOptionTexts);
expect(allOptionTexts).toEqual(['India', 'USA', 'UK', 'Germany', 'France']);
expect(allOptionTexts).toContain('USA');

         });
                        // Verify dropdown options are in sorted order.
                        test('Dropdown options should be sorted', async ({ page }) => {
                                const optionTexts = await page.locator('#colors option').allTextContents();
                                expect(optionTexts).toEqual([...optionTexts].sort());
                        });
});