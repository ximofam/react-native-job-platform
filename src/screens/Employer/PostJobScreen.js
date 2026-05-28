import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import s, { COLORS } from '../../styles/employerScreenStyles';
import { getCitiesApi, getDistrictsApi } from '../../apis/services/locationService';
import PackageCard from './components/PackageCard';
import StepIndicator from './components/StepIndicator';
import TagSelector from './components/TagSelector';
import DropdownModal from './components/DropdownModal';
import SelectBtn from './components/SelectBtn';
import { getCategoriesApi, postJobApi, publishJobApi, publishPriorityJobApi } from '../../apis/services/jobService';
import PayButton from '../../components/PayButton';

const EMPLOYMENT_TYPES = [
  { value: 'FULL_TIME', label: 'Toàn thời gian' },
  { value: 'PART_TIME', label: 'Bán thời gian' },
  { value: 'REMOTE', label: 'Remote' },
  { value: 'CONTRACT', label: 'Hợp đồng' },
  { value: 'INTERNSHIP', label: 'Thực tập' },
];

const EXPERIENCE_LEVELS = [
  { value: 'INTERN', label: 'Thực tập sinh' },
  { value: 'FRESHER', label: 'Fresher (0–1 năm)' },
  { value: 'JUNIOR', label: 'Junior (1–3 năm)' },
  { value: 'MIDDLE', label: 'Middle (3–5 năm)' },
  { value: 'SENIOR', label: 'Senior (5+ năm)' },
  { value: 'LEAD', label: 'Lead / Manager' },
];
const STEPS = ['Thông tin', 'Nội dung', 'Lương & Địa chỉ', 'Đăng tin'];
const LOCATION_LABEL = { HEADQUARTERS: 'Trụ sở chính', BRANCH: 'Chi nhánh', REMOTE: 'Remote' };

// ─── Package card ─────────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: 'FREE',
    badge: 'Miễn phí',
    badgeBg: COLORS.greenDim,
    badgeColor: COLORS.green,
    title: 'Gói Cơ bản',
    price: '0đ',
    priceColor: COLORS.green,
    features: [
      { icon: 'checkmark-circle-outline', text: 'Hiển thị trong danh sách tìm kiếm' },
      { icon: 'checkmark-circle-outline', text: 'Tối đa 30 ngày hiển thị' },
      { icon: 'close-circle-outline', text: 'Không nổi bật / ưu tiên' },
    ],
  },
  {
    id: 'PRIORITY',
    badge: 'Khuyên dùng',
    badgeBg: COLORS.amberDim,
    badgeColor: COLORS.amber,
    title: 'Gói Ưu tiên',
    price: '199.000đ',
    priceColor: COLORS.amber,
    features: [
      { icon: 'checkmark-circle-outline', text: 'Hiển thị ưu tiên TOP đầu' },
      { icon: 'checkmark-circle-outline', text: 'Tối đa 60 ngày hiển thị' },
      { icon: 'checkmark-circle-outline', text: 'Badge "Nổi bật" trên tin đăng' },
      { icon: 'checkmark-circle-outline', text: 'Gợi ý cho ứng viên phù hợp' },
    ],
  },
];

export default function PostJobScreen({ user }) {
  const companyLocations = user?.profile?.company?.locations ?? [];

  // Form state
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    category: null,          // { id, name } - Cập nhật lưu object thay vì number
    title: '',
    employment_type: '',
    experience_level: '',
    description: '',
    requirements: '',
    benefit: '',
    salary_min: '',
    salary_max: '',
    salary_currency: 'VND',
    // address
    addressMode: companyLocations.length > 0 ? 'company' : 'custom',
    selectedAddressId: null,
    city: null,
    district: null,
    street_address: '',
  });

  // Dropdown / loading state
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showDistrictModal, setShowDistrictModal] = useState(false);

  // Publish state
  const [selectedPackage, setSelectedPackage] = useState('FREE');
  const [submitting, setSubmitting] = useState(false);
  const [publishedJob, setPublishedJob] = useState(null);

  const [stripeClientSecret, setStripeClientSecret] = useState(null);

  const update = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  useEffect(() => {
    if (step === 0 && categories.length === 0) {
      setLoadingCategories(true);
      getCategoriesApi()
        .then((data) => {
          const flatCategories = [];
          data.forEach(parent => {
            flatCategories.push({ id: parent.id, name: parent.name });
            if (parent.children && parent.children.length > 0) {
              parent.children.forEach(child => {
                flatCategories.push({ id: child.id, name: `— ${child.name}` });
              });
            }
          });
          setCategories(flatCategories);
        })
        .catch(err => console.log('Lỗi tải danh mục:', err))
        .finally(() => setLoadingCategories(false));
    }
  }, [step]);


  useEffect(() => {
    if (step === 2 && cities.length === 0) {
      setLoadingCities(true);
      getCitiesApi()
        .then(setCities)
        .finally(() => setLoadingCities(false));
    }
  }, [step]);

  const handleSelectCity = (city) => {
    update('city', city);
    update('district', null);
    setDistricts([]);
    setLoadingDistricts(true);
    getDistrictsApi(city.id)
      .then(setDistricts)
      .finally(() => setLoadingDistricts(false));
  };


  const buildPayload = () => {
    const address =
      form.addressMode === 'company'
        ? { address_id: form.selectedAddressId }
        : {
          city: form.city?.id ?? null,
          district: form.district?.id ?? null,
          street_address: form.street_address,
        };

    return {
      category: form.category?.id ?? null,
      address,
      employment_type: form.employment_type,
      experience_level: form.experience_level,
      title: form.title,
      description: form.description,
      requirements: form.requirements,
      benefit: form.benefit,
      salary_min: form.salary_min,
      salary_max: form.salary_max,
      salary_currency: form.salary_currency,
    };
  };


  const handlePublish = async () => {
    setSubmitting(true);
    try {
      const payload = buildPayload();
      const draft = await postJobApi(payload);

      if (selectedPackage === 'FREE') {
        const published = await publishJobApi(draft.id, selectedPackage);
        setPublishedJob(published);
      } else {
        const res = await publishPriorityJobApi(draft.id, 'STRIPE');
        setStripeClientSecret(res.client_secret);
      }
    } catch (err) {
      console.error('Publish error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  if (stripeClientSecret) {
    return (
      <LinearGradient colors={['#060813', '#0C0F1E', '#111527']} style={s.container}>
        <SafeAreaView style={[s.safeArea, { justifyContent: 'center', paddingHorizontal: 24 }]}>
          <Text style={s.successTitle}>Hoàn tất thanh toán</Text>
          <Text style={[s.pageSubtitle, { textAlign: 'center', marginBottom: 32 }]}>
            Xác nhận thanh toán để kích hoạt{'\n'}
            <Text style={{ color: COLORS.amber, fontWeight: '700' }}>Gói Ưu tiên</Text>
          </Text>

          <PayButton
            clientSecret={stripeClientSecret}
            amount="299.000đ"
            merchantDisplayName="Job Board"
            onSuccess={(result) => {
              setStripeClientSecret(null);
              setPublishedJob(result ?? { id: 'priority' });
              console.log(result)
            }}
            onError={(err) => {
              console.error('Stripe error:', err);
              setStripeClientSecret(null);
            }}
          />

          <TouchableOpacity
            style={[s.navBtnBack, { marginTop: 16, alignSelf: 'center' }]}
            onPress={() => setStripeClientSecret(null)}
          >
            <Text style={s.navBtnText}>← Huỷ, quay lại</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }


  if (publishedJob) {
    return (
      <LinearGradient colors={['#060813', '#0C0F1E', '#111527']} style={s.container}>
        <SafeAreaView style={[s.safeArea, { justifyContent: 'center' }]}>
          <View style={s.successContainer}>
            <View style={s.successIconRing}>
              <Ionicons name="checkmark-circle" size={54} color={COLORS.green} />
            </View>
            <Text style={s.successTitle}>Tin đã được đăng!</Text>
            <Text style={s.successSub}>
              {'Tin tuyển dụng '}
              <Text style={{ color: COLORS.purple, fontWeight: '700' }}>{form.title}</Text>
              {'\nđã được đăng với '}
              <Text style={{ color: selectedPackage === 'PRIORITY' ? COLORS.amber : COLORS.green, fontWeight: '700' }}>
                {selectedPackage === 'PRIORITY' ? 'Gói Ưu tiên' : 'Gói Cơ bản'}
              </Text>
              {' thành công.'}
            </Text>
            <TouchableOpacity
              style={s.successBtn}
              onPress={() => {
                setPublishedJob(null);
                setStep(0);
                setForm({
                  category: null, title: '', employment_type: '', experience_level: '',
                  description: '', requirements: '', benefit: '',
                  salary_min: '', salary_max: '', salary_currency: 'VND',
                  addressMode: companyLocations.length > 0 ? 'company' : 'custom',
                  selectedAddressId: null, city: null, district: null, street_address: '',
                });
                setSelectedPackage('FREE');
              }}
            >
              <Text style={s.successBtnText}>Đăng tin mới</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  // ── Step 0: Thông tin cơ bản ─────────────────────────
  const renderStep0 = () => (
    <>
      <Text style={s.inputLabel}>Tiêu đề tin tuyển dụng *</Text>
      <TextInput
        style={s.input}
        placeholder="VD: Senior React Native Developer"
        placeholderTextColor={COLORS.textMuted}
        value={form.title}
        onChangeText={(v) => update('title', v)}
      />

      <Text style={s.inputLabel}>Danh mục *</Text>
      <SelectBtn
        label={form.category ? form.category.name : "Chọn danh mục"}
        value={form.category?.name}
        loading={loadingCategories}
        onPress={() => setShowCategoryModal(true)}
      />

      <Text style={s.inputLabel}>Hình thức làm việc *</Text>
      <TagSelector
        options={EMPLOYMENT_TYPES}
        value={form.employment_type}
        onChange={(v) => update('employment_type', v)}
      />

      <Text style={s.inputLabel}>Cấp độ kinh nghiệm *</Text>
      <TagSelector
        options={EXPERIENCE_LEVELS}
        value={form.experience_level}
        onChange={(v) => update('experience_level', v)}
      />
    </>
  );

  // ── Step 1: Nội dung ─────────────────────────────────
  const renderStep1 = () => (
    <>
      <Text style={s.inputLabel}>Mô tả công việc *</Text>
      <TextInput
        style={[s.input, s.textArea]}
        placeholder="Mô tả công việc, môi trường làm việc, văn hóa công ty..."
        placeholderTextColor={COLORS.textMuted}
        value={form.description}
        onChangeText={(v) => update('description', v)}
        multiline
      />

      <Text style={s.inputLabel}>Yêu cầu ứng viên *</Text>
      <TextInput
        style={[s.input, s.textArea]}
        placeholder="Kinh nghiệm, kỹ năng, bằng cấp cần thiết..."
        placeholderTextColor={COLORS.textMuted}
        value={form.requirements}
        onChangeText={(v) => update('requirements', v)}
        multiline
      />

      <Text style={s.inputLabel}>Phúc lợi</Text>
      <TextInput
        style={[s.input, s.textArea, { height: 90 }]}
        placeholder="Bảo hiểm, thưởng, du lịch, đào tạo..."
        placeholderTextColor={COLORS.textMuted}
        value={form.benefit}
        onChangeText={(v) => update('benefit', v)}
        multiline
      />
    </>
  );

  // ── Step 2: Lương & Địa chỉ ─────────────────────────
  const renderStep2 = () => (
    <>
      <Text style={s.inputLabel}>Mức lương</Text>
      <View style={s.salaryRow}>
        <View style={s.salaryHalf}>
          <TextInput
            style={s.input}
            placeholder="Tối thiểu"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={form.salary_min}
            onChangeText={(v) => update('salary_min', v)}
          />
        </View>
        <View style={s.salaryHalf}>
          <TextInput
            style={s.input}
            placeholder="Tối đa"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
            value={form.salary_max}
            onChangeText={(v) => update('salary_max', v)}
          />
        </View>
      </View>

      <Text style={s.inputLabel}>Đơn vị tiền tệ</Text>
      <TagSelector
        options={[{ value: 'VND', label: 'VNĐ' }, { value: 'USD', label: 'USD' }]}
        value={form.salary_currency}
        onChange={(v) => update('salary_currency', v || 'VND')}
      />

      <Text style={[s.inputLabel, { marginTop: 4 }]}>Địa chỉ làm việc *</Text>
      {companyLocations.length > 0 && (
        <View style={s.addressTabRow}>
          <TouchableOpacity
            style={[s.addressTab, form.addressMode === 'company' && s.addressTabActive]}
            onPress={() => update('addressMode', 'company')}
          >
            <Text style={[s.addressTabText, form.addressMode === 'company' && s.addressTabTextActive]}>📍 Địa chỉ công ty</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[s.addressTab, form.addressMode === 'custom' && s.addressTabActive]}
            onPress={() => update('addressMode', 'custom')}
          >
            <Text style={[s.addressTabText, form.addressMode === 'custom' && s.addressTabTextActive]}>✏️ Nhập mới</Text>
          </TouchableOpacity>
        </View>
      )}

      {form.addressMode === 'company' ? (
        <>
          {companyLocations.map((loc) => {
            const selected = form.selectedAddressId === loc.address_id;
            return (
              <TouchableOpacity
                key={loc.id}
                style={[s.locationCard, selected && s.locationCardSelected]}
                onPress={() => update('selectedAddressId', loc.address_id)}
                activeOpacity={0.8}
              >
                <View style={s.locationCardIconBox}>
                  <Ionicons name={loc.is_primary ? 'home-outline' : 'location-outline'} size={18} color={selected ? COLORS.purple : COLORS.textSecondary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={s.locationCardLabel}>{LOCATION_LABEL[loc.label] ?? loc.label}</Text>
                  <Text style={s.locationCardAddress}>{loc.address}</Text>
                </View>
                <View style={[s.packageSelectIndicator, selected && s.packageSelectIndicatorActive, { position: 'relative', top: 0, right: 0 }]}>
                  {selected && <Ionicons name="checkmark" size={12} color="#FFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      ) : (
        <>
          <SelectBtn
            label="Chọn tỉnh / thành phố *"
            value={form.city?.name}
            loading={loadingCities}
            onPress={() => setShowCityModal(true)}
          />
          <SelectBtn
            label={form.city ? 'Chọn quận / huyện *' : 'Chọn tỉnh trước'}
            value={form.district?.name}
            loading={loadingDistricts}
            onPress={() => form.city && setShowDistrictModal(true)}
          />
          <Text style={s.inputLabel}>Địa chỉ cụ thể</Text>
          <TextInput
            style={s.input}
            placeholder="Số nhà, tên đường, phường/xã..."
            placeholderTextColor={COLORS.textMuted}
            value={form.street_address}
            onChangeText={(v) => update('street_address', v)}
          />
        </>
      )}
    </>
  );

  // ── Step 3: Chọn gói & publish ───────────────────────
  const renderStep3 = () => {
    const addressSummary =
      form.addressMode === 'company'
        ? companyLocations.find((l) => l.address_id === form.selectedAddressId)?.address ?? '—'
        : [form.street_address, form.district?.name, form.city?.name].filter(Boolean).join(', ') || '—';

    return (
      <>
        <Text style={[s.sectionTitle, { marginBottom: 12 }]}>Xem lại tin đăng</Text>
        <View style={s.reviewCard}>
          {[
            { label: 'Tiêu đề', value: form.title || '—' },
            { label: 'Danh mục', value: form.category?.name || '—' },
            { label: 'Hình thức', value: EMPLOYMENT_TYPES.find((t) => t.value === form.employment_type)?.label || '—' },
            { label: 'Kinh nghiệm', value: EXPERIENCE_LEVELS.find((l) => l.value === form.experience_level)?.label || '—' },
            { label: 'Mức lương', value: form.salary_min && form.salary_max ? `${Number(form.salary_min).toLocaleString()} – ${Number(form.salary_max).toLocaleString()} ${form.salary_currency}` : 'Thỏa thuận' },
            { label: 'Địa chỉ', value: addressSummary, isLast: true },
          ].map((row) => (
            <View key={row.label} style={[s.reviewRow, row.isLast && s.reviewRowLast]}>
              <Text style={s.reviewLabel}>{row.label}</Text>
              <Text style={s.reviewValue}>{row.value}</Text>
            </View>
          ))}
        </View>

        <Text style={[s.sectionTitle, { marginBottom: 4 }]}>Chọn gói đăng tin</Text>
        <Text style={[s.pageSubtitle, { marginBottom: 14, marginTop: 2 }]}>
          Tin sẽ được lưu nháp rồi xuất bản theo gói bạn chọn
        </Text>

        {PACKAGES.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} selected={selectedPackage === pkg.id} onSelect={setSelectedPackage} />
        ))}

        <TouchableOpacity style={[s.submitBtn, submitting && s.submitBtnLoading]} onPress={handlePublish} disabled={submitting} activeOpacity={0.85}>
          <LinearGradient colors={selectedPackage === 'PRIORITY' ? ['#D97706', '#B45309'] : ['#8B5CF6', '#6D28D9']} style={s.submitBtnInner}>
            {submitting ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="rocket-outline" size={20} color="#FFF" />
                <Text style={s.submitBtnText}>{selectedPackage === 'PRIORITY' ? 'Đăng tin Ưu tiên' : 'Đăng tin Miễn phí'}</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </>
    );
  };

  const RENDERERS = [renderStep0, renderStep1, renderStep2, renderStep3];

  return (
    <LinearGradient colors={['#060813', '#0C0F1E', '#111527']} style={s.container}>
      <SafeAreaView style={s.safeArea}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView contentContainerStyle={s.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <Text style={s.pageTitle}>Đăng tin tuyển dụng</Text>
            <Text style={s.pageSubtitle}>Điền đầy đủ để tiếp cận ứng viên tốt hơn</Text>

            <StepIndicator current={step} steps={STEPS} />

            {RENDERERS[step]()}

            {step < STEPS.length - 1 && (
              <View style={s.navRow}>
                {step > 0 && (
                  <TouchableOpacity style={s.navBtnBack} onPress={() => setStep((p) => p - 1)}>
                    <Text style={s.navBtnText}>← Quay lại</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={[s.navBtnNext, step === 0 && { flex: 1 }]} onPress={() => setStep((p) => p + 1)}>
                  <Text style={s.navBtnTextNext}>Tiếp theo →</Text>
                </TouchableOpacity>
              </View>
            )}

            {step === STEPS.length - 1 && (
              <TouchableOpacity style={[s.navBtnBack, { marginTop: 10 }]} onPress={() => setStep((p) => p - 1)}>
                <Text style={s.navBtnText}>← Quay lại chỉnh sửa</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Modals đặt ở ngoài cùng ScrollView */}
        <DropdownModal
          visible={showCategoryModal}
          title="Chọn danh mục"
          items={categories}
          selected={form.category?.id}
          loading={loadingCategories}
          onSelect={(c) => update('category', c)}
          onClose={() => setShowCategoryModal(false)}
        />
        <DropdownModal
          visible={showCityModal}
          title="Chọn tỉnh / thành phố"
          items={cities}
          selected={form.city?.id}
          loading={loadingCities}
          onSelect={handleSelectCity}
          onClose={() => setShowCityModal(false)}
        />
        <DropdownModal
          visible={showDistrictModal}
          title="Chọn quận / huyện"
          items={districts}
          selected={form.district?.id}
          loading={loadingDistricts}
          onSelect={(d) => update('district', d)}
          onClose={() => setShowDistrictModal(false)}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}