import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import s from '../styles/postJobStyles';
import { COLORS } from '../styles/common';


export default function SelectBtn({ label, value, onPress, loading }) {
  const filled = !!value;
  return (
    <TouchableOpacity
      style={[s.selectBtn, filled && s.selectBtnActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={COLORS.purple} style={{ marginRight: 8 }} />
      ) : (
        <Ionicons
          name={filled ? 'checkmark-circle' : 'chevron-down'}
          size={18}
          color={filled ? COLORS.purple : COLORS.textMuted}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[s.selectBtnText, filled && s.selectBtnTextFilled]}>
        {value || label}
      </Text>
      {filled && (
        <Ionicons name="chevron-down" size={16} color={COLORS.textMuted} />
      )}
    </TouchableOpacity>
  );
}