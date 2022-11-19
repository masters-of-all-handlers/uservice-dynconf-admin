import {Col, Form, Input, Row, Space, Spin} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React from "react";
import Editor, {DiffEditor} from "@monaco-editor/react";
import classnames from "classnames";

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

const isJSONValid = (json) => {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
}

const validateJSON = (_, value) => new Promise(
  (resolve, reject) => {
    if (isJSONValid(value)) {
      resolve();
    } else {
      reject("Значение должно быть валидным JSON");
    }
  }
);

export default function EditVarFields({form, initialValues}) {
  const {config_name, config_value, service} = initialValues;

  const value = Form.useWatch("config_value", form);
  return <>
    <Row>
      <Col xs={24} md={12}>
        <Form.Item label="Имя переменной"
                   rules={[{
                     required: true, message: "Введите имя переменной"
                   }]}
                   className={styles.formItem}
                   name="name"
                   initialValue={config_name}
        >
          <Input readOnly={config_name} />
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

          <Input readOnly={service}/>
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col xs={24} md={config_value ? 12 : 24}>
        <Form.Item label="Значение"
                   rules={[{
                     required: true, message: "Введите значение",
                   }, {
                     validator: validateJSON
                   }]}
                   name="config_value"
                   getValueProps={value => ({
                     value: prettifyJSON(config_value),
                     className: classnames("ant-input", {
                       "ant-input-status-error": !isJSONValid(value)
                     })
                   })}
                   className={styles.formItem}>
          <Editor
            defaultLanguage="json"
            height="300px"
            options={{
              insertSpaces: true,
              formatOnPaste: true,
              minimap: {
                enabled: false
              }
            }}
            loading={
              <Row align="middle">
                <Space className={styles.spinner}>
                  <Spin/>
                </Space>
              </Row>
            }
          />
        </Form.Item>
      </Col>
      {config_value && <Col xs={24} md={12}>
        <Form.Item label="Diff" className={styles.formItem}>
          <DiffEditor
            defaultLanguage="json"
            height="300px"
            modified={prettifyJSON(value)}
            original={prettifyJSON(config_value)}
            options={{
              renderSideBySide: false,
              originalEditable: false,
              readOnly: true,
              minimap: {
                enabled: false
              }
            }}
            loading={
              <Row align="middle">
                <Space className={styles.spinner}>
                  <Spin/>
                </Space>
              </Row>
            }
          />
        </Form.Item>
      </Col>}
    </Row>
  </>
}
