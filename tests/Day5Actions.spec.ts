import{expect,test }from"@playwright/test";
const baseUrl = "https://sdetqa.vercel.app/autoplay";
test.describe("Data entry validation",()=>{
   

    test.beforeEach(async({page})=>{
        await page.goto(baseUrl);
        await expect(page).toHaveTitle("Web Automation Playground");
          await expect(page.getByText("Autoplay")).toBeVisible();
    })
     test("1. Page load validation",async({page})=>{
        //open the page and validate the url and title
        await expect(page).toHaveURL(baseUrl);
        await expect(page).toHaveTitle("Web Automation Playground");
        await expect(page.getByText("Autoplay")).toBeVisible();
     });

      test("2.fill data",async({page})=>{
        //fill data in the form and validate the data entered
        await page.getByPlaceholder('John Doe').clear();
        await page.getByPlaceholder('John Doe').fill("Raghib");
        await expect(page.getByPlaceholder("John Doe")).toHaveValue("Raghib");
        await page.getByPlaceholder("john@example.com").clear();
        await page.getByPlaceholder("john@example.com").fill("raghib@gmail.com");
        await expect(page.getByPlaceholder("john@example.com")).toHaveValue("raghib@gmail.com");
        await page.getByPlaceholder("+1 234 567 890").clear();
        await page.getByPlaceholder("+1 234 567 890").fill("9678767789");
        await expect(page.getByPlaceholder("+1 234 567 890")).toHaveValue("9678767789");
        await page.locator("#address") .fill("123 Main St, Anytown, USA");
        await expect(page.locator("#address")).toHaveValue("123 Main St, Anytown, USA");
        //get by Role and check the radio button
        await page.getByRole('radio', { name: 'Male', exact: true }).check();
        await page.locator("div[class='radio-group'] label:nth-child(1)").click();
                 await expect(page.locator("div[class='radio-group'] label:nth-child(1)")).toBeChecked();
                 //get by Role and check the checkbox
                 await page.getByRole('checkbox', { name: 'Mon', exact: true }).check();
         await page.locator("label[for='mon']").click();
       await page.locator("form[id='dataEntryForm'] button[type='submit']").click();
      
         
     });
      test.afterEach(async({page})=>{
        await page.close();
        });


});