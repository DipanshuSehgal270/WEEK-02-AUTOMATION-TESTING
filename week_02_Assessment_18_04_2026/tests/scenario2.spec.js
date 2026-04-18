import {test, expect} from "@playwright/test"

test('form fillup',async ({page}) => {

  await page.goto('https://vinothqaacademy.com/demo-site/');

  const vName = page.locator('//input[@id="vfb-5"]');
  await vName.fill("harman");
  await expect(vName).toHaveValue("harman");

  const vLName = page.locator('//input[@id="vfb-7"]');
  await vLName.fill("singh");
  await expect(vLName).toHaveValue("singh");

  const gender = page.locator('//input[@id="vfb-31-1"]');
  await gender.click();
  await expect(gender).toBeChecked();

  const hobbyChkbx = page.locator('//input[@id="vfb-20-1"]');
  await hobbyChkbx.click();
  await expect(hobbyChkbx).toBeChecked();

  await page.locator('//input[@id="vfb-20-4"]').click();

  const addr1 = page.locator('//input[@id="vfb-13-address"]');
  await addr1.fill('Chandigarh University');
  await expect(addr1).toHaveValue('Chandigarh University');
  
  await page.locator('//input[@id="vfb-13-address-2"]').fill('NH-05, Ludhiana - Chandigarh Highway, Mohali, Punjab 140413, India');
  await page.locator('//input[@id="vfb-13-zip"]').fill('Mohali');

  const countryDropdown = page.locator('//span[@class="select2-selection select2-selection--single"]').first();
  await expect(countryDropdown).toBeVisible();
  await countryDropdown.click();
  await page.locator('//input[@class="select2-search__field"]').fill('india');
  await page.keyboard.press('Enter');
  await expect(page.locator('#select2-vfb-13-country-container')).toHaveAttribute('title', 'India');

  await page.locator('//input[@id="vfb-14"]').fill('haransingh@gmail.com');
  const dateInput = page.locator('//input[@id="vfb-18"]');
  await dateInput.fill('04/18/26');
  await expect(dateInput).toHaveValue('04/18/26');
  await page.locator('span[aria-labelledby*="hour-container"]').click();
  await page.locator('ul.select2-results__options li:has-text("04")').click();
  await expect(page.locator('#select2-vfb-16-hour-container')).toHaveText('04');

  await page.locator('span[aria-labelledby*="min-container"]').click();
  await page.locator('ul.select2-results__options li:has-text("20")').click();
  await expect(page.locator('#select2-vfb-16-min-container')).toHaveText('20');

  const phone = page.locator('//input[@id="vfb-19"]');
  await phone.fill('9988774455');
  await expect(phone).toHaveValue('9988774455');

  await page.locator('//textarea[@id="vfb-23"]').fill('this is a query');
  
  const captcha = page.locator('//input[@id="vfb-3"]');
  await captcha.fill('33');
  await expect(captcha).toHaveValue('33');

  const submit = page.locator('//input[@id="vfb-4"]');
  await expect(submit).toBeEnabled();
  await submit.click();

  await page.screenshot({path:'Screenshots/scenario2.png'});
  await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.90});

})