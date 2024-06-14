import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PieChart from "../../components/PieChart";
// import AccountContext from "../../context/AccountContext";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import api from "../../api/api";
import { Post } from "../../api/lists.api";
import AccountForm from "../../components/AccountForm";
import NotLoggedIn from "../../components/NotLoggedIn";
import useAccountStore from "../../zustand/account.store";
import useLoggedIn from "../../zustand/login.store";

const AccountFormWrap = styled.div`
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  font-family: "IBM Plex Sans KR", sans-serif;

  input,
  select {
    border: none;
    padding: 6px 10px;
    margin-top: 10px;
    border-bottom: 2px solid #6c7a89;
  }
`;

const AccountViewWrap = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  padding: 20px;
  font-family: "IBM Plex Sans KR", sans-serif;
`;

const Button = styled.button`
  background-color: #354649;
  padding: 10px 20px;
  font-size: 1rem;
  box-shadow: none;
  border: none;
  border-radius: 6px;
  transition: all 0.4s ease;
  color: #f4f3ea;

  &:hover {
    background-color: #6c7a89;
  }
`;
const PieChartWrapper = styled.div`
  width: 500px;
  height: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
`;
const AccountListWrap = styled.div`
  padding: 20px;
  width: 100%;
`;

const AccountLists = styled.ul`
  list-style: none;
  padding: 10px 0;
  text-decoration: none;
`;

const TotalAmount = styled.span`
  display: flex;
  flex-direction: row-reverse;
  font-weight: 600;
  width: 100%;
  font-size: 1.2rem;
`;

const List = styled.li`
  padding: 15px 5px;
  text-decoration: none;
  border-bottom: 1px solid #e0e7e9;
  transition: all 0.4s ease;
  a {
    text-decoration: none;
    cursor: pointer;
  }

  &:hover {
    background-color: #edf6f86c;
  }
`;

interface BadgeProps {
  category: "living" | "food" | "transport" | "shopping" | "culture" | "others";
}

const Badge = styled.span<BadgeProps>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  color: white;
  background-color: ${({ category }) =>
    category === "living"
      ? "#1abc9c"
      : category === "food"
      ? "#f39c12"
      : category === "transport"
      ? "#3498db"
      : category === "shopping"
      ? "#e74c3c"
      : category === "culture"
      ? "#9b59b6"
      : category === "others"
      ? "#7f8c8d"
      : "#34495e"};
  margin-right: 8px;
`;

const ListDate = styled.span`
  display: block;
  font-weight: 600;
  padding-bottom: 4px;
  text-align: left;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const categoryMap = {
  living: "생활비",
  food: "식비",
  transport: "교통비",
  shopping: "쇼핑",
  culture: "문화/여가",
  others: "기타",
};

const HomePage = () => {
  const { isLoggedIn, user } = useLoggedIn();
  const {
    date,
    category,
    description,
    amount,
    data,
    setDate,
    setCategory,
    setDescription,
    setAmount,
    setData,
    addPost,
  } = useAccountStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.lists.getList();
      setData(data);
    };

    fetchData();
  }, [setData]);

  const handleAddPost = async () => {
    if (!user) return;

    if (!date || !category || !description || !amount) {
      alert("모든 필드를 채워주세요!");
      return;
    }

    const newPost: Post = {
      id: uuidv4() as string,
      userId: user.id,
      date,
      description,
      category,
      amount: Number(amount),
      nickname: user.nickname,
    };

    try {
      addPost(newPost);
      setDate("");
      setCategory("");
      setDescription("");
      setAmount("");
    } catch (error) {
      console.log(error);
    }
  };

  const dispatch = useDispatch();

  const {
    // date,
    // category,
    // description,
    // amount,
    // data,
    currentMonth,
    isAlertModalVisible,
    alertMessage,
  } = useSelector((prevState) => prevState.account);
  const accountData = Array.isArray(data) ? data : [];

  const filteredData: Post[] = data.filter((item) => {
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === currentMonth.getFullYear() &&
      itemDate.getMonth() === currentMonth.getMonth()
    );
  });

  const totalAmount = filteredData.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  return (
    <>
      {isLoggedIn ? (
        <>
          <AccountFormWrap>
            <AccountForm
              date={date}
              category={category}
              description={description}
              amount={Number(amount)}
              disabled={false}
              onChange={(
                e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
              ) => {
                const { name, value } = e.target;
                if (name === "date") setDate(value);
                if (name === "category") setCategory(value);
                if (name === "description") setDescription(value);
                if (name === "amount") setAmount(value);
              }}
            />
            <Button onClick={handleAddPost}> 내역 추가 </Button>
          </AccountFormWrap>

          <AccountViewWrap>
            <AccountListWrap>
              <p style={{ textAlign: "left", fontWeight: "600" }}>
                월별 내역 {filteredData.length}건 / 전체내역 {data.length}건
              </p>
              <AccountLists>
                {filteredData.map((item, idx) => (
                  <List key={idx} onClick={() => console.log(item.id)}>
                    <Link to={`/${item.id}`}>
                      <ListDate>
                        {item.date}
                        <span className="text-right text-sm">
                          by. {item.nickname}
                        </span>
                      </ListDate>

                      <ListWrapper>
                        <div>
                          <Badge category={item.category}>
                            {categoryMap[item.category]}
                          </Badge>
                          <span>{item.description}</span>
                        </div>
                        <span>- {item.amount} 원</span>
                      </ListWrapper>
                    </Link>
                  </List>
                ))}
              </AccountLists>
              <TotalAmount>
                {filteredData.length < 1
                  ? "지출 내역이 없습니다"
                  : `-${totalAmount}원`}
              </TotalAmount>
            </AccountListWrap>

            <PieChartWrapper>
              <PieChart data={filteredData} />
            </PieChartWrapper>

            {/* {isAlertModalVisible && (
          <Modal
            show={isAlertModalVisible}
            onClose={() => dispatch(closeAlertModal())}
            message={alertMessage}
            onConfirm={() => dispatch(closeAlertModal())}
          />
        )} */}
          </AccountViewWrap>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </>
  );
};

export default HomePage;
