import { Stack, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Header from '@/components/common/Header';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Poppins-Bold': require('../src/assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('../src/assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Medium': require('../src/assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Regular': require('../src/assets/fonts/Poppins-Regular.ttf'),
    'trajan-pro-3-bold': require('../src/assets/fonts/trajan-pro-3-bold.otf'),
    'TrajanPro3Semibold': require('../src/assets/fonts/TrajanPro3SemiBold.ttf'),
  });

  const segments = useSegments();
  const inAppLayout = segments[0] === '(app)';
  const inAuthHeaderScreens = 
    segments[0] === '(auth)' && 
    ['forgot-password', 'change-password'].includes(segments[1]);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

 return (
  <>
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="(app)" options={{ headerShown: false, animation: 'fade' }} />
    </Stack>
    {(inAppLayout || inAuthHeaderScreens) && <Header />}
  </>

  );
}
