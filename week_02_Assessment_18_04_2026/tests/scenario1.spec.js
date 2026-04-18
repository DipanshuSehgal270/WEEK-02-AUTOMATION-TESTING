import {test, expect} from "@playwright/test"

test('Tools QA',async ({page}) => {

  await page.goto('https://demoqa.com/automation-practice-form');
  await expect(page).toHaveURL(/automation-practice-form/);

  const fName = page.locator('//input[@id="firstName"]');
  await expect(fName).toBeVisible();
  await expect(fName).toBeEditable();
  await fName.fill('harman');
  await expect(fName).toHaveValue('harman');

  const lName = page.locator('//input[@id="lastName"]');
  await lName.fill('singh');
  await expect(lName).toHaveValue('singh');

  const email = page.locator('//input[@id="userEmail"]');
  await email.fill('harmansingh@gmail.com');
  await expect(email).toHaveValue('harmansingh@gmail.com');
  
  const genderRadio = page.locator('//input[@id="gender-radio-1"]');
  await page.locator('//label[@for="gender-radio-1"]').click();
  await expect(genderRadio).toBeChecked();

  const mobile = page.locator('//input[@id="userNumber"]');
  await mobile.fill('9988774455');
  await expect(mobile).toHaveValue('9988774455');

  await page.locator('//input[@class="subjects-auto-complete__input"]').fill('Maths');
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(2000);
  await page.keyboard.press('Enter');
  await page.locator('//input[@class="subjects-auto-complete__input"]').fill('Computer science');
  await page.keyboard.down('ArrowDown');
  await page.waitForTimeout(2000);
  await page.keyboard.press('Enter');

  await expect(page.locator('.subjects-auto-complete__multi-value__label').first()).toHaveText('Maths');

  const hobby1 = page.locator('//input[@id="hobbies-checkbox-1"]');
  const hobby3 = page.locator('//input[@id="hobbies-checkbox-3"]');
  await page.locator('//label[@for="hobbies-checkbox-1"]').click();
  await page.locator('//label[@for="hobbies-checkbox-3"]').click();
  await expect(hobby1).toBeChecked();
  await expect(hobby3).toBeChecked();

  await page.locator('//input[@id="uploadPicture"]').click();
  await page.waitForTimeout(8000);

  const address = page.locator('//textarea[@id="currentAddress"]');
  await address.fill('NH-05, Ludhiana - Chandigarh Highway, Mohali, Punjab 140413, India');
  await expect(address).toHaveValue(/Ludhiana/);

  await page.locator('//div[@class="css-19bb58m"]').click();
  await page.keyboard.down('ArrowDown');
  await page.keyboard.press('Enter');

  await page.locator('//div[@class="css-13cymwt-control"]').first().click();
  await page.keyboard.down('ArrowDown');
  await page.keyboard.press('Enter');

  const submitBtn = page.locator('//button[@id="submit"]');
  await expect(submitBtn).toBeVisible();
  await submitBtn.click();

  await expect(page.locator('#example-modal-sizes-title-lg')).toBeVisible();
  await expect(page.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');

  await page.screenshot({path:'Screenshots/scenario1.png'});
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.90});
})