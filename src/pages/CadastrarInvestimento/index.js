import {
  Form,
  Button,
  message,
  DatePicker,
  Layout,
  Menu,
  Input,
  InputNumber,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryService from "../../service/CategoryService";
import investmentService from "../../service/InvestimentoService";

const { Header, Content, Footer } = Layout;
const { Option } = Select;

export default function CadastrarInvestimento() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(categories[0]);

  useEffect(() => {
    refreshCategories();
    return () => {};
  }, []);

  async function refreshCategories() {
    CategoryService.retrieveAllCategories().then((response) => {
      setCategories(response.data);
    });
  }

  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 3,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 4,
      span: 8,
    },
  };

  const onFinish = (values) => {
    investmentService.createInvestment(values)
    .then(() => {
      message.success("Investimento cadastrado com sucesso!");
      window.location.reload();
    })
    .catch( message.success("Falha ao cadastrar investimento!"));
   
  };

  const onFinishFailed = (errorinfo) => {
    message.warn("Não foi possível cadastrar o investimento");
    console.log("Failed:", errorinfo);
  };

  function handleChange(value) {
    setCategory(value);
  }

  return (
    <div className="container">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/cadastrar-investimento">Cadastrar Investimento</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/listar-investimentos">Listar Investimentos</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <h2>Cadastrar Investimento</h2>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Código do ativo"
                name="activeCode"
                rules={[
                  {
                    required: true,
                    message: "Insira o código do ativo!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Valor do ativo"
                name="quoteValue"
                rules={[
                  {
                    required: true,
                    message: "Insira o valor do ativo!",
                  },
                ]}
              >
                <InputNumber step="0.00"  min="0" />
              </Form.Item>
              <Form.Item
                label="Quantidade de cotas"
                name="quotesQuantity"
                rules={[
                  {
                    required: true,
                    message: "Insira a quantidade de cotas!",
                  },
                ]}
              >
                <InputNumber min="0" />
              </Form.Item>
              <Form.Item
                label="Data da Compra"
                name="purchaseDate"
                rules={[
                  {
                    required: true,
                    message: "Informe a data da compra!",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
              <Form.Item label="Categoria" name="category">
                <Select onChange={handleChange}>
                  {categories.map((item, index) => {
                    return (
                      <Option key={item.code} value={item.code} selected={item.code}>
                        {item.description}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}
