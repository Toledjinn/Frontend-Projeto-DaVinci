import { Stack, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import Header from '@/components/common/Header';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mantém a splash screen nativa visível automaticamente
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
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden'); 
    }
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);
  
  // --- MELHORIA PRINCIPAL ---
  // Esconde a splash screen nativa APENAS quando as fontes estiverem carregadas
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Se as fontes ainda não carregaram, não renderiza nada (a splash nativa ainda está visível)
  if (!loaded) {
    return null;
  }

 return (
  <SafeAreaProvider>
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false, 
          // Animação 'none' é ideal para deixar a sharedTransitionTag controlar a animação
          animation: 'none', 
        }} 
      />
      <Stack.Screen name="(auth)" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
      <Stack.Screen name="(app)" options={{ headerShown: false, animation: 'fade_from_bottom' }} />
    </Stack>
    {(inAppLayout || inAuthHeaderScreens) && <Header />}
  </SafeAreaProvider>
  );
}

