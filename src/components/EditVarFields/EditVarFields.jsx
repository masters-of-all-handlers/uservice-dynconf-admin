import {Col, Form, Input, Row} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React from "react";
import JSONView from "../JSONView/JSONView";
import Editor from "@monaco-editor/react";

const prettifyJSON = json => {
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch (e) {
    if (json) {
      return json;
    }
    return "";
  }
};

export default function EditVarFields({form, initialValues}) {
  const value = Form.useWatch("value", form);
  return <>
    <Row>
      <Col xs={24} md={12}>
        <Form.Item label="Имя переменной"
                   rules={[{
                     required: true, message: "Введите имя переменной"
                   }]}
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
          rules={[{
            required: true, message: "Введите название сервиса"
          }]}
          name="service"
        >

          <Input placeholder="__default__"/>
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col xs={24} md={initialValues?.value ? 12 : 24}>
        <Form.Item label="Значение"
                   rules={[{
                     required: true, message: "Введите значение"
                   }]}
                   name="value"
                   getValueProps={value => ({value: prettifyJSON(value)})}
                   className={styles.formItem}>
          <Editor
            defaultLanguage="json"
            height="300px"
            options={{insertSpaces: true, formatOnPaste: true}}
          >
          </Editor>
        </Form.Item>
      </Col>
      {initialValues?.value && <Col xs={24} md={12}>
        <Form.Item label="Предыдущее значение"
                   className={styles.formItem}>
          <JSONView json={initialValues?.value}
                    newJson={value || "{}"}/>
        </Form.Item>
      </Col>}
    </Row>
  </>
}
