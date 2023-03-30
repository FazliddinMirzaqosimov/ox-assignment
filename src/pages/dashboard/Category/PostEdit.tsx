import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { setLoading, setVisible } from "./ReducerActions";
import { PostEditPropType, CategoryType, TopicType } from "./Types";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import Dragger from "antd/es/upload/Dragger";
import { UploadChangeParam, UploadFile } from "antd/es/upload";

function PostEdit({ title, state, getItems, dispatch }: PostEditPropType) {
  // STATES

  const [editItem, setEditItem] = useState<CategoryType | null>(null);
  const [selectOptions, setSelectOptions] = useState<
    { value: string; label: string }[] | undefined
  >(undefined);
  const [form] = Form.useForm();
  //USEEFFECTS

  useEffect(() => {
    form.setFieldsValue(editItem);
  }, [editItem]);

  //FETCH requests
  const getTopics = async (func: (topic: TopicType[]) => void) => {
    const res = await jwtAxios.get("/sections");
    func(res.data.data.sections);
  };
  useEffect(() => {
    getTopics((topics) => {
      setSelectOptions(
        topics.map((topic) => {
          return { value: topic._id, label: topic.title };
        })
      );
    });
  }, []);

  useEffect(() => {
    form.resetFields();
    if (!state.editItemId) {
      setEditItem(null);
      return;
    }
    dispatch(setLoading({ ...state.loading, modal: true }));

    jwtAxios.get(`/tests/${state.editItemId}`).then((res) => {
      dispatch(setLoading({ ...state.loading, modal: false }));
      const formValue = res.data.data.test;
      formValue.variants = formValue.variants
        .filter((variant: { title: string; isAnswer: boolean }) => {
          if (variant.isAnswer) {
            formValue.answer = variant.title;
          }
          return !variant.isAnswer;
        })
        .map((variant: { title: string }) => {
          return { variant: variant.title };
        });
      formValue.topic = formValue.section;
      setEditItem(formValue);
    });
  }, [state.editItemId]);

  const postItem = (data: CategoryType & { image: any }) => {
    console.log(data);

    const formData: FormData = new FormData();

    data.nameUz && formData.append("nameUz", data.nameUz);
    data.nameRu && formData.append("nameRu", data.nameRu);
    data.image?.file && formData.append("media", data.image.file);

    console.log([...formData]);
    dispatch(setLoading({ ...state.loading, modal: true }));

    jwtAxios[editItem?._id ? "patch" : "post"](
      `/categories/${editItem?._id || ""}`,
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
      width={600}
    >
      <Spin spinning={state.loading.modal}>
        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 5 }}
          // wrapperCol={{span: 16}}
          initialValues={{
            role: "user",
          }}
        >
          <Form.Item
            name="nameUz"
            label={"Name (uz)"}
            rules={[
              {
                required: true,
                message: "you need to provide nameUz",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            name="nameRu"
            label={"Name (ru)"}
            rules={[
              {
                required: true,
                message: "you need to provide nameRu",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item name="image">
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
