import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, TextInput, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCitiesApi, getDistrictsApi } from '../apis/services/locationService';


function SelectModal({ visible, title, data, loading, onSelect, onClose }) {
  const [search, setSearch] = useState('');

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Reset search khi đóng/mở lại
  useEffect(() => {
    if (!visible) setSearch('');
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={m.overlay}>
        <View style={m.sheet}>

          {/* Handle bar */}
          <View style={m.handle} />

          {/* Header */}
          <View style={m.sheetHeader}>
            <Text style={m.sheetTitle}>{title}</Text>
            <TouchableOpacity style={m.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Search inside modal */}
          <View style={m.modalSearch}>
            <Ionicons name="search-outline" size={16} color="#94A3B8" />
            <TextInput
              style={m.modalSearchInput}
              placeholder="Tìm kiếm..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')}>
                <Ionicons name="close-circle" size={16} color="#94A3B8" />
              </TouchableOpacity>
            )}
          </View>

          {/* List */}
          {loading ? (
            <View style={m.loadingWrapper}>
              <ActivityIndicator color="#3B82F6" />
              <Text style={m.loadingText}>Đang tải...</Text>
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={m.listItem}
                  onPress={() => { onSelect(item); setSearch(''); }}
                >
                  <Text style={m.listItemText}>{item.name}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#475569" />
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={m.separator} />}
              ListEmptyComponent={
                <Text style={m.emptyText}>Không tìm thấy kết quả</Text>
              }
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

// ── LocationPicker (exported) ─────────────────────────────────────────────────
export default function LocationPicker({ value, onChange }) {
  const { city, district } = value;

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [districtModalVisible, setDistrictModalVisible] = useState(false);

  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);


  const handleOpenCityModal = useCallback(async () => {
    setCityModalVisible(true);
    if (cities.length > 0) return;
    try {
      setLoadingCities(true);
      const data = await getCitiesApi()
      setCities(data);
    } catch (err) {
      console.log('fetchCities error:', err);
    } finally {
      setLoadingCities(false);
    }
  }, [cities.length]);

  const handleSelectCity = useCallback(async (selectedCity) => {
    setCityModalVisible(false);
    setDistricts([]);
    onChange({ city: selectedCity, district: null });

    try {
      setLoadingDistricts(true);
      setDistrictModalVisible(true);
      const data = await getDistrictsApi(selectedCity.id);
      setDistricts(data);
    } catch (err) {
      console.log('fetchDistricts error:', err);
    } finally {
      setLoadingDistricts(false);
    }
  }, [onChange]);

  const handleSelectDistrict = useCallback((selectedDistrict) => {
    setDistrictModalVisible(false);
    onChange({ city, district: selectedDistrict });
  }, [city, onChange]);

  const handleClear = useCallback(() => {
    onChange({ city: null, district: null });
  }, [onChange]);

  const hasValue = city !== null;

  return (
    <View>
      <TouchableOpacity style={p.trigger} onPress={handleOpenCityModal}>
        <View style={p.triggerLeft}>
          <Ionicons name="location-outline" size={18} color={hasValue ? '#2563EB' : '#94A3B8'} />
          <Text style={[p.triggerText, hasValue && p.triggerTextActive]} numberOfLines={1}>
            {city
              ? district
                ? `${district.name}, ${city.name}`
                : city.name
              : 'Chọn tỉnh / thành phố'}
          </Text>
        </View>

        {hasValue ? (
          <TouchableOpacity onPress={handleClear} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name="close-circle" size={18} color="#94A3B8" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="chevron-down" size={16} color="#94A3B8" />
        )}
      </TouchableOpacity>

      <SelectModal
        visible={cityModalVisible}
        title="Chọn tỉnh / thành phố"
        data={cities}
        loading={loadingCities}
        onSelect={handleSelectCity}
        onClose={() => setCityModalVisible(false)}
      />

      <SelectModal
        visible={districtModalVisible}
        title={city ? `Quận / huyện — ${city.name}` : 'Chọn quận / huyện'}
        data={districts}
        loading={loadingDistricts}
        onSelect={handleSelectDistrict}
        onClose={() => setDistrictModalVisible(false)}
      />
    </View>
  );
}


const p = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
    marginBottom: 10,
  },
  triggerLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  triggerText: { marginLeft: 8, color: '#94A3B8', fontSize: 14, flex: 1 },
  triggerTextActive: { color: '#0F172A', fontWeight: '600' },
});

const m = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: 34,
    maxHeight: '75%',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 4,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sheetTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '700' },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 14,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  modalSearchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  listItemText: { color: '#E2E8F0', fontSize: 15 },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 20 },
  loadingWrapper: { alignItems: 'center', paddingVertical: 40, gap: 12 },
  loadingText: { color: '#64748B', fontSize: 14 },
  emptyText: { color: '#475569', fontSize: 14, textAlign: 'center', paddingVertical: 32 },
});