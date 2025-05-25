// public modules
import { useDispatch, useSelector } from "react-redux";

// custom
import {} from "./staticData";

// types
import { ReduxState } from "./types/index";

export const useFuncs = () => {
  // default
  const dispatch = useDispatch();
  const reduxTestData = useSelector((state: ReduxState) => state.data.testData);

  // shared funcs
  const sharedFunc = (): void => {
    console.log("공용함수");
  };

  return {
    testUseFunc: (): void => {
      alert(reduxTestData);
      dispatch({ type: "SET_TEST_DATA", value: "무찌궁뎅이" });
    },
    sharedFunc,
  };
};
