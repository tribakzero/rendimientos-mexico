const puppeteer = require('puppeteer');

export const scrapePage = async (config) => {
  const { internalUrl, url, getContent, getSolution } = config;

  const browser = await puppeteer.launch({
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--no-zygote",
    ],
    headless: "new",
    executablePath: process.env.NODE_ENV === 'production' ? '/usr/bin/google-chrome' : puppeteer.executablePath(),
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.emulateTimezone('UTC');
  await page.goto(internalUrl || url);
  const content = await page.evaluate(getContent);
  await browser.close();
  return getSolution ? getSolution(content) : content;
};
