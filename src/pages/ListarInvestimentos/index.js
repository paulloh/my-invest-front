import "antd/dist/antd.css";
import { Table, Button, message, Layout, Menu } from "antd";
import { render } from "@testing-library/react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import InvestimentoService from "../../service/InvestimentoService";

const { Header, Content, Footer } = Layout;
const { Column } = Table;

export default function ListarInvestimentos() {
  const [investimentos, setInvestimentos] = useState([]);

  useEffect(() => {
    refreshInvestments();
    return () => {};
  }, []);

  async function refreshInvestments() {
    InvestimentoService.retrieveAllInvestments().then((response) => {
      setInvestimentos(response.data);
    });
  }

  function remove(code) {
    InvestimentoService.deleteInvestment(code)
      .then(() => {
        message.success("Registro removido com sucesso!");
        window.location.reload();
      })
      .catch(message.warn("Falha ao remover o registo!"));
  }

  return (
    <div className="container">
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
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
            <h2>Investimentos</h2>
            <Table dataSource={investimentos}>
              <Column
                title="Código do ativo"
                dataIndex="activeCode"
                key="activeCode"
              />
              <Column title="Valor" dataIndex="quoteValue" key="quoteValue" />
              <Column
                title="Quantidade de cotas"
                dataIndex="quotesQuantity"
                key="quotesQuantity"
              />
              <Column
                title="Data da compra"
                dataIndex="purchaseDate"
                key="purchaseDate"
              />
              <Column title="Categoria" dataIndex="category" key="category" />
              <Column
                title="Remover"
                key="remove"
                render={(text, record) => (
                  <Button onClick={() => remove(record.code)} type="primary">
                    Remover
                  </Button>
                )}
              />
            </Table>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  );
}
