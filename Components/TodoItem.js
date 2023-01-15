import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Button, Text, Switch } from "react-native";
import Row from "./Row";

export default function TodoItem({ label, onDelete, isDone, onSwitchChange }) {
  //const [isDone, setDone] = useState(false);

  return (
    <Row style={{ alignItems: "center", marginBottom: 12 }}>
      <Switch
        value={isDone}
        onValueChange={(value) => onSwitchChange(id, value)}
        valuestyle={{ marginRight: 8 }}
      />
      <Text style={{ color: isDone ? "#eee" : "#000" }}>
        {label ?? "내용 없음"}
      </Text>
      <Button title="삭제" onPress={onDelete} />
    </Row>
  );
}
