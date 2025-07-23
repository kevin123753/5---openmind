import { useEffect, useRef, useState } from "react";
import useCopyUrlToast from "../../../hooks/useCopyUrlToast";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Icon/LinkIcon";
import Kakao from "../../../components/Icon/KakaoIcon";
import Facebook from "../../../components/Icon/FacebookIcon";
import Toast from "../../../components/Toast/Toast";

const ProfileContents = ({ img, userName, onImageChange }) => {
  const { toast, copyUrl } = useCopyUrlToast();
  const url = window.location.origin + location.pathname;
  const fileInputRef = useRef(null);
  const [currentImage, setCurrentImage] = useState(img);

  // 이미지가 변경되면 상태 업데이트
  useEffect(() => {
    setCurrentImage(img);
  }, [img]);

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
          imageUrl: "https://openmind.dev/default-thumbnail.jpg", // ✅ 반드시 HTTPS
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

  // 이미지 업로드 핸들러
  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 이미지 파일인지 확인
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 제한 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("파일 크기는 5MB 이하여야 합니다.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setCurrentImage(imageUrl);

      // 부모 컴포넌트에 이미지 변경 알림
      if (onImageChange) {
        onImageChange(imageUrl);
      }
    };
    reader.readAsDataURL(file);

    // 파일 input 초기화 (같은 파일을 다시 선택할 수 있도록)
    event.target.value = "";
  };

  return (
    <div className="profileContents">
      <div className="profileImageContainer">
        <img
          src={currentImage}
          alt="큰 프로필"
          onClick={handleImageUpload}
          style={{ cursor: "pointer" }}
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
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
