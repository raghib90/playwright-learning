import{expect,test }from"@playwright/test";
const baseUrl = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login";
test.describe("Bootstrip dropdown",()=>{
   
test.beforeEach(async({page})=>{
        await page.goto(baseUrl, { waitUntil: 'load' });
        await expect(page).toHaveTitle("OrangeHRM");
          await expect(page.getByText("Username : Admin")).toBeVisible();
    })

        test("dropdown functionality",async({page})=>{
               await expect(page).toHaveTitle("OrangeHRM");
          await expect(page.getByText("Username : Admin")).toBeVisible();
          await expect(page.getByText("Password : admin123")).toBeVisible();
          await page.getByPlaceholder("Username").fill("Admin");
           await expect(page.locator('input[name="username"]')).toHaveValue('Admin');
          await page.getByPlaceholder("Password").fill("admin123");
        await expect(page.locator('input[name="password"]')).toHaveValue('admin123');
          //await page.waitForTimeout(120000);
          await page.getByRole('button', { name: 'Login' }).click();
          await expect(page).toHaveTitle("OrangeHRM");
         await expect(page.getByText("PIM")).toBeVisible();
          await page.getByRole('link', { name: 'PIM' }).click();
          await expect(page).toHaveTitle("OrangeHRM");
          await expect(page.getByText("Employee List")).toBeVisible();
        await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
        // 6. Click on Job Title dropdown (hidden/bootstrap dropdown)
   const jobTitleDropDown=page.locator('.oxd-select-wrapper').nth(2)
    await jobTitleDropDown.click()
    
    //select all options and print the text of each option
    
     const allJobTitleOptions1 = await page.locator("div[role='listbox'] span");
     
    await expect(page.locator("div[role='listbox'] span").first()).toBeVisible()
    //9. Get text of all the options
const optionTexts=await allJobTitleOptions1.allTextContents()
console.log("Dropdown options:",optionTexts)
     const jobTitleOptionsCount1 = await page.locator("div[role='listbox'] span").count();
    console.log('Total Job Title Options:', jobTitleOptionsCount1);
    await expect(jobTitleOptionsCount1).toBeGreaterThan(0);
    const jobTitleOptionsCount = await page.locator('.oxd-select-dropdown .oxd-select-option').count();
    console.log('Total Job Title Options:', jobTitleOptionsCount);
    await expect(jobTitleOptionsCount).toBeGreaterThan(0);

    // itterate through each option and print the text
    for (let i = 0; i < jobTitleOptionsCount; i++) {
        const optionText = await allJobTitleOptions1.nth(i).textContent();
        console.log(`Option ${i + 1}: ${optionText}`);
        if (optionText?.trim() === 'Software Engineer') {
            await allJobTitleOptions1.nth(i).click();
            console.log(`Selected Option: ${optionText}`);
            break;
        }
    }
    expect(await jobTitleDropDown.textContent()).toBe('Software Engineer');
    

    });
})