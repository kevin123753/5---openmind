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
    console.log("🔔 handleKakaoShare called");

    if (!window.Kakao) {
      console.warn("❌ Kakao SDK not loaded");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
      window.Kakao.init(kakaoKey);
      console.log("✅ SDK 지연 초기화됨");
    }

    const shareUrl = window.location.href;

    console.log("🔗 Sharing URL:", shareUrl);

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "OpenMind에서 질문을 남겨보세요!",
        description: "링크로 접속해 바로 질문할 수 있어요.",
        imageUrl: "https://openmind.dev/default-thumbnail.jpg", // HTTPS 이미지
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "질문 보러가기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
    console.log("✅ Kakao.Link.sendDefault executed");
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
