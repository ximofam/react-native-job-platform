import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import s, { COLORS } from '../../styles/employerScreenStyles';
import UserContext from '../../contexts/userContext';

const EMPLOYEE_SIZE_LABEL = {
  STARTUP: 'Startup (< 50)',
  SMALL: 'Nhỏ (50–200)',
  MEDIUM: 'Vừa (200–500)',
  LARGE: 'Lớn (500–2000)',
  ENTERPRISE: 'Doanh nghiệp lớn',
};

const COMPANY_TYPE_LABEL = {
  PRODUCT: 'Product',
  OUTSOURCE: 'Outsource',
  HYBRID: 'Hybrid',
};

const LOCATION_LABEL = {
  HEADQUARTERS: 'Trụ sở chính',
  BRANCH: 'Chi nhánh',
  REMOTE: 'Remote',
};

const MENU_ITEMS = [
  { icon: 'briefcase-outline', iconColor: COLORS.purple, bg: COLORS.purpleDim, label: 'Tin đăng của tôi' },
  { icon: 'star-outline', iconColor: COLORS.amber, bg: COLORS.amberDim, label: 'Đánh giá công ty' },
  { icon: 'card-outline', iconColor: COLORS.blue, bg: COLORS.blueDim, label: 'Gói dịch vụ' },
  { icon: 'bar-chart-outline', iconColor: COLORS.green, bg: COLORS.greenDim, label: 'Thống kê tuyển dụng' },
];

const SETTINGS_ITEMS = [
  { icon: 'notifications-outline', iconColor: COLORS.amber, bg: COLORS.amberDim, label: 'Thông báo' },
  { icon: 'shield-checkmark-outline', iconColor: COLORS.green, bg: COLORS.greenDim, label: 'Bảo mật & Quyền riêng tư' },
  { icon: 'help-circle-outline', iconColor: COLORS.blue, bg: COLORS.blueDim, label: 'Hỗ trợ & Trợ giúp' },
];

export default function ProfileScreen() {
  const { user, logout } = useContext(UserContext);

  const fullName = `${user?.first_name ?? ''} ${user?.last_name ?? ''}`.trim();
  const company = user?.profile?.company;
  const companyInitial = (company?.name ?? fullName ?? '?')[0].toUpperCase();
  const primaryLocation = company?.locations?.find((l) => l.is_primary) ?? company?.locations?.[0];
  const branchCount = company?.locations?.filter((l) => !l.is_primary).length ?? 0;

  return (
    <LinearGradient colors={['#060813', '#0C0F1E', '#111527']} style={s.container}>
      <SafeAreaView style={s.safeArea}>
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.pageTitle}>Hồ sơ</Text>
          <Text style={s.pageSubtitle}>Thông tin cá nhân & công ty</Text>

          {/* Company hero banner */}
          <LinearGradient colors={['#3B1F6B', '#1E1240']} style={s.heroBanner}>
            <View style={s.heroBannerInner}>
              <View style={s.heroRow}>
                {company?.logo_url ? (
                  <Image source={{ uri: company.logo_url }} style={s.companyLogo} />
                ) : (
                  <View style={s.companyLogoFallback}>
                    <Text style={s.companyLogoText}>{companyInitial}</Text>
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <Text style={s.companyName}>{company?.name ?? 'Tên công ty'}</Text>
                  <Text style={s.companyTagline} numberOfLines={2}>
                    {company?.description ?? 'Chưa có mô tả công ty'}
                  </Text>
                </View>
              </View>

              <View style={s.heroDivider} />

              <View style={s.heroBadgeRow}>
                {primaryLocation && (
                  <View style={s.heroBadge}>
                    <Ionicons name="location-outline" size={13} color="rgba(255,255,255,0.7)" />
                    <Text style={s.heroBadgeText} numberOfLines={1}>
                      {primaryLocation.address.split(',').slice(-2).join(',').trim()}
                    </Text>
                  </View>
                )}
                <View style={s.heroBadge}>
                  <Ionicons name="people-outline" size={13} color="rgba(255,255,255,0.7)" />
                  <Text style={s.heroBadgeText}>
                    {EMPLOYEE_SIZE_LABEL[company?.employee_size] ?? company?.employee_size ?? '—'}
                  </Text>
                </View>
                <View style={s.heroBadge}>
                  <Ionicons name="code-slash-outline" size={13} color="rgba(255,255,255,0.7)" />
                  <Text style={s.heroBadgeText}>
                    {COMPANY_TYPE_LABEL[company?.type] ?? company?.type ?? '—'}
                  </Text>
                </View>
                {company?.country && (
                  <View style={s.heroBadge}>
                    <Image
                      source={{ uri: company.country.image_url }}
                      style={{ width: 14, height: 14, borderRadius: 7 }}
                    />
                    <Text style={s.heroBadgeText}>{company.country.name}</Text>
                  </View>
                )}
              </View>
            </View>
          </LinearGradient>

          {/* Company details card */}
          <View style={s.infoCard}>
            <Text style={s.infoCardTitle}>Thông tin công ty</Text>

            {[
              {
                icon: 'business-outline',
                color: COLORS.purple,
                bg: COLORS.purpleDim,
                label: 'Tên công ty',
                value: company?.name ?? '—',
              },
              {
                icon: 'receipt-outline',
                color: COLORS.blue,
                bg: COLORS.blueDim,
                label: 'Mã số thuế',
                value: company?.tax_code ?? '—',
              },
              {
                icon: 'layers-outline',
                color: COLORS.amber,
                bg: COLORS.amberDim,
                label: 'Loại hình',
                value: COMPANY_TYPE_LABEL[company?.type] ?? company?.type ?? '—',
              },
              {
                icon: 'checkmark-circle-outline',
                color: COLORS.green,
                bg: COLORS.greenDim,
                label: 'Trạng thái',
                value: company?.status === 'APPROVED' ? 'Đã xác minh ✓' : company?.status ?? '—',
                isLast: true,
              },
            ].map((item) => (
              <View key={item.label} style={[s.infoRow, item.isLast && s.infoRowLast]}>
                <View style={[s.infoIconBox, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.infoLabel}>{item.label}</Text>
                  <Text style={s.infoValue}>{item.value}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Locations card */}
          {company?.locations?.length > 0 && (
            <View style={s.infoCard}>
              <Text style={s.infoCardTitle}>
                Địa điểm ({company.locations.length})
                {branchCount > 0 ? ` · ${branchCount} chi nhánh` : ''}
              </Text>

              {company.locations.map((loc, idx) => (
                <View
                  key={loc.id}
                  style={[s.infoRow, idx === company.locations.length - 1 && s.infoRowLast]}
                >
                  <View style={[s.infoIconBox, { backgroundColor: loc.is_primary ? COLORS.purpleDim : COLORS.blueDim }]}>
                    <Ionicons
                      name={loc.is_primary ? 'home-outline' : 'location-outline'}
                      size={18}
                      color={loc.is_primary ? COLORS.purple : COLORS.blue}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={s.infoLabel}>{LOCATION_LABEL[loc.label] ?? loc.label}</Text>
                    <Text style={s.infoValue} numberOfLines={2}>{loc.address}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Personal info */}
          <View style={s.infoCard}>
            <Text style={s.infoCardTitle}>Thông tin cá nhân</Text>

            {[
              {
                icon: 'person-outline',
                color: COLORS.purple,
                bg: COLORS.purpleDim,
                label: 'Họ và tên',
                value: fullName || '—',
              },
              {
                icon: 'at-outline',
                color: COLORS.blue,
                bg: COLORS.blueDim,
                label: 'Tên đăng nhập',
                value: user?.username ?? '—',
              },
              {
                icon: 'mail-outline',
                color: COLORS.green,
                bg: COLORS.greenDim,
                label: 'Email',
                value: user?.email ?? '—',
              },
              {
                icon: 'transgender-outline',
                color: COLORS.amber,
                bg: COLORS.amberDim,
                label: 'Giới tính',
                value: user?.gender === 'MALE' ? 'Nam' : user?.gender === 'FEMALE' ? 'Nữ' : '—',
                isLast: true,
              },
            ].map((item) => (
              <View key={item.label} style={[s.infoRow, item.isLast && s.infoRowLast]}>
                <View style={[s.infoIconBox, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.infoLabel}>{item.label}</Text>
                  <Text style={s.infoValue}>{item.value}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </View>
            ))}
          </View>

          {/* Quick actions */}
          <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Quản lý</Text>
          <View style={s.menuCard}>
            {MENU_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                style={[s.menuItem, idx === MENU_ITEMS.length - 1 && s.menuItemLast]}
                activeOpacity={0.75}
              >
                <View style={[s.menuItemIconBox, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={18} color={item.iconColor} />
                </View>
                <Text style={s.menuItemLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Settings */}
          <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Cài đặt</Text>
          <View style={s.menuCard}>
            {SETTINGS_ITEMS.map((item, idx) => (
              <TouchableOpacity
                key={item.label}
                style={[s.menuItem, idx === SETTINGS_ITEMS.length - 1 && s.menuItemLast]}
                activeOpacity={0.75}
              >
                <View style={[s.menuItemIconBox, { backgroundColor: item.bg }]}>
                  <Ionicons name={item.icon} size={18} color={item.iconColor} />
                </View>
                <Text style={s.menuItemLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}
          <TouchableOpacity style={s.logoutBtn} onPress={logout} activeOpacity={0.8}>
            <Ionicons name="log-out-outline" size={20} color={COLORS.red} />
            <Text style={s.logoutBtnText}>Đăng xuất</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}