import {AutoComplete, Col, Form, Input, Row, Space, Spin} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React, {useState} from "react";
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

export default function ConfigFormFields({form, initialValues, modeData}) {
  const value = Form.useWatch("value", form);
  const allOptions = [{value: "__default__"}, {value: "non-default!"}];
  const [options, setOptions] = useState(allOptions);
  const handleServiceSearch = value => {
    setOptions(allOptions.filter(option => option.value.toLowerCase().includes(value.toLowerCase())));
  };
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
          <Input placeholder="MY_NICE_VAR" readOnly={!modeData.fields.name}/>
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
          <AutoComplete
            options={options}
            onSearch={handleServiceSearch}
            placeholder="__default__"
            readOnly={!modeData.fields.service}
          />
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col xs={24} md={modeData.fields.initialValue ? 12 : 24}>
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
              },
              readOnly: !modeData.fields.value
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
      {modeData.fields.initialValue && <Col xs={24} md={12}>
        <Form.Item label="Diff" className={styles.formItem}>
          <DiffEditor
            defaultLanguage="json"
            height="300px"
            modified={prettifyJSON(value)}
            original={prettifyJSON(initialValues?.value)}
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
