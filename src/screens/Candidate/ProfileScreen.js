import React, { useContext, useState } from 'react';
import {
  View, Text, SafeAreaView, TouchableOpacity,
  ScrollView, Image, Modal, StyleSheet, TextInput,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import UserContext from '../../contexts/userContext';
import s from '../../styles/candidateScreenStyles';
import * as DocumentPicker from 'expo-document-picker';
import { addEducationApi, addExperienceApi, uploadAvatarApi, uploadCvApi } from '../../apis/services/userService';
import * as ImagePicker from 'expo-image-picker';


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

  const [modalEduVisible, setModalEduVisible] = useState(false);
  const [eduForm, setEduForm] = useState({ school: '', description: '', major: '', degree: 'BACHELOR', start_date: '', end_date: '' });

  const [modalExpVisible, setModalExpVisible] = useState(false);
  const [expForm, setExpForm] = useState({ company: '', position: '', description: '', start_date: '', end_date: '' });

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

  const handleAddEducation = async () => {
    try {
      if (!eduForm.school || !eduForm.start_date) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên trường và ngày bắt đầu');
        return;
      }
      await addEducationApi(eduForm);
      Alert.alert('Thành công', 'Đã thêm học vấn');
      setModalEduVisible(false);
      setEduForm({ school: '', description: '', major: '', degree: 'BACHELOR', start_date: '', end_date: '' });
      updateUser();
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể thêm học vấn');
    }
  };

  const handleAddExperience = async () => {
    try {
      if (!expForm.company || !expForm.position) {
        Alert.alert('Lỗi', 'Vui lòng nhập tên công ty và vị trí');
        return;
      }
      await addExperienceApi(expForm);
      Alert.alert('Thành công', 'Đã thêm kinh nghiệm làm việc');
      setModalExpVisible(false);
      setExpForm({ company: '', position: '', description: '', start_date: '', end_date: '' });
      updateUser();
    } catch (error) {
      console.log(error);
      Alert.alert('Lỗi', 'Không thể thêm kinh nghiệm');
    }
  };

  const handleUploadAvatar = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Quyền truy cập bị từ chối', 'Bạn cần cấp quyền truy cập ảnh để đổi avatar.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const asset = result.assets[0];

        const fileToUpload = {
          uri: asset.uri,
          name: asset.fileName || `avatar-${Date.now()}.jpg`,
          type: asset.mimeType || 'image/jpeg',
        };

        await uploadAvatarApi(fileToUpload);

        Alert.alert('Thành công', 'Đã cập nhật ảnh đại diện');
        updateUser();
      }
    } catch (error) {
      console.error("Lỗi upload avatar:", error);
      Alert.alert('Lỗi', 'Không thể tải ảnh lên lúc này. Vui lòng thử lại.');
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
              <TouchableOpacity style={s.avatarEditBtn} onPress={handleUploadAvatar}>
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
              onEdit={() => { setModalEduVisible(true) }}
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
              onEdit={() => { setModalExpVisible(true) }}
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

      {/* MODAL THÊM HỌC VẤN */}
      <Modal visible={modalEduVisible} animationType="slide" transparent={true}>
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalTitle}>Thêm Học vấn</Text>

            <TextInput style={modalStyles.input} placeholder="Tên trường (VD: ĐH Bách Khoa)" value={eduForm.school} onChangeText={(text) => setEduForm({ ...eduForm, school: text })} />
            <TextInput style={modalStyles.input} placeholder="Chuyên ngành (VD: CNTT)" value={eduForm.major} onChangeText={(text) => setEduForm({ ...eduForm, major: text })} />
            <TextInput style={modalStyles.input} placeholder="Bằng cấp (VD: BACHELOR, MASTER)" value={eduForm.degree} onChangeText={(text) => setEduForm({ ...eduForm, degree: text })} />
            <TextInput style={modalStyles.input} placeholder="Mô tả" value={eduForm.description} onChangeText={(text) => setEduForm({ ...eduForm, description: text })} multiline />

            <View style={modalStyles.row}>
              <TextInput style={[modalStyles.input, { flex: 1, marginRight: 5 }]} placeholder="Bắt đầu (YYYY-MM-DD)" value={eduForm.start_date} onChangeText={(text) => setEduForm({ ...eduForm, start_date: text })} />
              <TextInput style={[modalStyles.input, { flex: 1, marginLeft: 5 }]} placeholder="Kết thúc (YYYY-MM-DD)" value={eduForm.end_date} onChangeText={(text) => setEduForm({ ...eduForm, end_date: text })} />
            </View>

            <View style={modalStyles.btnRow}>
              <TouchableOpacity style={[modalStyles.btn, modalStyles.btnCancel]} onPress={() => setModalEduVisible(false)}>
                <Text style={modalStyles.btnCancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[modalStyles.btn, modalStyles.btnSave]} onPress={handleAddEducation}>
                <Text style={modalStyles.btnSaveText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL THÊM KINH NGHIỆM */}
      <Modal visible={modalExpVisible} animationType="slide" transparent={true}>
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modalContainer}>
            <Text style={modalStyles.modalTitle}>Thêm Kinh nghiệm</Text>

            <TextInput style={modalStyles.input} placeholder="Tên công ty (VD: FPT Software)" value={expForm.company} onChangeText={(text) => setExpForm({ ...expForm, company: text })} />
            <TextInput style={modalStyles.input} placeholder="Vị trí (VD: Frontend Developer)" value={expForm.position} onChangeText={(text) => setExpForm({ ...expForm, position: text })} />
            <TextInput style={modalStyles.input} placeholder="Mô tả công việc" value={expForm.description} onChangeText={(text) => setExpForm({ ...expForm, description: text })} multiline />

            <View style={modalStyles.row}>
              <TextInput style={[modalStyles.input, { flex: 1, marginRight: 5 }]} placeholder="Bắt đầu (YYYY-MM-DD)" value={expForm.start_date} onChangeText={(text) => setExpForm({ ...expForm, start_date: text })} />
              <TextInput style={[modalStyles.input, { flex: 1, marginLeft: 5 }]} placeholder="Kết thúc (YYYY-MM-DD)" value={expForm.end_date} onChangeText={(text) => setExpForm({ ...expForm, end_date: text })} />
            </View>

            <View style={modalStyles.btnRow}>
              <TouchableOpacity style={[modalStyles.btn, modalStyles.btnCancel]} onPress={() => setModalExpVisible(false)}>
                <Text style={modalStyles.btnCancelText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[modalStyles.btn, modalStyles.btnSave]} onPress={handleAddExperience}>
                <Text style={modalStyles.btnSaveText}>Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
}


const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#1e293b',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    color: '#334155',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  btnCancel: {
    backgroundColor: '#e2e8f0',
  },
  btnCancelText: {
    color: '#64748b',
    fontWeight: '600',
  },
  btnSave: {
    backgroundColor: '#2563eb',
  },
  btnSaveText: {
    color: '#fff',
    fontWeight: '600',
  },
});