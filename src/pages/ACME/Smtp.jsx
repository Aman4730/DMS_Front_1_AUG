import React, { useState, useContext, useEffect } from "react";
import { notification } from "antd";
import Head from "../../layout/head/Head";
import ModalPop from "../../components/Modal";
import { Stack, Typography } from "@mui/material";
import Content from "../../layout/content/Content";
import "react-datepicker/dist/react-datepicker.css";
import SmtpForm from "../../components/Forms/SmtpForm";
import { UserContext } from "../../context/UserContext";
import SmtpMainTable from "../../components/AllTables/SmtpMainTable";

const Smtp = () => {
  const { createsmtp, getsmtp, addtestemail, editsmtp, deletesmtp } =
    useContext(UserContext);
  const [getSmpt, setGetSmpt] = useState([]);
  const [smptdata, setSmptdata] = useState([]);
  const [editId, setEditedId] = useState(0);
  // SMTP Details Form------
  const [formData, setFormData] = useState({
    User_Name: "",
    password: "",
    Server_IP: "",
    Server_Port: "",
    From_Address: "",
    From_Name: "",
    Authentication: "",
    Security: "",
  });
  const [open, setOpen] = React.useState({
    status: false,
    data: "",
  });
  const handleClickOpen = (id) => {
    setOpen({
      status: true,
      data: id,
    });
  };
  const handleClose = () => {
    setOpen({
      status: false,
      data: "",
    });
  };
  useEffect(() => {
    getsmptdata();
  }, []);
  const getsmptdata = () => {
    getsmtp(
      {},
      (apiRes) => {
        setGetSmpt(apiRes?.data?.data);
        const apiData = apiRes?.data?.data[0];
        setSmptdata(apiData);
      },
      (apiErr) => {
        console.log("====> api get", apiErr);
      }
    );
  };
  const onEditClick = (id) => {
    getSmpt.map((item) => {
      if (item.id == id) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          User_Name: item?.username,
          password: item?.password,
          Server_IP: item?.host_serverip,
          Server_Port: item?.port,
          From_Address: item?.from_address,
          From_Name: item?.from_name,
          Authentication: item?.authentication,
          Security: item?.security,
        }));
        setEditedId(id);
      }
    });
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const handleAutocompleteChange = (id, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };
  const onBlockClick = (id, smtp_status) => {
    let statusCheck = {
      id,
      smtp_status,
    };
    editsmtp(
      statusCheck,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: apiRes.data.message,
            style: {
              height: 60,
            },
          });
          getsmptdata();
        }
      },
      (apiErr) => {}
    );
  };
  const onDeleteClick = (id) => {
    handleClose();
    let deleteId = { id: id };
    deletesmtp(
      deleteId,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "SMTP Deleted Successfully.",
            style: {
              height: 60,
            },
          });
          getsmptdata();
        }
      },
      (apiErr) => {}
    );
  };
  const handleSubmit = () => {
    if (editId) {
      let data = {
        id: editId,
        username: formData?.User_Name,
        password: formData?.password,
        host_serverip: formData?.Server_IP,
        port: formData?.Server_Port,
        from_address: formData?.From_Address,
        from_name: formData?.From_Name,
        authentication: formData?.Authentication,
        security: formData?.Security,
      };
      editsmtp(
        data,
        (apiRes) => {
          if (apiRes.status == 200) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "SMTP Edited Successfully.",
              style: {
                height: 60,
              },
            });
            getsmptdata();
            resetFormSmtp();
          }
        },
        (apiErr) => {}
      );
    } else {
      let data = {
        username: formData?.User_Name,
        password: formData?.password,
        host_serverip: formData?.Server_IP,
        port: formData?.Server_Port,
        from_address: formData?.From_Address,
        from_name: formData?.From_Name,
        authentication: formData?.Authentication,
        security: formData?.Security,
      };
      createsmtp(
        data,
        (apiRes) => {
          if (apiRes.status == 201) {
            notification["success"]({
              placement: "top",
              description: "",
              message: "SMTP Created Successfully.",
              style: {
                height: 60,
              },
            });
            getsmptdata();
            resetFormSmtp();
          }
        },
        (apiErr) => {}
      );
    }
  };
  const onEditSmtp = () => {
    let data = {
      id: smptdata.id,
      username: formData.User_Name,
      password: formData.password,
      host_serverip: formData.Server_IP,
      port: formData.Server_Port,
      from_address: formData.From_Address,
      from_name: formData.From_Name,
      authentication: formData.Authentication,
      security: formData.Security,
    };
    editsmtp(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "SMTP Updated Successfully.",
            style: {
              height: 60,
            },
          });
        }
      },
      (apiErr) => {}
    );
  };
  // Test Email-----
  const [testEmailForm, setTestEmailForm] = useState({
    To_Address: "",
    Subject: "",
    Message: "",
  });
  const handleTestEmail = (event) => {
    const { name, value } = event.target;
    setTestEmailForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmitTestEmail = () => {
    let data = {
      to_address: testEmailForm.To_Address,
      message: testEmailForm.Message,
      subject: testEmailForm.Subject,
    };
    addtestemail(
      data,
      (apiRes) => {
        if (apiRes.status == 200) {
          notification["success"]({
            placement: "top",
            description: "",
            message: "Email Sent Successfully.",
            style: {
              height: 60,
            },
          });
        }
        resetFormTestEmail();
      },
      (apiErr) => {}
    );
  };
  const resetFormTestEmail = () => {
    setTestEmailForm({
      To_Address: "",
      Subject: "",
      Message: "",
    });
  };
  const resetFormSmtp = () => {
    setFormData({
      User_Name: "",
      password: "",
      Server_IP: "",
      Server_Port: "",
      From_Address: "",
      From_Name: "",
      Authentication: "",
      Security: "",
    });
    setEditedId(0);
  };
  return (
    <React.Fragment>
      <Head title="SMTP - Regular"></Head>
      <Content>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          sx={{ mt: -3.4 }}
        >
          <Typography style={{ fontSize: "24.5px", fontWeight: "bold" }}>
            SMTP Details
          </Typography>
        </Stack>
        <ModalPop
          open={open.status}
          handleClose={handleClose}
          handleOkay={onDeleteClick}
          title="SMTP is being Deleted. Are You Sure !"
          data={open.data}
        />
        <SmtpForm
          editId={editId}
          smptdata={smptdata}
          formData={formData}
          onEditSmtp={onEditSmtp}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          testEmailForm={testEmailForm}
          handleTestEmail={handleTestEmail}
          handleSubmitTestEmail={handleSubmitTestEmail}
          handleAutocompleteChange={handleAutocompleteChange}
        />
        <SmtpMainTable
          getSmpt={getSmpt}
          onEditClick={onEditClick}
          onBlockClick={onBlockClick}
          handleClickOpen={handleClickOpen}
        />
      </Content>
    </React.Fragment>
  );
};
export default Smtp;
