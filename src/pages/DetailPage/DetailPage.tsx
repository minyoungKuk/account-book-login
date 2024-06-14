import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Post } from "../../api/lists.api";
import AccountForm from "../../components/AccountForm";
import Modal from "../../layouts/Modal";
import {
  closeAlertModal,
  setAlertMessage,
} from "../../redux/slices/account.slice";
import useAccountStore from "../../zustand/account.store";
import useLoggedIn from "../../zustand/login.store";

const AccountDetailWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 80px 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  input,
  select {
    width: 360px;
    padding: 10px 20px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 2px solid #354649;
  }
`;

const ButtonWrapper = styled.div`
  width: 380px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px;

  button {
    width: 100px;
    padding: 15px;
    border: none;
    font-weight: 600;
    background-color: #354649;
    color: #e0e7e9;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      background-color: #6c7a89;
    }
  }
`;

const DetailPage = () => {
  const dispatch = useDispatch();
  const { isAlertModalVisible, alertMessage } = useSelector(
    (prevState: any) => prevState.account
  );

  const { user } = useLoggedIn();
  const { data, updatePost, deletePost } = useAccountStore();

  const { postsId } = useParams();
  const navigate = useNavigate();

  const [selectedData, setSelectedData] = useState<Post | null>(null);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  // const [isAlertModalVisible, setIsAlertModalVisible] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState<string | null>(null);

  useEffect(() => {
    if (!data) return;
    const item = data.find((val: Post) => val.id === postsId);
    if (item) {
      setSelectedData(item);
    }
  }, [postsId, data]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "amount" && !/^\d*$/.test(value)) {
      dispatch(setAlertMessage("금액란에는 숫자만 입력해 주세요."));
    } else if (selectedData) {
      updatePost(selectedData.id, { ...selectedData, [name]: value });
    }
  };

  const handleSave = async () => {
    if (!selectedData) return;
    await updatePost(selectedData.id, selectedData);
    navigate("/");
  };

  const handleDeleteList = async () => {
    if (!selectedData) return;

    await deletePost(selectedData.id);
    navigate("/");
  };

  // const handleSave = async () => {
  //   await const updatedData = data.map((item) =>
  //     item.id === selectedData.id ? selectedData : item
  //   );

  // localStorage.setItem("accountData", JSON.stringify(updatedData));
  //   dispatch(setData(updatedData));
  //   navigate("/");
  // };

  const showConfirmModal = (action: string) => {
    setConfirmAction(action);
    setIsConfirmModalVisible(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalVisible(false);
    setConfirmAction(null);
  };

  // const closeAlertModal = () => {
  //   setIsAlertModalVisible(false);
  // };

  const confirmMessage =
    confirmAction === "save"
      ? "정말 수정하시겠습니까?"
      : "정말 삭제하시겠습니까?";

  // const handleDeleteList = () => {
  //   const updatedData = data.filter(
  //     (item: Post) => item.id !== selectedData.id
  //   );
  //   // localStorage.setItem("accountData", JSON.stringify(updatedData));
  //   dispatch(setData(updatedData));
  //   navigate("/");
  // };

  if (!selectedData) {
    return <p>로딩 중...</p>;
  }

  const isAuthor = user && user.id === selectedData.userId;

  return (
    selectedData && (
      <AccountDetailWrapper>
        <AccountForm
          date={selectedData.date}
          category={selectedData.category}
          description={selectedData.description}
          amount={selectedData.amount}
          onChange={handleChange}
          disabled={!isAuthor}
        />
        <ButtonWrapper>
          {isAuthor ? (
            <>
              <button onClick={() => showConfirmModal("save")}>수정</button>
              <button onClick={() => showConfirmModal("delete")}>
                내역 삭제
              </button>
            </>
          ) : (
            ""
          )}
          <button onClick={() => navigate("/")}>돌아가기</button>
        </ButtonWrapper>

        <Modal
          show={isConfirmModalVisible}
          onClose={closeConfirmModal}
          message={confirmMessage}
          onConfirm={confirmAction === "save" ? handleSave : handleDeleteList}
        />

        <Modal
          show={isAlertModalVisible}
          onClose={() => dispatch(closeAlertModal())}
          message={alertMessage}
          onConfirm={() => dispatch(closeAlertModal())}
        />
      </AccountDetailWrapper>
    )
  );
};

export default DetailPage;
