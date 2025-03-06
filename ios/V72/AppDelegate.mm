#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import <GoogleMaps/GoogleMaps.h>

#import "RNSplashScreen.h"  // splash screen 패키지 추가

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [GMSServices provideAPIKey:@"AIzaSyAXkty35QHx5mnl4YktmaKXmuZ44XjkH7g"]; // add this line using the api key obtained from Google Console

  self.moduleName = @"V72";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  // return [super application:application didFinishLaunchingWithOptions:launchOptions];

  [super application:application didFinishLaunchingWithOptions:launchOptions];

  // 스플래시 화면 표시
  [RNSplashScreen show];  // 기본 스플래시 화면 표시

  // 또는 커스텀 스플래시 화면을 사용하려면 다음을 사용할 수 있습니다:
  // [RNSplashScreen showSplash:@"LaunchScreen" inRootView:rootView];

  return YES;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
