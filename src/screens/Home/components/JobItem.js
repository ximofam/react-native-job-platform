import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/employerStyles';

export default function JobItem({ job }) {
  const isActive = job.status === 'active';

  return (
    <View style={styles.jobCard}>
      <View style={styles.jobCardTop}>
        <Text style={styles.jobTitle}>{job.title}</Text>
        <View style={[styles.jobStatusBadge, isActive ? styles.badgeActive : styles.badgeClosed]}>
          <Text style={[styles.jobStatusText, isActive ? styles.badgeActiveText : styles.badgeClosedText]}>
            {isActive ? 'Đang mở' : 'Đã đóng'}
          </Text>
        </View>
      </View>

      <View style={styles.jobCardBottom}>
        <View style={styles.jobMeta}>
          <Ionicons name="people-outline" size={15} color="#94A3B8" />
          <Text style={styles.jobMetaText}>{job.applicants} ứng viên</Text>
        </View>
        <View style={styles.jobMeta}>
          <Ionicons name="time-outline" size={15} color="#94A3B8" />
          <Text style={styles.jobMetaText}>{job.posted}</Text>
        </View>
        <TouchableOpacity style={styles.jobDetailBtn}>
          <Text style={styles.jobDetailBtnText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}