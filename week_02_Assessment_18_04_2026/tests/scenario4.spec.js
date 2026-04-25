import {test,expect} from "@playwright/test";
import excel from "exceljs";

test('flipkart scenario',async ({browser}) => {

  const context =await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://www.flipkart.com/');
  await expect(page).toHaveURL(/flipkart/);

  await expect(page.locator('//div[text()="Home"]')).toBeVisible();
  await page.locator('//div[text()="Home"]').click();

  const ele = await page.locator('//div[@class="grid-formation grid-column-2"]').first();
  await expect(ele).toBeVisible();
  await expect(ele).toBeEnabled();
  await ele.scrollIntoViewIfNeeded();
  await ele.click();

  let checkboxx = await page.locator('//div[@class="ybaCDx"]').first();
  await expect(checkboxx).toBeVisible();
  await expect(ele).toBeEnabled();
  await checkboxx.click();

  await expect(page.locator('//div[@class="WNv7PR" and text()="Price -- Low to High"]')).toBeVisible();
  await expect(page.locator('//div[@class="WNv7PR" and text()="Price -- Low to High"]')).toBeEnabled();
  await page.locator('//div[@class="WNv7PR" and text()="Price -- Low to High"]').click();

  const [newPage] = await Promise.all([page.waitForEvent('popup')
    ,page.locator('//div[@class="RGLWAk"]').nth(5).click()]);

  const title = await newPage.locator('//div[@class="asbjxx"]/descendant::h1').textContent();
  const price = await newPage.locator('//div[@class="_1psv1zeb9 _1psv1ze0"]/descendant::div[@class="v1zwn21l v1zwn20 _1psv1zeb9 _1psv1ze0"]').textContent();

  expect(title).not.toBeNull();
  expect(title.trim().length).toBeGreaterThan(0);

  expect(price).not.toBeNull();

  console.log(`price of ${title} is ${price}`);

  await expect(newPage.locator('//div[@class="grid-formation grid-column-2"]/descendant::div[text()="Add to cart"]')).toBeVisible();
  await newPage.locator('//div[@class="grid-formation grid-column-2"]/descendant::div[text()="Add to cart"]').click();

  let book = new excel.Workbook();
  await book.xlsx.readFile('C:/Users/dipan/OneDrive/Desktop/playwright_Assessments/week_02_Assessment_18_04_2026/flipkart.xlsx');
  let sheet = book.getWorksheet("Flipkart Data");

  if (!sheet) {
    sheet = book.addWorksheet("Flipkart Data");
  }

  sheet.getRow(1).getCell(1).value = 'Product Name';
  sheet.getRow(1).getCell(2).value = 'Price';
  sheet.getRow(2).getCell(1).value = title;
  sheet.getRow(2).getCell(2).value = price;

  await book.xlsx.writeFile('C:/Users/dipan/OneDrive/Desktop/playwright_Assessments/week_02_Assessment_18_04_2026/flipkart.xlsx');

  expect(sheet.getRow(2).getCell(1).value).toBe(title);
  expect(sheet.getRow(2).getCell(2).value).toBe(price);

})