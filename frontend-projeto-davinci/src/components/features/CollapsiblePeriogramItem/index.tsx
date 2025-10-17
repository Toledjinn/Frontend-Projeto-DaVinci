import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { styles } from './styles';
import { COLORS } from '@/constants/theme';
import { SavedPeriogram } from '@/data/mockPeriograms';

type CollapsiblePeriogramItemProps = {
  item: SavedPeriogram;
  isOpen: boolean;
  onToggle: () => void;
  canEdit?: boolean;
  onEdit?: () => void;
};

const upperArchTeeth = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
const lowerArchTeeth = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];
const columns = ['MV', 'V', 'DV', 'MP/ML', 'P/L', 'DP/DL', 'RE-V', 'RE-P/L', 'MO', 'FM', 'FV', 'FL', 'M-CER'];

const ToothDetail = ({ toothNumber, data }: { toothNumber: number; data: any }) => {
  const filledColumns = columns.filter(col => data?.[col]);
  if (filledColumns.length === 0) return null;

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.toothTitle}>Dente {toothNumber}</Text>
      <View style={styles.grid}>
        {filledColumns.map(col => {
          const value = data[col];
          const numericValue = parseFloat(value);
          const textStyle = numericValue > 3 ? styles.textAlert : styles.textNormal;
          return (
            <View key={col} style={styles.cellContainer}>
              <View style={styles.labelContainer}>
                <Text style={styles.labelText}>{col}</Text>
              </View>
              <View style={styles.valueContainer}>
                <Text style={[styles.valueText, textStyle]}>{value}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default function CollapsiblePeriogramItem({
  item,
  isOpen,
  onToggle,
  canEdit = false,
  onEdit,
}: CollapsiblePeriogramItemProps) {
  const handleEditPress = (e: any) => {
    e.stopPropagation(); 
    if (onEdit) onEdit();
  };

  const hasUpperData = upperArchTeeth.some(
    t => item.data[t] && Object.values(item.data[t]).some(v => String(v).trim() !== '')
  );
  const hasLowerData = lowerArchTeeth.some(
    t => item.data[t] && Object.values(item.data[t]).some(v => String(v).trim() !== '')
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={onToggle} activeOpacity={0.7}>
        <View style={styles.infoContainer}>
          <Text style={styles.dateText}>Data: {item.date}</Text>
          <Text style={styles.dentistText}>Responsável: {item.dentistName}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {canEdit && (
            <TouchableOpacity
              onPress={handleEditPress}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ marginRight: 6, padding: 4 }}
            >
              <Feather name="edit-3" size={20} color={COLORS.secondary} />
            </TouchableOpacity>
          )}
          <Feather
            name={isOpen ? 'chevron-up' : 'chevron-down'}
            size={28}
            color={COLORS.gray_400}
          />
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.content}>
          {hasUpperData && (
            <>
              <Text style={styles.sectionTitle}>Arco Superior</Text>
              {upperArchTeeth.map(tooth => (
                <ToothDetail key={tooth} toothNumber={tooth} data={item.data[tooth] || {}} />
              ))}
            </>
          )}

          {hasLowerData && (
            <>
              <Text style={styles.sectionTitle}>Arco Inferior</Text>
              {lowerArchTeeth.map(tooth => (
                <ToothDetail key={tooth} toothNumber={tooth} data={item.data[tooth] || {}} />
              ))}
            </>
          )}
        </View>
      )}
    </View>
  );
}
