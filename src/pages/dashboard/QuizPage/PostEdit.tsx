import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Select, Space, Spin } from "antd";
import { useEffect, useState } from "react";
import { setLoading, setVisible } from "./ReducerActions";
import { PostEditPropType, TestType, TopicType } from "./Types";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import Dragger from "antd/es/upload/Dragger";

function PostEdit({ title, state, getItems, dispatch }: PostEditPropType) {
  // STATES

  const [editItem, setEditItem] = useState<TestType | null>(null);
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

  const postItem = (data: TestType & { image: any }) => {
    console.log(data);

    const formData: FormData = new FormData();
    data.variants && formData.append("variants", JSON.stringify(data.variants));
    data.question && formData.append("question", data.question);
    data.topic && formData.append("section", data.topic);

    data.image?.file?.originFileObj &&
      formData.append("image", data.image.file.originFileObj);

    console.log(Object.fromEntries(formData.entries()));
    dispatch(setLoading({ ...state.loading, modal: true }));

    jwtAxios[editItem?._id ? "patch" : "post"](
      `/tests/${editItem?._id || ""}`,
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
    const formValue = form.getFieldsValue();

    formValue.variants = [
      { title: formValue.answer, isAnswer: true },
      ...formValue.variants
        .filter((variant: any) => variant)
        .map((variant: { variant: string }) => {
          return { title: variant.variant, isAnswer: false };
        }),
    ];
    postItem(formValue);
  };

  //UPLOAD DRAGGER FUNCTIONS

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
            name="topic"
            label={"Topics"}
            rules={[
              {
                required: true,
                message: "you need to provide topic",
              },
            ]}
            hasFeedback
          >
            <Select options={selectOptions} />
          </Form.Item>
          <Form.Item
            name="question"
            label={"Question"}
            rules={[
              {
                required: true,
                message: "you need to provide question",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="answer"
            label={"Answer"}
            rules={[
              {
                required: true,
                message: "you need to provide answer",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.List name="variants">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{
                      display: "flex",
                      marginBottom: 8,
                    }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      label={
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      }
                      rules={[
                        {
                          required: true,
                          message: "you need to provide answer",
                        },
                      ]}
                      name={[name, "variant"]}
                      style={{ width: "550px" }}
                    >
                      <Input placeholder="Variant" />
                    </Form.Item>
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add variant
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item name="image">
            <Dragger beforeUpload={() => true}>
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
