import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    ...FONTS.body1,
    color: COLORS.secondary,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
  },
  section: {
    marginTop: 16,
    alignItems: 'flex-start',
  },
  subSectionTitle: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray_100,
    width: '100%',
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonInRow: {
    flex: 1,
  },
  listItem: {
    ...FONTS.body10,
    color: COLORS.gray_400,
    marginLeft: 8,
    marginBottom: 4,
    lineHeight: 20, 
    
  },
  procedureTitle: {
    ...FONTS.body4,
    color: COLORS.secondary,
  },
  riskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riskText: {
    ...FONTS.body7,
    marginLeft: 8,
  }
});