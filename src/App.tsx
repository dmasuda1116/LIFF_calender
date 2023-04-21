import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

const Form = () => {
  const [duration, setDuration] = useState("");
  const [freeTime, setFreeTime] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [startActivityTime, setStartActivityTime] = useState("");
  const [endActivityTime, setEndActivityTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ここに LINE にメッセージを送信する処理を追加します。

    // フォームをリセットします。
    setDuration("");
    setFreeTime("");
    setPreparationTime("");
    setStartActivityTime("");
    setEndActivityTime("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="期間 (日数)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <TextField
        label="空き時間 (○時間○分)"
        value={freeTime}
        onChange={(e) => setFreeTime(e.target.value)}
      />
      <TextField
        label="移動、準備時間 (○時間○分)"
        value={preparationTime}
        onChange={(e) => setPreparationTime(e.target.value)}
      />
      <TextField
        label="1日の開始活動開始時間 (○時○分)"
        value={startActivityTime}
        onChange={(e) => setStartActivityTime(e.target.value)}
      />
      <TextField
        label="1日の開始活動終了時間 (○時○分)"
        value={endActivityTime}
        onChange={(e) => setEndActivityTime(e.target.value)}
      />
      <Button type="submit" variant="contained">
        送信
      </Button>
    </form>
  );
};

export default Form;
