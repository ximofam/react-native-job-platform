import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import s from '../styles/postJobStyles';
import { COLORS } from '../styles/common';

export default function PackageCard({ pkg, selected, onSelect }) {
  const isPriority = pkg.id === 'PRIORITY';
  return (
    <TouchableOpacity
      style={[
        s.packageCard,
        isPriority
          ? selected ? s.packageCardPrioritySelected : s.packageCardPriority
          : selected && s.packageCardSelected,
      ]}
      onPress={() => onSelect(pkg.id)}
      activeOpacity={0.85}
    >
      {/* Selected indicator */}
      <View style={[
        s.packageSelectIndicator,
        selected && (isPriority ? s.packageSelectIndicatorAmber : s.packageSelectIndicatorActive),
      ]}>
        {selected && <Ionicons name="checkmark" size={13} color="#FFF" />}
      </View>

      <View style={[s.packageBadge, { backgroundColor: pkg.badgeBg }]}>
        <Text style={[s.packageBadgeText, { color: pkg.badgeColor }]}>{pkg.badge}</Text>
      </View>

      <Text style={s.packageTitle}>{pkg.title}</Text>
      <Text style={[s.packagePrice, { color: pkg.priceColor }]}>{pkg.price}</Text>

      {pkg.features.map((f) => (
        <View key={f.text} style={s.packageFeatureRow}>
          <Ionicons
            name={f.icon}
            size={15}
            color={f.icon.includes('close') ? COLORS.textMuted : pkg.priceColor}
          />
          <Text style={[
            s.packageFeatureText,
            f.icon.includes('close') && { color: COLORS.textMuted, textDecorationLine: 'line-through' },
          ]}>
            {f.text}
          </Text>
        </View>
      ))}
    </TouchableOpacity>
  );
}