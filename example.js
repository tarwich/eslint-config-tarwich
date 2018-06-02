require('chromedriver');
const webdriver = require('selenium-webdriver');
const { Builder } = require('selenium-webdriver');

const chromeCapabilities = webdriver.Capabilities.chrome();
const chromeOptions = {
  args: ['--user-data-dir=/Users/jacobmyers/projects/imb-scraper/tmp/userDataDir']
};
chromeCapabilities.set('chromeOptions', chromeOptions);
const driver = new Builder()
    .forBrowser('chrome')
    .withCapabilities(chromeCapabilities)
    .build();

process.on('unhandledRejection', error => {
  console.error(Error.stack || error);
});

const execute = async function(driver) {
  try {
    // await logIn(driver);
    // await openSidebarMenuOption('Admin', 'Sites', driver);
    driver.quit();
    console.log('success');
  }
catch (err) {
    console.log(err);
  }
};

execute(driver);
