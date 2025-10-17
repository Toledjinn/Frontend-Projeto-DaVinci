import AsyncStorage from '@react-native-async-storage/async-storage';
import type { PageName, SocialContent } from '@/state/socialStore';

const SOCIAL_DB_ALL_PAGES_KEY = 'db:social:pages:v1';

export type SocialPagesRecord = Record<PageName, SocialContent[]>;

export async function loadAllSocialPages(): Promise<SocialPagesRecord | null> {
  try {
    const raw = await AsyncStorage.getItem(SOCIAL_DB_ALL_PAGES_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as SocialPagesRecord;
    return parsed;
  } catch (e) {
    console.warn('[socialDb] loadAllSocialPages error:', e);
    return null;
  }
}

export async function saveAllSocialPages(pages: SocialPagesRecord): Promise<void> {
  try {
    await AsyncStorage.setItem(SOCIAL_DB_ALL_PAGES_KEY, JSON.stringify(pages));
  } catch (e) {
    console.warn('[socialDb] saveAllSocialPages error:', e);
  }
}

export async function saveSocialPage(
  page: PageName,
  content: SocialContent[]
): Promise<void> {
  try {
    const current = (await loadAllSocialPages()) ?? ({} as SocialPagesRecord);
    const next = { ...current, [page]: content } as SocialPagesRecord;
    await saveAllSocialPages(next);
  } catch (e) {
    console.warn('[socialDb] saveSocialPage error:', e);
  }
}
