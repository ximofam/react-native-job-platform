import React, { useContext } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../../contexts/userContext';
import s from './styles/profileStyles';
import * as DocumentPicker from 'expo-document-picker';
import { uploadCvApi } from '../../apis/services/userService';


function SectionCard({ icon, iconColor, iconBg, title, onEdit, children }) {
  return (
    <View style={s.card}>
      <View style={s.cardHeader}>
        <View style={s.cardTitleRow}>
          <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: iconBg, justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name={icon} size={18} color={iconColor} />
          </View>
          <Text style={s.cardTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={s.editBtn} onPress={onEdit}>
          <Text style={s.editBtnText}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );
}

function TimelineItem({ title, sub, period, isLast }) {
  return (
    <>
      <View style={s.timelineItem}>
        <View style={s.timelineDot} />
        <View style={s.timelineContent}>
          <Text style={s.timelineTitle}>{title}</Text>
          <Text style={s.timelineSub}>{sub}</Text>
          {period ? <Text style={s.timelinePeriod}>{period}</Text> : null}
        </View>
      </View>
      {!isLast && <View style={s.divider} />}
    </>
  );
}


export default function ProfileScreen() {
  const { user, logout, updateUser } = useContext(UserContext);

  const fullName = `${user.first_name} ${user.last_name}`;
  const bio = user.profile?.bio;
  const educations = user.profile?.educations ?? [];
  const experiences = user.profile?.experiences ?? [];

  const handleUploadCv = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];

      const formData = new FormData();
      formData.append('title', file.name);
      formData.append('file', {
        uri: file.uri,
        name: file.name,
        type: 'application/pdf',
      });

      await uploadCvApi(formData);
      console.log('Upload success');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <LinearGradient colors={['#020617', '#0F172A', '#111827']} style={s.container}>
      <SafeAreaView style={s.safeArea}>
        <ScrollView contentContainerStyle={s.scrollContainer} showsVerticalScrollIndicator={false}>

          {/* Hero */}
          <View style={s.heroBg}>
            {/* Logout button */}
            <TouchableOpacity style={s.logoutBtn} onPress={logout}>
              <Ionicons name="log-out-outline" size={16} color="#F87171" />
              <Text style={s.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>

            {/* Avatar */}
            <View style={s.avatarWrapper}>
              {user.avatar_url ? (
                <Image source={{ uri: user.avatar_url }} style={s.avatar} />
              ) : (
                <View style={s.avatarFallback}>
                  <Text style={s.avatarFallbackText}>
                    {user.first_name?.[0]?.toUpperCase() ?? '?'}
                  </Text>
                </View>
              )}
              <TouchableOpacity style={s.avatarEditBtn}>
                <Ionicons name="camera-outline" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <Text style={s.profileName}>{fullName}</Text>
            <Text style={s.profileEmail}>{user.email}</Text>
            <TouchableOpacity style={s.uploadCvBtn} onPress={handleUploadCv}>
              <Ionicons
                name="document-attach-outline"
                size={18}
                color="#e61717"
              />
              <Text style={s.uploadCvText}>Upload CV</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={s.body}>

            {/* Bio */}
            <SectionCard
              icon="document-text-outline"
              iconColor="#2563EB"
              iconBg="rgba(37,99,235,0.15)"
              title="Giới thiệu"
              onEdit={() => { }}
            >
              {bio ? (
                <Text style={s.bioText}>{bio}</Text>
              ) : (
                <Text style={s.bioEmpty}>Chưa có giới thiệu. Thêm bio để nổi bật hơn!</Text>
              )}
            </SectionCard>

            {/* Education */}
            <SectionCard
              icon="school-outline"
              iconColor="#059669"
              iconBg="rgba(5,150,105,0.15)"
              title="Học vấn"
              onEdit={() => { }}
            >
              {educations.length === 0 ? (
                <Text style={s.cardEmpty}>Chưa có thông tin học vấn.</Text>
              ) : (
                educations.map((edu, index) => (
                  <TimelineItem
                    key={index}
                    title={edu.degree ?? edu.school}
                    sub={edu.school}
                    period={edu.period}
                    isLast={index === educations.length - 1}
                  />
                ))
              )}
            </SectionCard>

            {/* Experience */}
            <SectionCard
              icon="briefcase-outline"
              iconColor="#D97706"
              iconBg="rgba(217,119,6,0.15)"
              title="Kinh nghiệm làm việc"
              onEdit={() => { }}
            >
              {experiences.length === 0 ? (
                <Text style={s.cardEmpty}>Chưa có kinh nghiệm làm việc.</Text>) : (
                experiences.map((exp, index) => (
                  <TimelineItem
                    key={index}
                    title={exp.position ?? exp.title}
                    sub={exp.company}
                    period={exp.period}
                    isLast={index === experiences.length - 1}
                  />
                ))
              )}
            </SectionCard>

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}