import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import mockData from "../../data/mockData";

const initialState = {
  data: JSON.parse(localStorage.getItem("accountData")) || mockData,
  date: "",
  category: "",
  description: "",
  amount: "",
  currentMonth: new Date(),
  isAlertModalVisible: false,
  alertMessage: "",
};

const accountSlice = createSlice({
  initialState,
  name: "account",
  reducers: {
    setDate(prevState, action) {
      prevState.date = action.payload;
    },
    setCategory(prevState, action) {
      prevState.category = action.payload;
    },
    setDescription(prevState, action) {
      prevState.description = action.payload;
    },
    setAmount(prevState, action) {
      prevState.amount = action.payload;
    },
    setCurrentMonth(prevState, action) {
      prevState.currentMonth = new Date(action.payload);
    },
    setAlertMessage(prevState, action) {
      prevState.alertMessage = action.payload;
      prevState.isAlertModalVisible = true;
    },
    closeAlertModal(prevState) {
      prevState.isAlertModalVisible = false;
    },
    handleSubmit(prevState) {
      if (
        !prevState.date ||
        !prevState.category ||
        !prevState.description ||
        !prevState.amount
      ) {
        prevState.alertMessage = "모든 입력칸을 채워주세요.";
        prevState.isAlertModalVisible = true;
        return;
      }

      const newData = {
        id: uuidv4(),
        date: prevState.date,
        category: prevState.category,
        description: prevState.description,
        amount: prevState.amount,
      };

      prevState.data.push(newData);
      localStorage.setItem("accountData", JSON.stringify(prevState.data));

      prevState.date = "";
      prevState.category = "";
      prevState.description = "";
      prevState.amount = "";
    },

    handleAmountChange(prevState, action) {
      const value = action.payload;

      if (/^\d*$/.test(value)) {
        prevState.amount = value;
      } else {
        prevState.alertMessage = "금액란에는 숫자만 입력해 주세요.";
        prevState.isAlertModalVisible = true;
      }
    },
    setData: (prevState, action) => {
      prevState.data = action.payload;
      localStorage.setItem("accountData", JSON.stringify(prevState.data));
    },
  },
});

export const {
  setDate,
  setCategory,
  setDescription,
  setAmount,
  setCurrentMonth,
  setData,
  setAlertMessage,
  closeAlertModal,
  handleSubmit,
  handleAmountChange,
} = accountSlice.actions;

export const accountReducer = accountSlice.reducer;
