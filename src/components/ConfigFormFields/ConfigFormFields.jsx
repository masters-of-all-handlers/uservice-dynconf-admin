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
import {useAutoComplete} from "../../hooks/useAutoComplete";

loader.config({monaco});

export default function ConfigFormFields({form, initialValues, modeData}) {
  const config_value = Form.useWatch("config_value", form);
  const service_name = Form.useWatch("service_name", form);

  const {data: servicesData} = useGetServicesQuery();

  const serviceNameAutoComplete = useAutoComplete({
    data: servicesData,
    fieldName: "service_name",
  });

  const hasNotConfigNameField = !modeData.hasFields.config_name;
  const hasNotConfigValueField = !modeData.hasFields.config_value;
  const hasNotServiceNameField = !modeData.hasFields.service_name;
  const {hasInitialValue} = modeData;

  const serviceNameHelp = serviceNameAutoComplete.isNewItem && (
    <Typography.Text type="primary">
      Будет создан новый сервис:&nbsp;{service_name}
    </Typography.Text>
  );

  return (
    <div className={styles.fields}>
      <Form.Item
        label="Имя переменной"
        name="config_name"
        rules={rules.configName}
        wrapperCol={{
          span: 9,
        }}
      >
        <Input placeholder="MY_NICE_VAR" disabled={hasNotConfigNameField} />
      </Form.Item>

      <Form.Item
        label="Сервис"
        name="service_name"
        rules={rules.serviceName}
        help={serviceNameHelp}
        wrapperCol={{
          span: 9,
        }}
      >
        <AutoComplete
          options={serviceNameAutoComplete.options}
          onSearch={serviceNameAutoComplete.handleOnSearch}
          onSelect={serviceNameAutoComplete.handleOnSelect}
          placeholder="__default__"
          disabled={hasNotServiceNameField}
        />
      </Form.Item>

      <Form.Item label="Значение">
        <Form.Item
          className={styles.editorItem}
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

        {hasInitialValue && (
          <Form.Item className={styles.editorItem}>
            <DiffEditor
              defaultLanguage="json"
              height="300px"
              modified={prettifyJSON(config_value)}
              original={prettifyJSON(initialValues.config_value)}
              options={diffEditorOptions}
              loading={<Spinner />}
            />
          </Form.Item>
        )}
      </Form.Item>
    </div>
  );
}
