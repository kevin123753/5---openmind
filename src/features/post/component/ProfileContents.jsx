import { useLocation } from "react-router-dom";
import usePostUserInfo from "../hook/usePostUserInfo";
import useCopyUrlToast from "../hook/useCopyUrlToast";

import Link from "../../components/Icon/LinkIcon";
import Kakao from "../../components/Icon/KakaoIcon";
import Facebook from "../../components/Icon/FacebookIcon";
import Toast from "../../components/Toast/Toast";

//  링크 복사
const handleUrlCopy = () => {
  const url = window.location.origin + location.pathname;
  copyUrl(url);
};

const profileContents = () => {
  const location = useLocation();
  const { userId, userName, img } = usePostUserInfo({ id, name, imageSource });
  const { toast, copyUrl } = useCopyUrlToast();

  return (
    <div className="profileContents">
      <img src={img} alt="큰 프로필" />
      <h2>{userName}</h2>
      <div className="BtnContents">
        <Button variant="round" size="xsmall" className="styleLink" leftIcon={<Link />} onClick={handleUrlCopy} />
        <Button variant="round" size="xsmall" className="styleKakao" leftIcon={<Kakao />} />
        <Button variant="round" size="xsmall" className="styleFacebook" leftIcon={<Facebook />} />
      </div>
      {toast && <Toast />}
    </div>
  );
};

export default profileContents;
