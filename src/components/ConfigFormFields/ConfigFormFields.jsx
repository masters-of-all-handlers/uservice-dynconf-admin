import React, {useState} from "react";
import Editor, {DiffEditor} from "@monaco-editor/react";

/* загрузка не с CDN, а с локального npm пакета */
import loader from "@monaco-editor/loader";
import * as monaco from "monaco-editor";
import {AutoComplete, Col, Form, Input, Row, Typography} from "antd";

import styles from "./styles.module.scss";
import {rules, getValuePropsConfigValue} from "./fieldParams";
import {editorOptions, diffEditorOptions} from "./editorOptions";

import Spinner from "../Spinner/Spinner";

import {useGetServicesQuery} from "../../services/UserverService";
import {prettifyJSON} from "../../utils/json";

loader.config({monaco});

export default function ConfigFormFields({form, initialValues, modeData}) {
  const config_value = Form.useWatch("config_value", form);
  const service_name = Form.useWatch("service_name", form);

  const {data: servicesData} = useGetServicesQuery();

  const hasNotConfigNameField = !modeData.hasFields.config_name;
  const hasNotConfigValueField = !modeData.hasFields.config_value;
  const hasNotServiceNameField = !modeData.hasFields.service_name;
  const {hasInitialValue} = modeData;

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
            <Input placeholder="MY_NICE_VAR" disabled={hasNotConfigNameField} />
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
              disabled={hasNotServiceNameField}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={hasInitialValue ? 12 : 24}>
          <Form.Item
            className={styles.formItem}
            label="Значение"
            name="config_value"
            rules={rules.configValue}
            getValueProps={getValuePropsConfigValue}
          >
            <Editor
              defaultLanguage="json"
              height="300px"
              options={{
                ...editorOptions,
                readOnly: hasNotConfigValueField,
              }}
              loading={<Spinner />}
            />
          </Form.Item>
        </Col>

        {hasInitialValue && (
          <Col xs={24} md={12}>
            <Form.Item label="Diff" className={styles.formItem}>
              <DiffEditor
                defaultLanguage="json"
                height="300px"
                modified={prettifyJSON(config_value)}
                original={prettifyJSON(initialValues.config_value)}
                options={diffEditorOptions}
                loading={<Spinner />}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </>
  );
}
