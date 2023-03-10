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
  Row,
  Space,
  Spin,
} from "antd";
import MainTable from "../../../components/Table";
import { useEffect, useMemo, useReducer } from "react";
import PostEdit from "./PostEdit";
import {
  setEditItemId,
  setInput,
  setItems,
  setLoading,
  setVisible,
} from "./ReducerActions";
import { appActionType, appStateType, TestType } from "./Types";
import jwtAxios from "auth/jwt-auth/jwtaxios";

function reducer(state: appStateType, action: appActionType): appStateType {
  switch (action.type) {
    case "SET_ITEMS":
      return { ...state, items: action.payload };
    case "SET_VISIBLE":
      return { ...state, visible: action.payload };
    case "SET_EDIT_ITEM_ID":
      return { ...state, editItemId: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_INPUT":
      return { ...state, input: action.payload };
    default:
      return state;
  }
}

const QuizPage = () => {
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    editItemId: "",
    input: "",
    loading: { table: false, modal: false },
    items: [],
  });
  const { state: linkState }: { state: { title: string } } = {
    state: { title: "Tests" },
  };

  const filteredItems = useMemo(
    () =>
      state.items.filter((item: TestType) =>
        item?.question?.toLowerCase().includes(state.input)
      ),
    [state.input, state.items]
  );

  const getItems = () => {
    dispatch(setItems([]));
    dispatch(setLoading({ ...state.loading, table: true }));

    jwtAxios.get(`/tests`).then((res) => {
      const tests: TestType[] = res.data.data.tests;

      dispatch(setLoading({ ...state.loading, table: false }));
      dispatch(setItems(tests));
    });
  };

  const deleteItem = ({ _id: id }: { _id: string }) => {
    dispatch(setLoading({ ...state.loading, table: true }));
    jwtAxios
      .delete(`/tests/${id}`)
      .then(() => {
        getItems();
        message.success("Deleted succesfully");
      })
      .catch((err) => {
        dispatch(setLoading({ ...state.loading, table: false }));

        message.error(err.message, 3);
        dispatch(setLoading({ ...state.loading, modal: false }));
      });
  };

  const editBtn = (item: TestType) => {
    dispatch(setEditItemId(item?._id || ""));
    dispatch(setVisible(true));
  };

  useEffect(getItems, []);

  const columns = [
    {
      key: 1,
      dataIndex: "question",
      title: "Question",
    },

    {
      key: 4,
      title: "Image",
      dataIndex: "image",
      width: 80,
      render: (image: string) => {
        return image ? (
          <Image
            src={`${image}`}
            style={{ height: 40, width: 40, objectFit: "cover" }}
            preview={{
              maskClassName: "customize-mask",
              mask: <EyeOutlined />,
            }}
          />
        ) : (
          <Avatar size={"large"} shape="square" icon={<FileImageOutlined />} />
        );
      },
    },
  ];

  return (
    <>
      <h2>{linkState.title} list</h2>

      <Row gutter={12} style={{ padding: "30px 0" }}>
        <Col span={16}>
          <Input
            size="middle"
            placeholder="Search..."
            onChange={(e) => dispatch(setInput(e.target.value.toLowerCase()))}
          ></Input>
        </Col>
        <Col span={4}>
          <Button block onClick={getItems} disabled={state.loading.table}>
            <Space>
              {state.loading.table ? <SyncOutlined spin /> : ""}
              Refresh
            </Space>
          </Button>
        </Col>
        <Col span={4}>
          <Button
            block
            type="primary"
            onClick={() => {
              dispatch(setEditItemId(""));
              dispatch(setVisible(true));
            }}
          >
            Add
          </Button>
        </Col>
      </Row>
      <Spin spinning={state.loading.table}>
        <MainTable
          datas={filteredItems}
          cols={columns}
          onEdit={editBtn}
          onDelete={deleteItem}
        />
      </Spin>
      <PostEdit
        title={linkState.title}
        getItems={getItems}
        state={state}
        dispatch={dispatch}
      ></PostEdit>
    </>
  );
};

export default QuizPage;
