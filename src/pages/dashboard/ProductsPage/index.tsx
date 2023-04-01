import {
  EyeOutlined,
  FileImageOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  message,
  Pagination,
  Row,
  Space,
  Spin,
  Table,
} from "antd";
import MainTable from "../../../components/Table";
import { useEffect, useMemo, useState } from "react";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import { type } from "os";
import { log } from "console";
import { Link } from "react-router-dom";
import useDebouncer from "hooks/useDebouncer";

type ProductTypes = {
  id: number;
  productName: string;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [query, setQuery] = useState<{
    page: number;
    size: number;
    search: string;
  }>({
    page: 1,
    size: 10,
    search: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const debouncedSearchQuery = useDebouncer(query.search, 1000);

  const filteredProducts = useMemo(() => {
    let filteredTitles = products.filter((products: ProductTypes) =>
      products.productName.toLowerCase().includes(query.search.toLowerCase())
    );

    let sortedTitles = filteredTitles.sort((a, b) => {
      let aStartsWithInput = a.productName
        .toLowerCase()
        .startsWith(query.search.toLowerCase());
      let bStartsWithInput = b.productName
        .toLowerCase()
        .startsWith(query.search.toLowerCase());
      if (aStartsWithInput && !bStartsWithInput) {
        return -1;
      } else if (!aStartsWithInput && bStartsWithInput) {
        return 1;
      } else {
        return a.productName.localeCompare(b.productName);
      }
    });
    return sortedTitles;
  }, [products]);

  const getItems = () => {
    setLoading(true);
    setProducts([]);
    !debouncedSearchQuery ?   jwtAxios
      .get(
        `/variations?size=${query.size}&page=${query.page}`
      )
      .then((res) => {
        console.log(res.data);

        setTotalCount(res.data.total_count);

        setProducts(res.data.items);
        setLoading(false);
      }):jwtAxios
      .get(
        `/variations?size=1200`
      )
      .then((res) => {
        console.log(res.data);

        setTotalCount(res.data.total_count);

        setProducts(res.data.items);
        setLoading(false);
      })
  };

  useEffect(getItems, [debouncedSearchQuery, query.page,query.size]);

  const columns = [
    {
      key: 1,
      dataIndex: "productName",
      title: "Product Name",
      render: (title: string, record: ProductTypes) => {
        return <Link to={`/dashboard/products/${record.id}`}>{title}</Link>;
      },
    },
  ];

  console.log(query);
  

  return (
    <>
      <h2>Products list</h2>

      <Row gutter={12} style={{ padding: "30px 0" }}>
        <Col span={20}>
          <Input
            size="middle"
            placeholder="Search..."
            onChange={(e) => setQuery({ ...query, search: e.target.value })}
          ></Input>
       
        </Col>
        <Col span={4}>
          <Button
            block
            onClick={getItems}
            type="primary"

            // disabled={state.loading.table}
          >
            <Space>
              {loading ? <SyncOutlined spin /> : ""}
              Refresh
            </Space>
          </Button>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={filteredProducts}
          pagination={false}
        />
      </Spin>
      <br />
      <br />
      {!debouncedSearchQuery ?<Pagination
        onChange={function (page, size) {
          setQuery({ ...query, page, size });
        }}
        total={totalCount}
         showSizeChanger
      />:""}
    </>
  );
};

export default ProductsPage;
