import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/components/features/CollapsiblePeriogramItem/styles';
import type { SavedPeriogram } from '@/data/mockPeriograms';

const upperArchTeeth = [18,17,16,15,14,13,12,11,21,22,23,24,25,26,27,28];
const lowerArchTeeth = [48,47,46,45,44,43,42,41,31,32,33,34,35,36,37,38];
const columns = ['MV','V','DV','MP/ML','P/L','DP/DL','RE-V','RE-P/L','MO','FM','FV','FL','M-CER'];

function hasDataForTooth(map: any) {
  if (!map) return false;
  return Object.values(map).some((v) => String(v ?? '').trim() !== '');
}

function hasUpper(per: SavedPeriogram) {
  return upperArchTeeth.some((t) => hasDataForTooth(per.data[t]));
}
function hasLower(per: SavedPeriogram) {
  return lowerArchTeeth.some((t) => hasDataForTooth(per.data[t]));
}

const ToothDetail = ({ toothNumber, data }: { toothNumber: number; data: any }) => {
  const filled = columns.filter((c) => data?.[c]);
  if (!filled.length) return null;

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.toothTitle}>Dente {toothNumber}</Text>
      <View style={styles.grid}>
        {filled.map((col) => {
          const value = data[col];
          const numericValue = parseFloat(value);
          const textStyle = isNaN(numericValue) ? styles.textNormal : (numericValue > 3 ? styles.textAlert : styles.textNormal);
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

export default function PeriogramContent({ periogram }: { periogram: SavedPeriogram }) {
  const showUpper = hasUpper(periogram);
  const showLower = hasLower(periogram);

  return (
    <View>
      {showUpper && (
        <>
          <Text style={styles.sectionTitle}>Arco Superior</Text>
          {upperArchTeeth.map((t) => (
            <ToothDetail key={t} toothNumber={t} data={periogram.data[t] || {}} />
          ))}
        </>
      )}

      {showLower && (
        <>
          <Text style={styles.sectionTitle}>Arco Inferior</Text>
          {lowerArchTeeth.map((t) => (
            <ToothDetail key={t} toothNumber={t} data={periogram.data[t] || {}} />
          ))}
        </>
      )}
    </View>
  );
}
