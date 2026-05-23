import { Text, TouchableOpacity, View } from "react-native";
import s from '../../../styles/employerScreenStyles';

export default function TagSelector({ options, value, onChange }) {
  return (
    <View style={s.tagRow}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <TouchableOpacity
            key={opt.value}
            style={[s.tag, active && s.tagActive]}
            onPress={() => onChange(active ? '' : opt.value)}
            activeOpacity={0.75}
          >
            <Text style={[s.tagText, active && s.tagTextActive]}>{opt.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}