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

import styles from "./styles.module.scss";
import {rules} from "./fieldParams";

import {useGetServicesQuery} from "../../services/UserverService";
import {prettifyJSON, isJSONValid} from "../../utils/json";

loader.config({monaco});

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
            className={styles.formItem}
            label="Имя переменной"
            name="config_name"
            rules={rules.configName}
          >
            <Input
              placeholder="MY_NICE_VAR"
              disabled={!modeData.fields.config_name}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            className={styles.formItem}
            label="Сервис"
            name="service_name"
            rules={rules.serviceName}
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
              disabled={!modeData.fields.service_name}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={modeData.fields.initialValue ? 12 : 24}>
          <Form.Item
            className={styles.formItem}
            label="Значение"
            name="config_value"
            rules={rules.configValue}
            getValueProps={(value) => ({
              value: prettifyJSON(value),
              className: classnames("ant-input", {
                "ant-input-status-error": !isJSONValid(value),
              }),
            })}
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
