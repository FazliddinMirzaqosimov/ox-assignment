import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { setLoading, setVisible } from "./ReducerActions";
import { PostEditPropType } from "./Types";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import { JwtUserType } from "auth/jwt-auth/JWTAuthAuthProvider";
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import ReactQuill from "react-quill";
import { CategoryType } from "../Category/Types";
import Category from "../Category";

function PostEdit({ title, state, getItems, dispatch }: PostEditPropType) {
  // STATES

  const [editItem, setEditItem] = useState<JwtUserType>(null);
  const [categoriyOptions, setCatgoryOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [form] = Form.useForm();
  //USEEFFECTS

  useEffect(() => {
    jwtAxios.get("/categories").then((res) => {
      const options = res.data.data.categories.map((category: CategoryType) => {
        return { label: category.nameUz, value: category._id };
      });
      setCatgoryOptions(options);
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(editItem);
  }, [editItem]);

  //FETCH requests
  useEffect(() => {
    form.resetFields();
    if (!state.editItemId) {
      setEditItem(null);
      return;
    }
    dispatch(setLoading({ ...state.loading, modal: true }));

    jwtAxios.get(`/sections/${state.editItemId}`).then((res) => {
      dispatch(setLoading({ ...state.loading, modal: false }));

      setEditItem(res.data.data.section);
    });
  }, [state.editItemId]);

  const postItem = (data: JwtUserType & { photo: any }) => {
    dispatch(setLoading({ ...state.loading, modal: true }));
    console.log(data);
    console.log(jwtAxios.defaults.headers.common);

    jwtAxios[editItem?._id ? "patch" : "post"](
      `/sections/${editItem?._id || ""}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .finally(() => {
        dispatch(setLoading({ ...state.loading, modal: false }));
      })
      .then(() => {
        message.success("Succesfuly posted", 2);
        if (!editItem?._id) {
          form.resetFields();
        }
        dispatch(setVisible(false));
        getItems();
      })
      .catch((err: any) => {
        console.log(err);

        message.error(err.response?.data?.error || err.message, 3);
      });
  };

  // Handlers
  const handleSubmit = () => {
    console.log(form.getFieldsValue());

    // postItem(form.getFieldsValue());
  };

  //UPLOAD DRAGGER FUNCTIONS
  const handleChange = () => {
    console.log(12);
  };

  return (
    <Modal
      onCancel={() => {
        dispatch(setVisible(false));
      }}
      onOk={form.submit}
      okText={"OK"}
      visible={state.visible}
      style={{ top: 50 }}
      title={title}
      width={900}
    >
      <div className="modal-content">
        <Spin spinning={state.loading.modal}>
          <Form
            form={form}
            onFinish={handleSubmit}
            // labelCol={{ span: 5 }}
            layout={"vertical"}
            initialValues={{
              role: "user",
            }}
          >
            <Row justify={"space-between"}>
              <Col style={{ width: "47%" }}>
                {" "}
                <Form.Item
                  name="titleUz"
                  label={"Title (uz)"}
                  rules={[
                    {
                      required: true,
                      message: "You need to provide title in uzbek",
                    },
                  ]}
                  hasFeedback
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name={"descriptionUz"}
                  label="Description (uz)"
                  rules={[
                    {
                      required: true,
                      message: "You need to provide description in uzbek",
                    },
                  ]}
                >
                  <ReactQuill theme="snow" />
                </Form.Item>
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }) => (
                        <Space
                          key={key}
                          style={{ display: "flex", marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            {...restField}
                            name={[name, "first"]}
                            rules={[
                              { required: true, message: "Missing variable" },
                            ]}
                          >
                            <Input placeholder="Variable" />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            name={[name, "last"]}
                            rules={[
                              { required: true, message: "Missing value" },
                            ]}
                          >
                            <Input placeholder="Value" />
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => remove(name)} />
                        </Space>
                      ))}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => add()}
                          block
                          icon={<PlusOutlined />}
                        >
                          Add field
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
            <Form.Item name="category">
              <Select
                defaultValue={categoriyOptions[0].value}
                style={{ width: "100%" }}
                onChange={handleChange}
                options={categoriyOptions}
              />
            </Form.Item>

            <Form.Item name="photos">
              <Dragger
                beforeUpload={() => false}
                onChange={handleChange}
                multiple={true}
                maxCount={5}
                listType="picture"
                accept="image/png, image/jpeg, image/jfif, image/svg"
              >
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibit from
                  uploading company data or other band files
                </p>
              </Dragger>
            </Form.Item>
          </Form>
        </Spin>{" "}
      </div>
    </Modal>
  );
}

export default PostEdit;
