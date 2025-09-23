import { FlatList } from 'react-native';
import UserListItem from '../UserListItem';
import { SvgProps } from 'react-native-svg';

export type User = {
  id: string;
  name: string;
  detailLine1?: string;
  detailLabel?: string;
  detailValue?: string;
  image: React.FC<SvgProps> | null;
  hasAllergies?: boolean; 
  specialties?: string[];
  role?: string;
};

type UserListProps = {
  data: User[];
};

export default function UserList({ data }: UserListProps) {
  const renderItem = ({ item }: { item: User }) => (
    <UserListItem item={item} />
  );

  return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false} 
      />
  );
}
