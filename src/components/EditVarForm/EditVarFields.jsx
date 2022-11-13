import {Col, Form, Input, Row} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React from "react";

export default function EditVarFields({data}) {
    return <>
        <Row>
            <Col xs={24} md={12}>
                <Form.Item label="Имя переменной"
                           required
                           className={styles.formItem}>
                    <Input placeholder="MY_NICE_VAR"
                           value={data.name}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item
                    className={styles.formItem}
                    label="Сервис"
                    required
                >
                    <Input placeholder="__default__"
                           value={data.service}/>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col xs={24} md={12}>
                <Form.Item label="Значение" required
                           className={styles.formItem}>
                    <Input.TextArea placeholder="{}"
                                    style={{
                                        resize: "none",
                                        height: "300px"
                                    }}
                                    value={data.value}/>
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item label="Предыдущее значение"
                           required
                           className={styles.formItem}>
                    <Input.TextArea placeholder="{}"
                                    readOnly
                                    style={{
                                        resize: "none",
                                        height: "300px"
                                    }}
                                    value={data.value}/>
                </Form.Item>
            </Col>
        </Row>
    </>
}
