import { Form, Input, message, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { setLoading, setVisible } from "./ReducerActions";
import { PostEditPropType } from "./Types";
import jwtAxios from "auth/jwt-auth/jwtaxios";
import { JwtUserType } from "auth/jwt-auth/JWTAuthAuthProvider";

function PostEdit({ title, state, getItems, dispatch }: PostEditPropType) {
  // STATES

  const [editItem, setEditItem] = useState<JwtUserType>(null);
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

    jwtAxios.get(`/sections/${state.editItemId}`).then((res) => {
      dispatch(setLoading({ ...state.loading, modal: false }));

      setEditItem(res.data.data.section);
    });
  }, [state.editItemId]);

  const postItem = (data: JwtUserType & { photo: any }) => {
    dispatch(setLoading({ ...state.loading, modal: true }));

    jwtAxios[editItem?._id ? "patch" : "post"](
      `/sections/${editItem?._id || ""}`,
      data
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
        <Form form={form} onFinish={handleSubmit} labelCol={{ span: 5 }}>
          <Form.Item
            name="title"
            label={"Title"}
            rules={[
              {
                required: true,
                message: "You need to provide title",
              },
            ]}
            hasFeedback
          >
            <Input />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

export default PostEdit;
