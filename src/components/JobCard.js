import React from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import { Ionicons, } from '@expo/vector-icons';
import s from '../styles/candidateScreenStyles';
import { useNavigation } from '@react-navigation/native';

export default function JobCard({ job, onToggleSave }) {
  const navigation = useNavigation()
  const company = job.company ?? {};

  return (
    <View style={s.jobCard}>
      <View style={s.jobCardTop}>
        {company.logo_url ? (
          <Image source={{ uri: company.logo_url }} style={s.companyLogoImg} />
        ) : (
          <View style={s.companyLogo}>
            <Text style={s.companyLogoText}>
              {getInitial(company.name)}
            </Text>
          </View>
        )}

        <View style={s.jobInfo}>
          <Text style={s.jobTitle} numberOfLines={2}>
            {job.title}
          </Text>

          <Text style={s.companyName}>
            {company.name}
          </Text>
        </View>

        <TouchableOpacity style={s.bookmarkBtn} onPress={() => onToggleSave(job.id)}>
          <Ionicons
            name={job.saved ? 'bookmark' : 'bookmark-outline'}
            size={20}
            color={job.saved ? '#2563EB' : '#CBD5E1'}
          />
        </TouchableOpacity>
      </View>

      {job.address ? (
        <View style={s.addressRow}>
          <Ionicons name="location-outline" size={13} color="#94A3B8" />
          <Text style={s.addressText} numberOfLines={1}>{job.address}</Text>
        </View>
      ) : null}

      <View style={s.jobCardBottom}>
        <Text style={s.jobSalary}>
          {formatSalary(job.salary)}
        </Text>

        <TouchableOpacity style={s.applyBtn} onPress={() => navigation.navigate("JobDetail", { id: job.id })}>
          <Text style={s.applyBtnText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


function formatSalary(salary) {
  if (!salary) {
    return 'Thỏa thuận';
  }
  return salary.display ?? 'Thỏa thuận'
}

function getInitial(name) {
  return name ? name.charAt(0).toUpperCase() : '?';
}