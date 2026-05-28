import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { getMyCvsApi } from '../../apis/services/applicationService';
import { createApplicationApi } from '../../apis/services/applicationService';
import s from '../../styles/jobStyles'


function SectionLabel({ icon, label }) {
  return (
    <View style={s.labelRow}>
      <Ionicons name={icon} size={16} color="#3B82F6" />
      <Text style={s.label}>{label}</Text>
    </View>
  );
}

function CvCard({ cv, selected, onPress }) {
  const active = selected;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[s.cvCard, active && s.cvCardActive]}
    >

      <View style={[s.cvIconWrap, active && s.cvIconWrapActive]}>
        <Ionicons
          name="document-text-outline"
          size={22}
          color={active ? '#FFFFFF' : '#64748B'}
        />
      </View>

      <View style={s.cvInfo}>
        <Text style={[s.cvTitle, active && s.cvTitleActive]} numberOfLines={1}>
          {cv.title}
        </Text>
        <Text style={s.cvMeta}>PDF · CV của bạn</Text>
      </View>


      <View style={[s.checkCircle, active && s.checkCircleActive]}>
        {active && (
          <Ionicons name="checkmark" size={13} color="#FFFFFF" />
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function JobApplicationScreen({ route, navigation }) {
  const { jobId, jobTitle } = route.params;

  const [cvList, setCvList] = useState([]);
  const [cvLoading, setCvLoading] = useState(true);
  const [cvError, setCvError] = useState(null);

  const [selectedCvId, setSelectedCvId] = useState(null);
  const [salary, setSalary] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    let cancelled = false;

    async function loadCvs() {
      try {
        setCvLoading(true);
        setCvError(null);
        const data = await getMyCvsApi();
        if (!cancelled) setCvList(data ?? []);
      } catch (err) {
        if (!cancelled) setCvError(err?.message ?? 'Không tải được danh sách CV');
      } finally {
        if (!cancelled) setCvLoading(false);
      }
    }

    loadCvs();
    return () => { cancelled = true; };
  }, []);


  async function handleSubmit() {
    if (!selectedCvId) {
      setSubmitError('Vui lòng chọn một CV.');
      return;
    }
    const salaryNum = parseInt(salary.replace(/\D/g, ''), 10);
    if (!salary || isNaN(salaryNum) || salaryNum <= 0) {
      setSubmitError('Vui lòng nhập mức lương mong muốn hợp lệ.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      await createApplicationApi({
        job: jobId,
        expected_salary: salaryNum,
        cv_file: selectedCvId,
      });
      setSubmitted(true);
    } catch (err) {
      if (err) {
        setSubmitError(Object.values(err).join('\n'));
      } else {
        setSubmitError('Nộp đơn thất bại, thử lại sau.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={s.fill}>
        <SafeAreaView style={[s.fill, s.center]}>
          <View style={s.successIconWrap}>
            <Ionicons name="checkmark-done-outline" size={44} color="#22C55E" />
          </View>
          <Text style={s.successTitle}>Đã nộp đơn!</Text>
          <Text style={s.successSub}>
            Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.
          </Text>
          <TouchableOpacity
            style={s.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={s.backBtnText}>Quay về</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </LinearGradient>
    );
  }


  return (
    <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={s.fill}>
      <SafeAreaView style={s.fill}>

        <View style={s.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backIcon}>
            <Ionicons name="arrow-back-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={s.headerTitle} numberOfLines={1}>Nộp đơn ứng tuyển</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={s.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={s.jobPill}>
            <Ionicons name="briefcase-outline" size={14} color="#3B82F6" />
            <Text style={s.jobPillText} numberOfLines={1}>{jobTitle}</Text>
          </View>


          <View style={s.card}>
            <SectionLabel icon="cash-outline" label="Mức lương mong muốn" />
            <View style={s.inputWrap}>
              <TextInput
                style={s.input}
                placeholder="VD: 25000000"
                placeholderTextColor="#475569"
                keyboardType="numeric"
                value={salary}
                onChangeText={(t) => {
                  setSalary(t);
                  setSubmitError(null);
                }}
              />
              <Text style={s.inputSuffix}>VND</Text>
            </View>
            {salary !== '' && !isNaN(parseInt(salary.replace(/\D/g, ''), 10)) && (
              <Text style={s.salaryHint}>
                ≈ {parseInt(salary.replace(/\D/g, ''), 10).toLocaleString('vi-VN')} VND
              </Text>
            )}
          </View>


          <View style={s.card}>
            <SectionLabel icon="document-text-outline" label="Chọn CV của bạn" />

            {cvLoading ? (
              <View style={s.cvLoadingWrap}>
                <ActivityIndicator color="#3B82F6" />
                <Text style={s.cvLoadingText}>Đang tải CV…</Text>
              </View>
            ) : cvError ? (
              <View style={s.cvErrorWrap}>
                <Ionicons name="alert-circle-outline" size={20} color="#EF4444" />
                <Text style={s.cvErrorText}>{cvError}</Text>
              </View>
            ) : cvList.length === 0 ? (
              <View style={s.cvErrorWrap}>
                <Ionicons name="folder-open-outline" size={20} color="#64748B" />
                <Text style={s.cvEmptyText}>Bạn chưa có CV nào. Hãy tải lên trước.</Text>
              </View>
            ) : (
              <View style={s.cvList}>
                {cvList.map((cv) => (
                  <CvCard
                    key={cv.id}
                    cv={cv}
                    selected={selectedCvId === cv.id}
                    onPress={() => {
                      setSelectedCvId(cv.id);
                      setSubmitError(null);
                    }}
                  />
                ))}
              </View>
            )}
          </View>

          {/* ── Error banner ── */}
          {submitError && (
            <View style={s.errorBanner}>
              <Ionicons name="warning-outline" size={16} color="#FCA5A5" />
              <Text style={s.errorBannerText}>{submitError}</Text>
            </View>
          )}

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* ── Submit bar ── */}
        <View style={s.bottomBar}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleSubmit}
            disabled={submitting}
            style={s.submitBtn}
          >
            <LinearGradient
              colors={submitting ? ['#1E3A5F', '#1E3A5F'] : ['#2563EB', '#3B82F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={s.submitGradient}
            >
              {submitting ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <>
                  <Ionicons name="send-outline" size={18} color="#FFFFFF" />
                  <Text style={s.submitText}>Nộp đơn ngay</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </LinearGradient>
  );
}