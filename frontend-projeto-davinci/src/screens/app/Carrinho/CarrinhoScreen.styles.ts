import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '@/constants/theme';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    list: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    contentContainer: {
        paddingHorizontal: SIZES.padding,
        paddingBottom: 200,
    },
    emptyCartContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.padding * 2,
    },
    emptyCartText: {
        ...FONTS.h3,
        color: COLORS.secondary,
        textAlign: 'center',
        marginTop: SIZES.padding,
        marginBottom: SIZES.padding * 2,
    },
    cartItemCard: {
        flexDirection: 'row',
        paddingVertical: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray_100,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray_100,
    },
    itemInfo: {
        flex: 1,
        marginLeft: SIZES.base,
        justifyContent: 'space-between',
    },
    itemName: {
        ...FONTS.body4, 
        color: COLORS.secondary,
        marginBottom: 4,
    },
    itemPriceUnit: {
        ...FONTS.body13,
        color: COLORS.gray_400,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.base,
    },
    quantityButton: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.gray_100,
        borderRadius: SIZES.radius,
    },
    itemQuantityText: {
        ...FONTS.h4,
        color: COLORS.secondary,
        marginHorizontal: SIZES.padding,
    },
    itemSubtotalContainer: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginLeft: SIZES.base,
    },
    itemSubtotal: {
        ...FONTS.h4,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
    removeButton: {
        padding: SIZES.base / 2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SIZES.padding,
        paddingBottom: SIZES.padding * 2,
        backgroundColor: COLORS.white,
        borderTopWidth: 1,
        borderTopColor: COLORS.gray_100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 10,
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.padding,
    },
    totalText: {
        ...FONTS.h3,
        color: COLORS.secondary,
    },
    totalValue: {
        ...FONTS.h2,
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});