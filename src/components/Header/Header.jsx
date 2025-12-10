import { useState } from "react";
import { Menu, Layout, Typography, Avatar } from "antd";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const { Header } = Layout;
const { Text } = Typography;

function AppHeader() {
  const [menuItem, setMenuItem] = useState(["main"]);
  const navigate = useNavigate();

  const items = [
    {
      key: "main",
      label: "Главная",
      onClick: () => {
        setMenuItem(["main"]);
        navigate("/");
      },
    },
    {
      key: "movies",
      label: "Фильмы",
      onClick: () => {
        setMenuItem(["movies"]);
        navigate("/movies");
      },
    },
  ];

  return (
    <Header className="header-main">
      <Menu
        mode="horizontal"
        selectedKeys={menuItem}
        items={items}
        style={{
          width: "50%",
          flex: 1,
          minWidth: 0,
          border: "none",
        }}
      />
      <div
        style={{ display: "flex", gap: 10, alignItems: "center" }}
        onClick={() => {
          setMenuItem(["user"]);
          navigate("/about_me");
        }}
      >
        <Avatar>K</Avatar>
        <div>
          <Text style={{ display: "block" }}>Ксения Ц.</Text>
          <Text style={{ display: "block" }} type="secondary">
            Критик
          </Text>
        </div>
      </div>
    </Header>
  );
}

export default AppHeader;
