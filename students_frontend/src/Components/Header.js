import React from "react";
import { PageHeader, Button } from 'antd';
import 'antd/dist/antd.css';

const Header = (props) => {
  const buttonText = {
    fontWeight: "bold"
  }
  return (
    <div>
      <PageHeader
      ghost={false}
      title="STUDENTS"
      extra={[
        <Button style={buttonText} key="1" type="primary" onClick={props.onOpenModal}>ADD NEW STUDENT</Button>
      ]}
    ></PageHeader>
    </div>
  )
}

export default Header;