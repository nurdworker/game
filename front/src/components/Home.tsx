import React from "react";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>환영합니다! 😊</p>
      <button onClick={() => alert("버튼 클릭!")}>클릭</button>
    </div>
  );
};

export default Home;
