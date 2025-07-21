// /****** hook ******/
// import useCopyUrlToast from "../hook/useCopyUrlToast";

// /****** component ******/
// import Button from "../../../components/Button/Button";
// import Link from "../../../components/Icon/LinkIcon";
// import Kakao from "../../../components/Icon/KakaoIcon";
// import Facebook from "../../../components/Icon/FacebookIcon";
// import Toast from "../../../components/Toast/Toast";

// const ProfileContents = ({ img, userName }) => {
//   const { toast, copyUrl } = useCopyUrlToast();

//   //  링크 복사
//   const handleUrlCopy = () => {
//     const url = window.location.origin + location.pathname;
//     copyUrl(url);
//   };

//   return (
//     <div className="profileContents">
//       <img src={img} alt="큰 프로필" />
//       <h2>{userName}</h2>
//       <div className="BtnContents">
//         <Button
//           variant="round"
//           size="xsmall"
//           className="styleLink"
//           leftIcon={<Link />}
//           onClick={handleUrlCopy}
//         />
//         <Button
//           variant="round"
//           size="xsmall"
//           className="styleKakao"
//           leftIcon={<Kakao />}
//         />
//         <Button
//           variant="round"
//           size="xsmall"
//           className="styleFacebook"
//           leftIcon={<Facebook />}
//         />
//       </div>
//       {toast && <Toast message="URL이 복사되었습니다" />}
//     </div>
//   );
// };

// export default ProfileContents;

import useCopyUrlToast from "../hook/useCopyUrlToast";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Icon/LinkIcon";
import Kakao from "../../../components/Icon/KakaoIcon";
import Facebook from "../../../components/Icon/FacebookIcon";
import Toast from "../../../components/Toast/Toast";

const ProfileContents = ({ img, userName }) => {
  const { toast, copyUrl } = useCopyUrlToast();
  const url = window.location.origin + location.pathname;

  const handleUrlCopy = () => {
    copyUrl(url);
  };

  const handleKakaoShare = () => {
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      alert("카카오톡 공유를 사용할 수 없습니다.");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: `${userName}에게 질문하기`,
        description: "OpenMind에서 질문을 남겨보세요!",
        imageUrl: img || "https://openmind.dev/default-thumbnail.jpg",
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "질문 보러가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div className="profileContents">
      <img src={img} alt="큰 프로필" />
      <h2>{userName}</h2>
      <div className="BtnContents">
        <Button
          variant="round"
          size="xsmall"
          className="styleLink"
          leftIcon={<Link />}
          onClick={handleUrlCopy}
        />
        <Button
          variant="round"
          size="xsmall"
          className="styleKakao"
          leftIcon={<Kakao />}
          onClick={handleKakaoShare}
        />
        <Button
          variant="round"
          size="xsmall"
          className="styleFacebook"
          leftIcon={<Facebook />}
        />
      </div>
      {toast && <Toast message="URL이 복사되었습니다" />}
    </div>
  );
};

export default ProfileContents;
