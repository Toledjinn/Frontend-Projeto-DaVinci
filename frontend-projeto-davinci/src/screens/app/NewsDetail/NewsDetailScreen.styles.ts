import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: SIZES.padding * 1.5,
        paddingBottom: SIZES.padding * 12,
    },
    image: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: SIZES.radius,
        alignSelf: 'center',
        marginBottom: 8, 
    },
    title: {
        ...FONTS.h5,
        lineHeight: 30,
        color: COLORS.secondary,
        marginBottom: SIZES.base,
    },
    date: {
        ...FONTS.body13,
        color: COLORS.gray_400,
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.gray_100,
        width: '100%',
        marginVertical: 8, 
    },
    content: {
        ...FONTS.body9,
        lineHeight: 26,
        color: COLORS.secondary,
        textAlign: 'justify',
    },
    videoContainer: {
        width: '100%',
        aspectRatio: 16 / 9,
        borderRadius: SIZES.radius,
        overflow: 'hidden',
        marginTop: SIZES.padding,
    },
    video: {
        flex: 1,
    },
    notFoundContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    titleNotFound: {
        ...FONTS.h2,
        color: COLORS.secondary,
        textAlign: 'center',
    },
});