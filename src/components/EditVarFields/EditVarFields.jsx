import {Col, Form, Input, Row} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React from "react";
import JSONView from "../JSONView/JSONView";
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
                     required: true, message: "Введите значение",
                   }, {
                     validator: validateJSON
                   }]}
                   name="value"
                   getValueProps={value => ({
                     value: prettifyJSON(value),
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
          />
        </Form.Item>
      </Col>
      {initialValues?.value && <Col xs={24} md={12}>
        <Form.Item label="Diff" className={styles.formItem}>
          <DiffEditor
            defaultLanguage="json"
            height="300px"
            modified={prettifyJSON(form.getFieldValue("value"))}
            original={prettifyJSON(initialValues?.value)}
            options={{
              renderSideBySide: false,
              originalEditable: false,
              readOnly: true,
              minimap: {
                enabled: false
              }
            }}
          />
        </Form.Item>
      </Col>}
    </Row>
  </>
}
