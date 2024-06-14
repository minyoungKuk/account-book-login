const NotLoggedIn = () => {
  return (
    <div className="flex flex-col justify-center items-center pt-40">
      <h3 className="text-3xl py-10">
        안녕하세요. <br />
        <span className="text-4xl font-black color-primary bg-tertiary px-2 rounded-xl inline-block mt-2">
          Account B
        </span>
        입니다.
      </h3>
      <p className="leading-8 text-center">
        로그인한 회원은 나의 지출 내역을 추가하고 <br />
        모든 지출 내역을 확인 할 수 있습니다. <br />
        아직 회원이 아니시라면 회원가입을, <br />
        회원이시라면 로그인을 하여 서비스를 이용해주세요. <br />
        감사합니다.
      </p>
    </div>
  );
};

export default NotLoggedIn;
