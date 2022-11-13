import {Col, Form, Input, Row} from "antd";
import styles from "../../pages/EditPage/styles.module.scss";
import React from "react";

export default function EditVarFields({initialValues}) {
    return <>
        <Row>
            <Col xs={24} md={12}>
                <Form.Item label="Имя переменной"
                           required
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
                    required
                    name="service"
                >

                    <Input placeholder="__default__"/>
                </Form.Item>
            </Col>
        </Row>
        <Row>
            <Col xs={24} md={12}>
                <Form.Item label="Значение" required
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
            <Col xs={24} md={12}>
                <Form.Item label="Предыдущее значение"
                           required

                           className={styles.formItem}>
                    <Input.TextArea
                        placeholder="{}"
                        readOnly
                        style={{
                            resize: "none",
                            height: "300px"
                        }}
                        value={initialValues.value}
                    />
                </Form.Item>
            </Col>
        </Row>
    </>
}
