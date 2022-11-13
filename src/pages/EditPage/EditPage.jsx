import React, {useState} from 'react';
import {Button, Layout, PageHeader, Form, Input, Col, Row, Space} from 'antd';

import styles from './styles.module.scss';

const {Header, Content, Footer} = Layout;

const EditPage = () => {
    const [form] = Form.useForm();
    const [requiredMark, setRequiredMarkType] = useState('optional');
    const onRequiredTypeChange = ({requiredMarkValue}) => {
        setRequiredMarkType(requiredMarkValue);
    };
    return (<>
        <Layout className={styles.layout}>
            <Header className={styles.header}>Динамические конфиги
                Userver</Header>
            <Content className={styles.content}>
                <Form
                    form={form}
                    layout="vertical"
                    onValuesChange={() => {
                    }}
                    requiredMark={requiredMark}
                >
                    <PageHeader
                        ghost={false}
                        onBack={() => window.history.back()}
                        title="Редактирование переменной"
                        extra={[<Button key="2">Отмена</Button>,
                            <Button key="1" type="primary">
                                Сохранить изменения
                            </Button>,]}
                    />

                    <Row>
                        <Col xs={24} md={12}>
                            <Form.Item label="Имя переменной" required
                                       className={styles.formItem}>
                                <Input placeholder="MY_NICE_VAR"/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                className={styles.formItem}
                                label="Сервис"
                                required
                            >
                                <Input placeholder="__default__"/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} md={12}>
                            <Form.Item label="Значение" required
                                       className={styles.formItem}>
                                <Input.TextArea placeholder="{}"
                                                style={{resize: "none", height: "300px"}}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item label="Предыдущее значение" required
                                       className={styles.formItem}>
                                <Input.TextArea placeholder="{}"
                                                readOnly
                                                style={{resize: "none", height: "300px"}}/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Content>
            <Footer className={styles.footer}>Сделано с любовью ❤️
                2022</Footer>
        </Layout>
    </>);
};

export default EditPage;
