import KakaoIcon from "../Icon/KakaoIcon";
import Button from "../Button/Button";

const KakaoShareButton = ({ title = "질문하러 가기", imageUrl, url }) => {
  const shareUrl = url || window.location.href;

  const handleShare = () => {
    if (!window.Kakao) {
      alert("카카오 SDK가 로드되지 않았습니다.");
      return;
    }

    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title,
        description: "OpenMind에서 질문을 남겨보세요!",
        imageUrl:
          imageUrl ||
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
  };

  return (
    <Button
      variant="round"
      size="xsmall"
      leftIcon={<KakaoIcon />}
      onClick={handleShare}
    />
  );
};

export default KakaoShareButton;
