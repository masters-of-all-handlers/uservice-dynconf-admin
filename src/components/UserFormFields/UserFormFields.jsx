import {
  AutoComplete,
  Col,
  Form,
  Input,
  Row,
} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React from "react";

export default function UserFormFields({modeData}) {
  return <>
    <Row>
      <Col xs={24} md={12}>
        <Form.Item label="Имя пользователя"
                   rules={[{
                     required: true, message: "Введите имя пользователя"
                   }]}
                   className={styles.formItem}
                   name="login"
        >
          <Input placeholder="ivanovivan" readOnly={!modeData.fields.login}/>
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item label="Пароль"
                   rules={[{
                     required: true, message: "Введите пароль"
                   }]}
                   className={styles.formItem}
                   name="password"
        >
          <Input.Password readOnly={!modeData.fields.password}/>
        </Form.Item>
      </Col>
    </Row>
  </>
}
