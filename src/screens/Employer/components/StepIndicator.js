import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import s from '../styles/postJobStyles';
import { COLORS } from '../styles/common';

export default function StepIndicator({ current, steps }) {
  return (
    <View style={s.stepRow}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={label}>
            <View style={s.stepItem}>
              <View style={[s.stepDot, active && s.stepDotActive, done && s.stepDotDone]}>
                {done ? (
                  <Ionicons name="checkmark" size={13} color={COLORS.green} />
                ) : (
                  <Text style={[s.stepDotText, active && s.stepDotTextActive]}>{i + 1}</Text>
                )}
              </View>
              <Text style={[s.stepLabel, active && s.stepLabelActive]}>{label}</Text>
            </View>
            {i < steps.length - 1 && (
              <View style={[s.stepLine, done && s.stepLineDone]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );
}