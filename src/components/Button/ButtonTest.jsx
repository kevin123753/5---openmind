import Button from "./Button";
import ArrowRightIcon from "../Icon/ArrowRightIcon";
import KakaoIcon from "../Icon/KakaoIcon";
import FacebookIcon from "../Icon/FacebookIcon";
import LinkIcon from "../Icon/LinkIcon";

const ButtonTest = () => {
  return (
    <div>
      <div
        style={{
          padding: "10px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Button
          variant="primary"
          size="medium"
          leftIcon={<ArrowRightIcon />}
          rightIcon={<ArrowRightIcon />}
        >
          질문받기
        </Button>
      </div>
      {/* <Button
          variant="outline"
          size="medium"
          leftIcon={<ArrowRightIcon />}
          rightIcon={<ArrowRightIcon />}
        >
          답변하러가기
        </Button>
        <Button
          variant="primary"
          size="medium"
          leftIcon={<ArrowRightIcon />}
          rightIcon={<ArrowRightIcon />}
          disabled={true}
        >
          질문받기
        </Button>
        <Button
          variant="outline"
          size="medium"
          leftIcon={<ArrowRightIcon />}
          rightIcon={<ArrowRightIcon />}
          disabled={true}
        >
          답변하러가기
        </Button>
        <Button
          variant="primary"
          size="small"
          leftIcon={<ArrowRightIcon />}
          rightIcon={<ArrowRightIcon />}
        >
          질문받기
        </Button>
        <Button
          variant="outline"
          size="small"
          leftIcon={<ArrowRightIcon />}
          rightIcon={<ArrowRightIcon />}
        >
          답변하러가기
        </Button>
        */}
      <br />
      <div
        style={{
          padding: "10px",
          display: "flex",
          gap: "20px",
          marginTop: "10px",
        }}
      >
        <Button variant="round" size="large" className="shadow-1">
          질문작성하기
        </Button>
        <Button variant="round" size="xsmall" className="styleKakao">
          <KakaoIcon />
        </Button>
        <Button variant="round" size="xsmall" className="styleFacebook">
          <FacebookIcon />
        </Button>
        <Button variant="round" size="xsmall" className="styleLink">
          <LinkIcon />
        </Button>
      </div>
    </div>
  );
};

export default ButtonTest;
