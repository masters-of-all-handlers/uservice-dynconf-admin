import {Col, Form, Input, Row} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React from "react";

export default function EditVarFields({initialValues}) {
  return <>
    <Row>
      <Col xs={24} md={12}>
        <Form.Item label="Имя переменной"
                   rules={[
                     {
                       required: true,
                       message: "Введите имя переменной"
                     }
                   ]}
                   className={styles.formItem}
                   name="name"
        >
          <Input placeholder="MY_NICE_VAR"/>
        </Form.Item>
      </Col>
      <Col xs={24} md={12}>
        <Form.Item
          className={styles.formItem}
          label="Сервис"
          rules={[
            {
              required: true,
              message: "Введите название сервиса"
            }
          ]}
          name="service"
        >

          <Input placeholder="__default__"/>
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col xs={24} md={initialValues?.value ? 12 : 24}>
        <Form.Item label="Значение"
                   rules={[
                     {
                       required: true,
                       message: "Введите значение"
                     }
                   ]}
                   name="value"
                   className={styles.formItem}>
          <Input.TextArea placeholder="{}"
                          style={{
                            resize: "none",
                            height: "300px"
                          }}
          />
        </Form.Item>
      </Col>
      {initialValues?.value &&
        <Col xs={24} md={12}>
          <Form.Item label="Предыдущее значение"
                     className={styles.formItem}>
            <Input.TextArea
              placeholder="{}"
              readOnly
              style={{
                resize: "none",
                height: "300px"
              }}
              value={initialValues?.value}
            />
          </Form.Item>
        </Col>
      }
    </Row>
  </>
}
