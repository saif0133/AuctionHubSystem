import TopBar from "./components/TopBar";

const userName = "";
const userProfile =
  "https://gratisography.com/wp-content/uploads/2024/01/gratisography-cyber-kitty-1170x780.jpg";

function UserBar() {
  return (
    <div className="testbar">
      <TopBar Name={userName} image={userProfile}></TopBar>
    </div>
  );
}

export default UserBar;
