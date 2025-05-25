// public modules
import React from "react";
import { useNavigate } from "react-router-dom";

// custom
import { staticData } from "../staticData";
import { useFuncs } from "../funcs";

// css
import "./TestZone.scss";

// type
interface TestButtonProps {
  onClick: () => void;
  title: string;
  description: string;
}

// simple components
const TestButton: React.FC<TestButtonProps> = ({
  onClick,
  title,
  description,
}) => (
  <div className="row border shadow">
    <button className="test_btn btn btn-primary" onClick={onClick}>
      TEST
    </button>
    <div className="test_description">
      <h6 className="test_ds_title">{title}</h6>
      <p className="test_ds_detail">{description}</p>
    </div>
  </div>
);

const TestZone: React.FC = () => {
  const navigate = useNavigate();
  const { testUseFunc } = useFuncs();

  // funcs
  const test_funcs = {
    test_front_env: (): void => {
      const dog: string | undefined = process.env.REACT_APP_DOG;
      alert(dog ? dog : "Dog environment variable is not set.");
    },
    test_router: (): void => {
      console.log("router");
      navigate("/home");
    },
    test_connect_to_was: (): void => {
      if (staticData.endpoint) {
        fetch(`${staticData.endpoint}`)
          .then((response) => {
            if (!response) throw new Error("Network response was not ok");
            return response.json();
          })
          .then((data) => alert(data))
          .catch((error) =>
            alert("Error connecting to was: " + JSON.stringify(error.message))
          );
      }
    },
    test_use_funcs: (): void => {
      testUseFunc();
    },
  };

  return (
    <div className="test_zone_container border shadow">
      <h2 className="text-center mb-4">Test Zone</h2>
      <div className="test_zone_div">
        <TestButton
          onClick={test_funcs.test_front_env}
          title="환경변수 읽기 test"
          description="무찌뜨면 성공"
        />
      </div>
      <div className="test_zone_div">
        <TestButton
          onClick={test_funcs.test_router}
          title="라우터 test"
          description="home가면 성공"
        />
      </div>
      <div className="test_zone_div">
        <TestButton
          onClick={test_funcs.test_connect_to_was}
          title="was test"
          description="오브젝트 뜨면 성공"
        />
      </div>
      <div className="test_zone_div">
        <TestButton
          onClick={test_funcs.test_use_funcs}
          title="funcs test"
          description="셀렉터 testData뜨면 성공"
        />
      </div>
    </div>
  );
};

export default TestZone;
