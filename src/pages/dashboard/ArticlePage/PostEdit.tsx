import { InboxOutlined } from "@ant-design/icons";
import { Col, Form, Input, message, Modal, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { setLoading, setVisible } from "./ReducerActions";
import { ItemType, PostEditPropType } from "./Types";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import Dragger from "antd/es/upload/Dragger";
import { UploadChangeParam, UploadFile } from "antd/es/upload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function loadImage(photo: any): any {
  return new Promise((resolve) => {
    const reader = new FileReader();
    photo && reader.readAsDataURL(photo);
    reader.onload = () => {
      resolve(reader.result);
    };
  });
}

function PostEdit({ title, state, getItems, dispatch }: PostEditPropType) {
  // STATES
  // console.log(jwtAxios.defaults.headers.common.Authorization);

  const [editItem, setEditItem] = useState<ItemType>(null);
  const [form] = Form.useForm();
  //USEEFFECTS

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

    jwtAxios.get(`/articles/${state.editItemId}`).then((res) => {
      dispatch(setLoading({ ...state.loading, modal: false }));

      setEditItem(res.data.data.article);
    });
  }, [state.editItemId]);

  const postItem = (data: ItemType & { photo: any }) => {
    const formData: FormData = new FormData();

    data?.titleUz && formData.append("titleUz", data?.titleUz);
    data?.bodyUz && formData.append("bodyUz", data?.bodyUz);
    data?.titleRu && formData.append("titleRu", data?.titleRu);
    data?.bodyRu && formData.append("bodyRu", data?.bodyRu);
    data.photo?.file && formData.append("media", data.photo.file);

    console.log([...formData]);

    dispatch(setLoading({ ...state.loading, modal: true }));
    jwtAxios[editItem?._id ? "patch" : "post"](
      `/articles/${editItem?._id || ""}`,
      formData
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
    postItem(form.getFieldsValue());
  };

  //UPLOAD DRAGGER FUNCTIONS
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    info.file.status = "done";
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
                name={"bodyUz"}
                label="Body (uz)"
                rules={[
                  {
                    required: true,
                    message: "You need to provide body in uzbek",
                  },
                ]}
              >
                <ReactQuill theme="snow" />
              </Form.Item>
            </Col>
            <Col style={{ width: "47%" }}>
              {" "}
              <Form.Item
                name="titleRu"
                label={"Title (ru)"}
                rules={[
                  {
                    required: true,
                    message: "You need to provide title in russian",
                  },
                ]}
                hasFeedback
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"bodyRu"}
                label="Body (uz)"
                rules={[
                  {
                    required: true,
                    message: "You need to provide body in russian",
                  },
                ]}
              >
                <ReactQuill theme="snow" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="photo">
            <Dragger
              beforeUpload={() => false}
              onChange={handleChange}
              multiple={false}
              listType="picture"
              maxCount={1}
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
      </Spin>
    </Modal>
  );
}

export default PostEdit;
