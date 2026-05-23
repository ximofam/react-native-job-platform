import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, Modal, Text, TouchableOpacity, View } from "react-native";
import s, { COLORS } from '../../../styles/employerScreenStyles';

export default function DropdownModal({ visible, title, items, selected, onSelect, onClose, loading }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableOpacity
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' }}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1}>
          <View style={{
            backgroundColor: COLORS.surfaceHigh,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderTopWidth: 1,
            borderColor: COLORS.border,
            maxHeight: 420,
          }}>
            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              padding: 18, borderBottomWidth: 1, borderBottomColor: COLORS.border,
            }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: COLORS.textPrimary }}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={22} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
            {loading ? (
              <View style={{ padding: 32, alignItems: 'center' }}>
                <ActivityIndicator color={COLORS.purple} />
              </View>
            ) : (
              <FlatList
                data={items}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => {
                  const active = selected === item.id;
                  return (
                    <TouchableOpacity
                      style={[s.dropdownItem, active && s.dropdownItemActive]}
                      onPress={() => { onSelect(item); onClose(); }}
                      activeOpacity={0.75}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        {active && <Ionicons name="checkmark-circle" size={16} color={COLORS.purple} />}
                        <Text style={[s.dropdownItemText, active && s.dropdownItemTextActive]}>
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}