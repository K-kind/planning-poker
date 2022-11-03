import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <h1>お探しのページは見つかりませんでした。</h1>
      <div>
        <Link to="/">TOPに戻る</Link>
      </div>
    </>
  );
};
