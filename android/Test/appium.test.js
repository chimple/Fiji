import wd from 'wd';
// import Dimensions from 'Dimensions';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
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
  await driver.sleep(20000); // wait for app to load
})


// test('Get height & width',async()=>{
//   await driver.sleep(25000)
//   let {width, height} = Dimensions.get('screen')
//   console.log(width,height)
//   });
      
//       test('swipe in chat',async()=>{
//         await driver.sleep(13000)
//         let {width, height} = Dimensions.get('screen')
//    const action = new wd.TouchAction(driver);
//         action.press({ x: width, y: height }).wait(1000).moveTo({ x: width, y: height/2 }).release();
//         driver.performTouchAction(action); 
  
//   });
  




test('touchAction', async () => {
  await driver.sleep(15000);
  action.press({ x: 375 , y: 1765 }).wait(500).moveTo({ x: 345 , y: 100 }).release();
  driver.performTouchAction(action);

});


test('add user', async () => {
  await driver.sleep(10000);
  expect(await driver.hasElementByAccessibilityId('ADD-USER')).toBe(true);
   await driver.elementByAccessibilityId('ADD-USER').click();

})

test('save pic', async () => {
  await driver.sleep(15000);
  expect(await driver.hasElementByAccessibilityId('CHECK')).toBe(true);
   await driver.elementByAccessibilityId('CHECK').click();

});
