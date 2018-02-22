import wd from 'wd';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 40000;
const PORT = 4723;
const config = {
  platformName: 'Android',
  deviceName: 'emulator-5554',
  app: './android/app/build/outputs/apk/app-debug.apk' // relative to root of project
};
const driver = wd.promiseChainRemote('localhost', PORT);

var action = new wd.TouchAction(driver);

beforeAll(async () => {
  await driver.init(config);
  await driver.sleep(15000); // wait for app to load
})

test('touchAction', async () => {
    await driver.sleep(20000);
    action.press({ x: 375 , y: 1750 }).wait(1000).moveTo({ x: 345 , y: 100 }).release();
    driver.performTouchAction(action);

});
  
test('add user', async () => {
  await driver.sleep(15000);
  expect(await driver.hasElementByAccessibilityId('ADD-USER')).toBe(true);
   await driver.elementByAccessibilityId('ADD-USER').click();

});

test('save pic', async () => {
  await driver.sleep(15000);
  expect(await driver.hasElementByAccessibilityId('CHECK')).toBe(true);
   await driver.elementByAccessibilityId('CHECK').click();

});
