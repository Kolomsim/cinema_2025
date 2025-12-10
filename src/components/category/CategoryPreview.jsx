import { Avatar, Flex, Typography } from "antd";

const CategoryPreview = ({ item }) => {
  return (
    <Flex gap={20} align="center">
      <Avatar style={{ background: "white" }} size={"large"}>
        <img style={{ width: 25 }} src={"https://" + item.icon} />
      </Avatar>
      <Typography.Text>{item.name}</Typography.Text>
    </Flex>
  );
};

export default CategoryPreview;
