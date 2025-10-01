import { useEffect, useCallback } from 'react';
import { AppState, Keyboard, Platform } from 'react-native';
import { useFocusEffect } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';

async function hideBarsEdgeToEdge() {
  await NavigationBar.setVisibilityAsync('hidden');           
}

export function useImmersiveBars() {
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return;
      hideBarsEdgeToEdge();

      const appStateSub = AppState.addEventListener('change', s => {
        if (s === 'active') hideBarsEdgeToEdge();
      });
      const k1 = Keyboard.addListener('keyboardDidHide', hideBarsEdgeToEdge);
      const k2 = Keyboard.addListener('keyboardDidShow', hideBarsEdgeToEdge);

      return () => {
        appStateSub.remove();
        k1.remove(); k2.remove();
        NavigationBar.setVisibilityAsync('visible');
      };
    }, [])
  );

  useEffect(() => {
    if (Platform.OS === 'android') hideBarsEdgeToEdge();
  }, []);
}
