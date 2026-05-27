import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '../../contexts/notificationContext';
import styles from '../../styles/notificationStyles'

const ICON_MAP = {
  order: { name: 'bag-check-outline', bg: '#EBF4FF', color: '#185FA5' },
  payment: { name: 'time-outline', bg: '#FFF4E0', color: '#854F0B' },
  success: { name: 'checkmark-circle-outline', bg: '#EAF3DE', color: '#3B6D11' },
  system: { name: 'settings-outline', bg: '#F3F3F3', color: '#888' },
  default: { name: 'notifications-outline', bg: '#EBF4FF', color: '#185FA5' },
};

const DOT_COLOR = {
  order: '#378ADD', payment: '#EF9F27',
  success: '#639922', system: 'transparent', default: '#378ADD',
};

const formatTime = (date) => {
  if (!date) return 'Vừa xong';
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'Vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return d.toLocaleDateString('vi-VN');
};

const NotificationItem = ({ item, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const type = item.type || 'default';
  const icon = ICON_MAP[type] || ICON_MAP.default;
  const dotColor = DOT_COLOR[type] || DOT_COLOR.default;
  const isUnread = !item.read;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => setIsExpanded(!isExpanded)}
      style={[styles.card, isUnread && styles.cardUnread]}
    >
      {isUnread && (
        <View style={[styles.unreadBar, { backgroundColor: dotColor }]} />
      )}

      <View style={[styles.iconWrap, { backgroundColor: icon.bg }]}>
        <Ionicons name={icon.name} size={20} color={icon.color} />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <View style={styles.titleRow}>
            <Text
              style={styles.cardTitle}
              numberOfLines={isExpanded ? undefined : 1}
            >
              {item.title || 'Thông báo mới'}
            </Text>
            {isUnread && (
              <View style={[styles.dot, { backgroundColor: dotColor }]} />
            )}
          </View>
          <Text style={styles.timeText}>{formatTime(item.date)}</Text>
        </View>

        <Text
          style={styles.cardMsg}
          numberOfLines={isExpanded ? undefined : 2}
        >
          {item.message}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => onDelete(item.id)}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons name="trash-outline" size={17} color="#aaa" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const NotificationScreen = () => {
  const { messages, deleteMessage } = useNotifications();
  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Thông báo</Text>
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>

      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconWrap}>
            <Ionicons name="notifications-off-outline" size={32} color="#aaa" />
          </View>
          <Text style={styles.emptyTitle}>Không có thông báo</Text>
          <Text style={styles.emptySubtitle}>
            Bạn sẽ nhận được thông báo khi có cập nhật mới.
          </Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <NotificationItem item={item} onDelete={deleteMessage} />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};


export default NotificationScreen;