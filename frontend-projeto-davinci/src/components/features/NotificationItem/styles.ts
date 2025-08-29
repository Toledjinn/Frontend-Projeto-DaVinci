// src/components/features/NotificationItem/styles.ts

import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '@/constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.gray_200,
    paddingVertical: 12, 
    paddingHorizontal: 16, // Aumentado para mais espaço
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 2,
  },
  dateTimeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 16, // Aumentado para mais espaço
    borderRightWidth: 1,
    borderRightColor: COLORS.gray_200,
  },
  dateText: {
    ...FONTS.body8,
    color: COLORS.secondary, // Alterado para a cor secundária
  },
  timeText: {
    ...FONTS.body11,
    color: COLORS.gray_400, // Alterado para um cinza mais claro
  },
  textContainer: {
    flex: 1,
    paddingLeft: 16, // Aumentado para mais espaço
  },
  notificationText: {
    ...FONTS.body11,
    color: COLORS.secondary,
    textAlign: 'left',
    lineHeight: 18, // Adicionado para melhor legibilidade
  },
});
