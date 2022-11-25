import React, {useState} from "react";
import classnames from "classnames";
import Editor, {DiffEditor} from "@monaco-editor/react";
/* загрузка не с CDN, а с локального npm пакета */
import loader from "@monaco-editor/loader";
import * as monaco from "monaco-editor";
import {
  AutoComplete,
  Col,
  Form,
  Input,
  Row,
  Space,
  Spin,
  Typography,
} from "antd";

import styles from "../../pages/EditPage/styles.module.scss";

import {useGetServicesQuery} from "../../services/UserverService";

loader.config({monaco});

const prettifyJSON = (json) => {
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
};

const validateJSON = (_, value) =>
  new Promise((resolve, reject) => {
    if (isJSONValid(value)) {
      resolve();
    } else {
      reject("Значение должно быть валидным JSON");
    }
  });

export default function ConfigFormFields({form, initialValues, modeData}) {
  const config_value = Form.useWatch("config_value", form);
  const service_name = Form.useWatch("service_name", form);

  const {data: servicesData} = useGetServicesQuery();

  const allOptions = servicesData
    ? servicesData.items.map(({service_name}) => ({value: service_name}))
    : [];

  const [isNewService, setIsNewService] = useState(false);
  const [options, setOptions] = useState(allOptions);

  const handleServiceSearch = (value) => {
    const filtered = allOptions.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    );

    setOptions(filtered);

    setIsNewService(
      !filtered.filter((option) => option.value === value).length
    );
  };

  const handleServiceSelect = (value) => {
    setIsNewService(!options.filter((option) => option.value === value).length);
  };

  return (
    <>
      <Row>
        <Col xs={24} md={12}>
          <Form.Item
            label="Имя переменной"
            rules={[
              {
                required: true,
                message: "Введите имя переменной",
              },
            ]}
            className={styles.formItem}
            name="config_name"
          >
            <Input
              placeholder="MY_NICE_VAR"
              readOnly={!modeData.fields.config_name}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            className={styles.formItem}
            label="Сервис"
            rules={[
              {
                required: true,
                message: "Введите название сервиса",
              },
            ]}
            name="service_name"
            help={
              isNewService && (
                <Typography.Text type="primary">
                  Будет создан сервис&nbsp;{service_name}
                </Typography.Text>
              )
            }
          >
            <AutoComplete
              options={options}
              onSearch={handleServiceSearch}
              onSelect={handleServiceSelect}
              placeholder="__default__"
              readOnly={!modeData.fields.service_name}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={modeData.fields.initialValue ? 12 : 24}>
          <Form.Item
            label="Значение"
            rules={[
              {
                required: true,
                message: "Введите значение",
              },
              {
                validator: validateJSON,
              },
            ]}
            name="config_value"
            getValueProps={(value) => ({
              value: prettifyJSON(value),
              className: classnames("ant-input", {
                "ant-input-status-error": !isJSONValid(value),
              }),
            })}
            className={styles.formItem}
          >
            <Editor
              defaultLanguage="json"
              height="300px"
              options={{
                formatOnPaste: true,
                formatOnType: false,
                minimap: {
                  enabled: false,
                },
                overviewRulerLanes: 0,
                hideCursorInOverviewRuler: true,
                scrollbar: {
                  vertical: "hidden",
                },
                overviewRulerBorder: false,
                readOnly: !modeData.fields.config_value,
              }}
              loading={
                <Row align="middle">
                  <Space className={styles.spinner}>
                    <Spin />
                  </Space>
                </Row>
              }
            />
          </Form.Item>
        </Col>
        {modeData.fields.initialValue && (
          <Col xs={24} md={12}>
            <Form.Item label="Diff" className={styles.formItem}>
              <DiffEditor
                defaultLanguage="json"
                height="300px"
                modified={prettifyJSON(config_value)}
                original={prettifyJSON(initialValues.config_value)}
                options={{
                  renderSideBySide: false,
                  originalEditable: false,
                  readOnly: true,
                  minimap: {
                    enabled: false,
                  },
                  overviewRulerLanes: 0,
                  hideCursorInOverviewRuler: true,
                  scrollbar: {
                    vertical: "hidden",
                  },
                  overviewRulerBorder: false,
                  renderOverviewRuler: false,
                }}
                loading={
                  <Row align="middle">
                    <Space className={styles.spinner}>
                      <Spin />
                    </Space>
                  </Row>
                }
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
}
