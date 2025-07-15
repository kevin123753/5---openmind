import Input from "./Input";
import PersonIcon from "../Icon/PersonIcon";

const InputTest = () => {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Input
        placeholder="이름을 입력하세요"
        icon={<PersonIcon />}
        variant="primary"
        size="medium"
      />
      {/* <Input
        placeholder="이름을 입력하세요"
        icon={<PersonIcon />}
        variant="outline"
        size="medium"
      />

      <Input
        type="textarea"
        placeholder="내용을 입력하세요"
        variant="filled"
        size="large"
      />
      비활성화
      <Input
        placeholder="이름을 입력하세요"
        icon={<PersonIcon />}
        variant="primary"
        size="medium"
        disabled
      />
      <Input
        type="textarea"
        placeholder="의견을 입력하세요"
        variant="outline"
        size="large"
        disabled
      />*/}
    </div>
  );
};

export default InputTest;
