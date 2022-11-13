import React, {useState} from 'react';
import {
    Button,
    Layout,
    PageHeader,
    Form,
    Input,
    Col,
    Row,
    Spin,
    Space
} from 'antd';

import styles from './styles.module.scss';
import {variableAPI} from "../../services/VariableService";
import {useParams} from "react-router-dom";
import {LoadingOutlined} from "@ant-design/icons";
import EditVarFields from "../../components/EditVarForm/EditVarFields";

const {Header, Content, Footer} = Layout;

const EditPage = () => {
    const [form] = Form.useForm();
    const [requiredMark] = useState('optional');

    const {id} = useParams();

    const {
        data: dataVariable,
        error: errorVariable,
        isLoading: isLoadingVariable,
    } = variableAPI.useFetchVariableByIdQuery(id);

    console.log(dataVariable, errorVariable, isLoadingVariable);

    const renderSpin = ({color, fontSize}) => {
        const icon = <LoadingOutlined style={{fontSize, color}} spin/>;
        return <Spin indicator={icon}/>
    }

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
                            <Button key="1" type="primary"
                                    loading={isLoadingVariable}>
                                Сохранить изменения
                            </Button>,]}
                    />
                    {isLoadingVariable ?
                        <Row align="middle">
                            <Space className={styles.spinner}>
                                {renderSpin({fontSize: 60})}
                            </Space>
                        </Row> :
                        <EditVarFields data={dataVariable}/>
                    }
                </Form>
            </Content>
            <Footer className={styles.footer}>Сделано с любовью ❤️
                2022</Footer>
        </Layout>
    </>);
};

export default EditPage;
