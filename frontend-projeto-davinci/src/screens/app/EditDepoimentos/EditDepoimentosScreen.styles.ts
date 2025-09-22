import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    width: '100%',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 250,
    paddingBottom: 120,
  },
  editorCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    ...FONTS.body5,
    color: COLORS.secondary,
    flex: 1, 
  },
  removeButton: {
    padding: 8,
  },
  cardContent: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray_100,
    marginTop: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.secondary,
    marginBottom: 8,
  },
  textInput: {
    ...FONTS.body9,
    color: COLORS.secondary,
    textAlignVertical: 'top',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    backgroundColor: COLORS.white,
    marginTop: 8,
  },
  addButtonText: {
    ...FONTS.body7,
    color: COLORS.secondary,
    marginLeft: 8,
  },
});
