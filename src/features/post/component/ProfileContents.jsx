import { useEffect } from "react";
import useCopyUrlToast from "../../../hooks/useCopyUrlToast";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Icon/LinkIcon";
import Kakao from "../../../components/Icon/KakaoIcon";
import Facebook from "../../../components/Icon/FacebookIcon";
import Toast from "../../../components/Toast/Toast";
import FacebookIcon from "../../../components/Icon/FacebookIcon";

const ProfileContents = ({ img, userName }) => {
  const { toast, copyUrl } = useCopyUrlToast();
  const url = window.location.origin + location.pathname;

  // ✅ 최초 진입 시 Kakao SDK 초기화
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      const kakaoKey = import.meta.env.VITE_KAKAO_JS_KEY;
      if (kakaoKey) {
        window.Kakao.init(kakaoKey);
        console.log("✅ Kakao SDK Initialized:", kakaoKey);
      } else {
        console.error("❌ Kakao JS Key is missing in .env");
      }
    }
  }, []);

  const handleUrlCopy = () => {
    copyUrl(url);
  };

  const handleKakaoShare = () => {
    console.log("🔔 handleKakaoShare called");

    if (!window.Kakao) {
      console.warn("❌ Kakao SDK not loaded");
      return;
    }

    if (!window.Kakao.Link) {
      console.error(
        "❌ Kakao.Link is undefined. SDK might not be loaded properly."
      );
      return;
    }

    const shareUrl = window.location.href;
    console.log("🔗 Sharing URL:", shareUrl);

    try {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "OpenMind에서 질문을 남겨보세요!",
          description: "링크로 접속해 바로 질문할 수 있어요.",
          imageUrl:
            "https://5team-openmind-qbdd-git-main-jaejoons-projects.vercel.app/image/favicon/apple-touch-icon.png",
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
    } catch (error) {
      console.error("❌ Kakao.Share Error:", error);
    }
  };

  const handleFacebookShare = () => {
    const shareUrl =
      "https://5team-openmind-qbdd-dlsiph62l-jaejoons-projects.vercel.app/share-facebook";
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`;
    window.open(facebookUrl, "_blank", "noopener,noreferrer");
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
          leftIcon={<FacebookIcon />}
          onClick={handleFacebookShare}
        />
      </div>
      {toast && <Toast message="URL이 복사되었습니다" />}
    </div>
  );
};

export default ProfileContents;
