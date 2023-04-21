import React, { useState, useEffect } from "react";
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import liff from "@line/liff";
import Stack from '@mui/material/Stack';
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

const Form = () => {
  const [duration, setDuration] = useState("");
  const [freeTime, setFreeTime] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [startActivityTimeHour, setStartActivityTimeHour] = useState("");
  const [startActivityTimeMinute, setStartActivityTimeMinute] = useState("");
  const [endActivityTimeHour, setEndActivityTimeHour] = useState("");
  const [endActivityTimeMinute, setEndActivityTimeMinute] = useState("");

  // LIFF initialization
  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        console.log("LIFF init succeeded.");
        window.alert("LIFF init succeeded");
      })
      .catch((e: Error) => {
        console.log("LIFF init failed.");
        window.alert("LIFF init failed");
        console.error(`${e}`);
        window.alert(`${e}`);
      });
  }, []);


  const register = () => {
    const startActivityTime = `${startActivityTimeHour}時${startActivityTimeMinute}分`;
    const endActivityTime = `${endActivityTimeHour}時${endActivityTimeMinute}分`;
  
    const message: string = `カレンダー確認
  期間: ${duration}日間
  空き時間: ${freeTime}
  移動、準備時間: ${preparationTime}
  1日の開始活動開始時間: ${startActivityTime}
  1日の活動終了時間: ${endActivityTime}`;
    liff
      .sendMessages([
        {
          type: "text",
          text: message,
        },
      ])
      .then(function () {
        liff.closeWindow();
      })
      .catch(function (error) {
        console.error(error);
        window.alert("Fail to send message" + error.message);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    register();
  
    // フォームをリセットします。
    setDuration("");
    setFreeTime("");
    setPreparationTime("");
    setStartActivityTimeHour("");
    setStartActivityTimeMinute("");
    setEndActivityTimeHour("");
    setEndActivityTimeMinute("");
  };
  
    return (
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <InputLabel>期間 (日数)</InputLabel>
          <Select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            {Array.from({length: 6}, (_, i) => 5 * (i + 1)).map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel>空き時間</InputLabel>
          <Select
            value={freeTime}
            onChange={(e) => setFreeTime(e.target.value)}
          >
            {["15分", "30分", "45分", "1時間", "1時間15分", "1時間30分", "1時間45分", "2時間", "2時間15分", "2時間30分", "2時間45分", "3時間"].map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel>移動、準備時間</InputLabel>
          <Select
            value={preparationTime}
            onChange={(e) => setPreparationTime(e.target.value)}
          >
            {["15分", "30分", "45分", "1時間", "1時間15分", "1時間30分", "1時間45分", "2時間", "2時間15分", "2時間30分", "2時間45分", "3時間"].map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel>1日の開始活動開始時間 (時間)</InputLabel>
          <Select
            value={startActivityTimeHour}
            onChange={(e) => setStartActivityTimeHour(e.target.value)}
          >
            {Array.from({length: 24}, (_, i) => i + 1).map((value) => (
              <MenuItem key={value} value={value}>{value}</MenuItem>
            ))}
          </Select>
        </FormControl>
  
        <FormControl fullWidth>
          <InputLabel>1日の開始活動開始時間 (分)</InputLabel>
          <Select
          value={startActivityTimeMinute}
          onChange={(e) => setStartActivityTimeMinute(e.target.value)}
        >
          {Array.from({length: 12}, (_, i) => 5 * i).map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>1日の開始活動終了時間 (時間)</InputLabel>
        <Select
          value={endActivityTimeHour}
          onChange={(e) => setEndActivityTimeHour(e.target.value)}
        >
          {Array.from({length: 24}, (_, i) => i + 1).map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>1日の開始活動終了時間 (分)</InputLabel>
        <Select
          value={endActivityTimeMinute}
          onChange={(e) => setEndActivityTimeMinute(e.target.value)}
        >
          {Array.from({length: 12}, (_, i) => 5 * i).map((value) => (
            <MenuItem key={value} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2}>
        <Button onClick={close} variant="outlined" startIcon={<DeleteIcon />}>
          削除
        </Button>
        <Button onClick={register} variant="contained" endIcon={<SendIcon />}>
          登録
        </Button>
      </Stack>
    </form>
  );
};

export default Form;