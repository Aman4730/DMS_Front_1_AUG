import React, { useState, useEffect, useContext } from "react";
import ErrorImage from "../../images/gfx/error-504.svg";
import PageContainer from "../../layout/page-container/PageContainer";
import { Link } from "react-router-dom";
import { BlockContent } from "../../components/Component";
import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  DropdownItem,
  Badge,
  Form,
} from "reactstrap";

import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Col,
  Row,
  TooltipComponent,
  UserAvatar,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  PaginationComponent,
  RSelect,
  // } from "../../../components/Component";
} from "../../../src/components/Component";
import { useForm } from "react-hook-form";
import { CustomerContext } from "../../context/CustomerContext";
import { AuthContext } from "../../context/AuthContext";
import { FileUploaderContext } from "../../context/FileUploaderContext";
import { CustomerEkycContext } from "../../context/CustomerEkycContext";
import LogoLight2x from "../../assets/images/logo_light.png";
// import LogoLight2x from "../../assets/images/";

const CustomerKycUpdate = ({ match }) => {
  const { errors, register, handleSubmit } = useForm();
  const {
    contextData,
    getCustomerDetaislForUpdateForm,
    updateCustomer,
    customerFormData,
    setCustomerFormData,
    updateCustomerBySelf,
  } = useContext(CustomerContext);
  const {
    customerEKYCData,
    getPartner,
    getReseller,
    getPlan,
    partnerListOptions,
    resellerListOptions,
    planListOptions,
  } = useContext(CustomerEkycContext);
  const { uploadDoc, uploadByCustomer } = useContext(FileUploaderContext);
  // const { setAuthToken } = useContext(AuthContext);
  const [customerId, setCustomerId] = useState();

  // const [customerFormData, setCustomerFormData] = useState({
  //   name: "",
  //   userId: "",
  //   email: "",
  //   mobile: "",
  //   partner: "",
  //   reseller: "",
  //   plan: "",
  //   installationAmt: "",
  //   securityAmount: "",
  //   address: "",
  //   aadharNumber: "",
  //   aadharFront: { file_name: "", file_url: "" },
  //   aadharBack: { file_name: "", file_url: "" },
  //   otherDocType: "Driving License",
  //   otherDocFront: { file_name: "", file_url: "" },
  //   otherDocBack: { file_name: "", file_url: "" },
  // });
  useEffect(() => {
    const token = match.params.token;
    localStorage.setItem("customerToken", token);
    getCustomerDetaislForUpdateForm(
      { authToken: token },
      (apiRes) => {
        const {
          data: {
            data,
            meta: { code, message },
            token,
          },
        } = apiRes;
        if (code == 200) {
          const {
            customer_id,
            customer_name,
            customer_user_id,
            customer_mobile,
            customer_email,
            customer_adhar_number,
            customer_partner,
            customer_reseller,
            customer_plan,
            customer_installation_amt,
            customer_security_amt,
            customer_address,
            docs,
          } = data;
          let customerData = {
            name: customer_name,
            userId: customer_user_id,
            email: customer_email,
            mobile: customer_mobile,
            partner: customer_partner,
            reseller: customer_reseller,
            plan: customer_plan,
            installationAmt: customer_installation_amt,
            securityAmount: customer_security_amt,
            address: customer_address,
            aadharNumber: customer_adhar_number,
            aadharFront: { file_name: "", file_url: "" },
            aadharBack: { file_name: "", file_url: "" },
            otherDocType: "Driving License",
            otherDocFront: { file_name: "", file_url: "" },
            otherDocBack: { file_name: "", file_url: "" },
          };
          setCustomerId(customer_id);
          let adhaarFront = docs.filter(
            (d) => d.customer_doc_type == "Aadhaar Front"
          );
          let adhaarBack = docs.filter(
            (d) => d.customer_doc_type == "Aadhaar Back"
          );
          let otherDoc = docs.filter(
            (d) =>
              d.customer_doc_type != "Aadhaar Front" &&
              d.customer_doc_type != "Aadhaar Back"
          );
          if (adhaarFront.length) {
            adhaarFront = adhaarFront[0];
            const { customer_doc_file_name, customer_doc_file_url } =
              adhaarFront;
            customerData.aadharFront = {
              file_name: customer_doc_file_name,
              file_url: customer_doc_file_url,
            };
          }
          if (adhaarBack.length) {
            adhaarBack = adhaarBack[0];
            const { customer_doc_file_name, customer_doc_file_url } =
              adhaarBack;
            customerData.aadharBack = {
              file_name: customer_doc_file_name,
              file_url: customer_doc_file_url,
            };
          }
          if (otherDoc.length) {
            otherDoc.map((doc, i) => {
              const {
                customer_doc_file_name,
                customer_doc_file_url,
                customer_doc_type,
              } = doc;
              if (i == 0) {
                customerData.otherDocType = customer_doc_type;
                customerData.otherDocFront = {
                  file_name: customer_doc_file_name,
                  file_url: customer_doc_file_url,
                };
              } else {
                customerData.otherDocBack = {
                  file_name: customer_doc_file_name,
                  file_url: customer_doc_file_url,
                };
              }
            });
          }
          setCustomerFormData(customerData);
        }
      },
      (apiErr) => {}
    );
  }, [match.params.token]);

  const [otherDocType, setOtherDocType] = useState([
    { value: "Driving License", label: "Driving License" },
    { value: "Passport", label: "Passport" },
    { value: "Pan", label: "Pan" },
    { value: "Voter Id", label: "Voter Id" },
  ]);
  const [staticOptions, setStaticOptions] = useState([
    { value: 1, label: "Option_1" },
    { value: 2, label: "Option_2" },
    { value: 3, label: "Option_3" },
    { value: 4, label: "Option_4" },
  ]);

  const handleInputChange = (e) => {
    setCustomerFormData({
      ...customerFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleDeleteImage = (key) => {
    setCustomerFormData({
      ...customerFormData,
      [key]: { file_name: "", file_url: "" },
    });
  };
  const handleSelectInputChange = (e, name) => {
    setCustomerFormData({ ...customerFormData, [name]: e.value });
  };

  useEffect(() => {
    // getPartnerList();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const getPartnerList = () => {
    let reqObj = {
      Request: {
        requestDate: "2002-05-30T09:00:00",
        extTransactionId: "-99999",
        systemId: "tpoperations",
        password: "Jass@19931993@",
      },
    };
    getPartner(
      reqObj,
      (apiRes) => {
        const {
          data: {
            data: { data, total },
            meta: { code, message },
            token,
          },
        } = apiRes;

        if (code == 200) {
          // setCustomerData(data);
          // setTotalCustomers(total)
        }
        setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  const onFormSubmit = () => {
    let submittedData = customerFormData;
    submittedData.customerId = customerId;
    updateCustomerBySelf(
      submittedData,
      (apiRes) => {
        const {
          data: {
            data,
            meta: { code, message },
            token,
          },
        } = apiRes;
        if (code == 200) {
          // getUsers();
          // getCustomersByAPi();
          // resetForm();
          // setModal({ edit: false }, { add: false });
          // setTimeout(() => {
          //   window.history.pushState(
          //     `update-customer-ekyc`,
          //     "ekyc-update-success",
          //     `update-customer-ekyc`
          //   );
          //   window.location.reload();
          // }, 2000);

          window.history.pushState(
            `/ekyc-update-success`,
            "update-customer-ekyc",
            `/ekyc-update-success`
          );
          window.location.reload();
        }
        // setAuthToken(token);
      },
      (apiErr) => {}
    );
    // resetForm();
    // setModal({ edit: false }, { add: false });
  };

  const onFileUpload = (e, type) => {
    const {
      target: { files },
    } = e;
    let file = files.length ? files[0] : false;
    if (file) {
      uploadByCustomer(
        file,
        "customer",
        (uploadedFileRes) => {
          const {
            data: {
              data: { file_name, file_path },
              meta: { code, message },
              token,
            },
          } = uploadedFileRes;
          if (code == 200) {
            setCustomerFormData({
              ...customerFormData,
              [type]: { file_name: file_name, file_url: file_path },
            });
          }
          // setAuthToken(token);
        },
        (apiErr) => {}
      );
    }
  };
  useEffect(() => {}, [customerFormData]);
  return (
    <PageContainer>
      <Block>
        <BlockContent className="nk-error-ld text-left ">
          <div>
            <div className="p-5">
              <div>
                <Form
                  className="row gy-4"
                  noValidate
                  onSubmit={handleSubmit(onFormSubmit)}
                >
                  <Col md="6">
                    <div style={{ marginTop: "-5%" }}>
                      <h3 className="title">Acme Customer Onboard</h3>
                    </div>
                  </Col>
                  <Col md="6">
                    <Link
                      to={`${process.env.PUBLIC_URL}/`}
                      className="logo-link"
                      style={{ textAlign: "right" }}
                    >
                      <img
                        className="logo-dark "
                        style={{
                          maxWidth: "30%",
                          marginTop: "-7%",
                        }}
                        src={LogoLight2x}
                        alt="logo"
                      />
                    </Link>
                  </Col>
                  <Col md="12">
                    <div className="data-head">
                      <h6 className="overline-title">Customer Details</h6>
                    </div>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Customer Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        // defaultValue={formData.name}
                        defaultValue={customerFormData.name}
                        placeholder="Enter Customer name"
                        ref={register({ required: "This field is required" })}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {errors.name && (
                        <span className="invalid">{errors.name.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">User ID</label>
                      <input
                        className="form-control"
                        type="text"
                        name="userId"
                        value={customerFormData.userId}
                        // defaultValue={formData.userId}
                        placeholder="Enter User Id"
                        // ref={register({ required: "This field is required" })}
                        // onChange={(e) => handleInputChange(e)}
                        disabled
                      />
                      {/* {errors.userId && <span className="invalid">{errors.userId.message}</span>} */}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Email </label>
                      <input
                        className="form-control"
                        type="text"
                        name="email"
                        value={customerFormData.email}
                        // defaultValue={formData.email}
                        placeholder="Enter Customer email"
                        onChange={(e) => handleInputChange(e)}
                        ref={register({
                          // required: "This field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className="invalid">{errors.email.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label className="form-label">Mobile Number</label>
                      <input
                        className="form-control"
                        type="number"
                        name="mobile"
                        value={customerFormData.mobile}
                        // defaultValue={formData.mobile}
                        placeholder="10 Digit Mobile Number"
                        ref={register({ required: "This field is required" })}
                        onChange={(e) => handleInputChange(e)}
                      />
                      {errors.mobile && (
                        <span className="invalid">{errors.mobile.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Partner</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={partnerListOptions}
                          value={{
                            value: customerFormData.partner,
                            label: customerFormData.partner
                              ? "M/s" + customerFormData.partner
                              : "Select",
                          }}
                          onChange={(e) =>
                            handleSelectInputChange(e, "partner")
                          }
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      {/* customer_reseller_id */}
                      <label className="form-label">Reseller</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={resellerListOptions}
                          value={{
                            value: customerFormData.reseller,
                            label: customerFormData.reseller
                              ? "M/s" + customerFormData.reseller
                              : "Select",
                          }}
                          onChange={(e) =>
                            handleSelectInputChange(e, "reseller")
                          }
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Plan</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={planListOptions}
                          value={{
                            value: customerFormData.plan,
                            label: customerFormData.plan
                              ? customerFormData.plan
                              : "Select",
                          }}
                          onChange={(e) => handleSelectInputChange(e, "plan")}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Installation Amount</label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          type="number"
                          name="installationAmt"
                          value={customerFormData.installationAmt}
                          // defaultValue={formData.mobile}
                          placeholder=""
                          // ref={register({ required: "This field is required" })}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Security Amount</label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          type="number"
                          name="securityAmount"
                          value={customerFormData.securityAmount}
                          // defaultValue={formData.mobile}
                          placeholder=""
                          // ref={register({ required: "This field is required" })}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Address</label>
                      <div className="form-control-wrap">
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          value={customerFormData.address}
                          defaultValue={customerFormData.address}
                          // defaultValue={formData.mobile}
                          placeholder=""
                          // ref={register({ required: "This field is required" })}
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                    </FormGroup>
                  </Col>

                  <Col md="12">
                    <div className="data-head mt-5">
                      <h6 className="overline-title">Customer Documents</h6>
                    </div>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Aadhar Number</label>
                      <input
                        className="form-control"
                        type="number"
                        name="aadharNumber"
                        // value={customerFormData.aadharNumber}
                        defaultValue={customerFormData.aadharNumber}
                        placeholder="XXXX-XXXX-XXXX-XXXX"
                        onChange={(e) =>
                          setCustomerFormData({
                            ...customerFormData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        ref={register({ required: "This field is required" })}
                      />
                      {/* {errors.balance && <span className="invalid">{errors.balance.message}</span>} */}
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Aadhar Photo (Front)</label>
                      <div className="form-control-wrap">
                        <div className="custom-file">
                          <input
                            type="file"
                            // value={customerFormData.aadharFront.file_url}
                            // multiple
                            className="custom-file-input"
                            id="aadharFront"
                            // value={formData.aadharFront.file_name ? formData.aadharFront.file_name : ""}
                            onChange={(e) => onFileUpload(e, "aadharFront")}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customMultipleFiles"
                          >
                            {customerFormData.aadharFront.file_url
                              ? customerFormData.aadharFront.file_name
                              : "Choose files"}
                          </label>
                          <br />
                          <br />
                          {customerFormData.aadharFront.file_url ? (
                            <>
                              {" "}
                              <a
                                href={customerFormData.aadharFront.file_url}
                                target="_blank"
                                style={{ zIndex: "99999999999" }}
                              >
                                <img
                                  src={customerFormData.aadharFront.file_url}
                                  height="30"
                                  width="30"
                                />
                                &nbsp;&nbsp;
                              </a>
                              <Icon
                                onClick={() => handleDeleteImage("aadharFront")}
                                name="trash"
                              >
                                {" "}
                                Delete
                              </Icon>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {errors.name && (
                        <span className="invalid">{errors.name.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Aadhar Photo (Back)</label>
                      <div className="form-control-wrap">
                        <div className="custom-file">
                          <input
                            type="file"
                            multiple
                            className="custom-file-input"
                            id="aadharBack"
                            onChange={(e) => onFileUpload(e, "aadharBack")}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customMultipleFiles"
                          >
                            {customerFormData.aadharBack.file_url
                              ? customerFormData.aadharBack.file_name
                              : "Choose files"}
                          </label>
                          <br />
                          <br />
                          {customerFormData.aadharBack.file_url ? (
                            <>
                              {" "}
                              <a
                                href={customerFormData.aadharBack.file_url}
                                target="_blank"
                                style={{ zIndex: "99999999999" }}
                              >
                                <img
                                  src={customerFormData.aadharBack.file_url}
                                  height="30"
                                  width="30"
                                />
                                &nbsp;&nbsp;
                              </a>
                              <Icon
                                onClick={() => handleDeleteImage("aadharBack")}
                                name="trash"
                              >
                                {" "}
                                Delete
                              </Icon>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {errors.name && (
                        <span className="invalid">{errors.name.message}</span>
                      )}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">Other Document</label>
                      <div className="form-control-wrap">
                        <RSelect
                          options={otherDocType}
                          value={{
                            value: customerFormData.otherDocType,
                            label: customerFormData.otherDocType
                              ? customerFormData.otherDocType
                              : "Select",
                          }}
                          onChange={(e) =>
                            handleSelectInputChange(e, "otherDocType")
                          }
                          placeholder="Please Other Doc Type"
                        />
                      </div>
                      {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">
                        Other Document (Front)
                      </label>
                      <div className="form-control-wrap">
                        <div className="custom-file">
                          <input
                            type="file"
                            // multiple
                            className="custom-file-input"
                            id="otherDocFront"
                            onChange={(e) => onFileUpload(e, "otherDocFront")}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customMultipleFiles"
                          >
                            {customerFormData.otherDocFront.file_url
                              ? customerFormData.otherDocFront.file_name
                              : "Choose files"}
                          </label>
                          <br />
                          <br />
                          {customerFormData.otherDocFront.file_url ? (
                            <>
                              {" "}
                              <a
                                href={customerFormData.otherDocFront.file_url}
                                target="_blank"
                                style={{ zIndex: "99999999999" }}
                              >
                                <img
                                  src={customerFormData.otherDocFront.file_url}
                                  height="30"
                                  width="30"
                                />
                                &nbsp;&nbsp;
                              </a>
                              <Icon
                                onClick={() =>
                                  handleDeleteImage("otherDocFront")
                                }
                                name="trash"
                              >
                                {" "}
                                Delete
                              </Icon>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <label className="form-label">
                        Other Document (Back)
                      </label>
                      <div className="form-control-wrap">
                        <div className="custom-file">
                          <input
                            type="file"
                            multiple
                            className="custom-file-input"
                            id="otherDocBack"
                            onChange={(e) => onFileUpload(e, "otherDocBack")}
                          />
                          <label
                            className="custom-file-label"
                            htmlFor="customMultipleFiles"
                          >
                            {customerFormData.otherDocBack.file_url
                              ? customerFormData.otherDocBack.file_name
                              : "Choose files"}
                          </label>
                          <br />
                          <br />
                          {customerFormData.otherDocBack.file_url ? (
                            <>
                              {" "}
                              <a
                                href={customerFormData.otherDocBack.file_url}
                                target="_blank"
                                style={{ zIndex: "99999999999" }}
                              >
                                <img
                                  src={customerFormData.otherDocBack.file_url}
                                  height="30"
                                  width="30"
                                />
                                &nbsp;&nbsp;
                              </a>
                              <Icon
                                onClick={() =>
                                  handleDeleteImage("otherDocBack")
                                }
                                name="trash"
                              >
                                {" "}
                                Delete
                              </Icon>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
                    </FormGroup>
                  </Col>
                  <Col size="12">
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit">
                          Submit
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            // onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </div>
        </BlockContent>
      </Block>
    </PageContainer>
  );
};
export default CustomerKycUpdate;
