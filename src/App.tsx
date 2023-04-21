import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import liff from "@line/liff";
import dayjs from "dayjs";

const Form = () => {
  const [duration, setDuration] = useState("");
  const [freeTime, setFreeTime] = useState("");
  const [preparationTime, setPreparationTime] = useState("");
  const [startActivityTime, setStartActivityTime] = useState("");
  const [endActivityTime, setEndActivityTime] = useState("");

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
    const message = `カレンダー確認
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
      <Button onClick={register} type="submit" variant="contained">
        送信
      </Button>
    </form>
  );
};

export default Form;
