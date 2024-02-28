import React, { useEffect, useState, useContext } from "react";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Badge, Card } from "reactstrap";
import moment from "moment-timezone";

import {
  Button,
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
} from "../../../components/Component";
import { findUpper } from "../../../utils/Utils";
import { kycData } from "./KycData";
import { Link } from "react-router-dom";
// import { CustomerContext } from "../../context/CustomerContext";
import { CustomerContext } from "../../../../src/context/CustomerContext";

const KycDetailsRegular = ({ match }) => {
  const {
    contextData,
    addCustomer,
    getCustomer,
    updateCustomer,
    updateKycStatus,
    getCustomersFilterData,
  } = useContext(CustomerContext);

  const [data] = useState(kycData);
  const [user, setUser] = useState();
  const [customerData, setCustomerData] = useState();
  const [id, setID] = useState("");

  useEffect(() => {
    const id = match.params.id;
    if (id !== undefined || null || "") {
      let spUser = data.find((item) => item.id === id);
      setUser(spUser);
    } else {
      setUser(data[0]);
    }
  }, [match.params.id, data]);

  //! fun for get data via prams start
  useEffect(() => {
    const id = match.params.id;
    getCustomersByAPi(id);
    setID(id);
  }, [match.params.id]);

  //! get customer data
  useEffect(() => {
    // getCustomersByAPi();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCustomersByAPi = (id) => {
    getCustomersFilterData(
      {
        customerId: id,
      },
      (apiRes) => {
        const {
          data: {
            data,
            meta: { code, message },
            token,
          },
        } = apiRes;

        if (code == 200) {
          setCustomerData(data);
          // setTotalCustomers(total)
        }
        // setAuthToken(token);
      },
      (apiErr) => {}
    );
  };

  return (
    <React.Fragment>
      <Head title="KYC Details - Regular"></Head>
      {customerData && (
        <Content>
          <BlockHead size="sm">
            <BlockBetween className="g-3">
              <BlockHeadContent>
                <BlockTitle page>
                  KYCs /{" "}
                  <strong className="text-primary small">
                    {customerData.customer_name}
                  </strong>
                </BlockTitle>
                <BlockDes className="text-soft">
                  <ul className="list-inline">
                    <li>
                      Customer User Id:{" "}
                      <span className="text-base">
                        {customerData.customer_user_id}
                      </span>
                    </li>
                    {/* <li>
                      Submitted At: <span className="text-base">{customerData.date}</span>
                    </li> */}
                  </ul>
                </BlockDes>
              </BlockHeadContent>
              <BlockHeadContent>
                <Link to={`${process.env.PUBLIC_URL}/kyc-list`}>
                  <Button
                    color="light"
                    outline
                    className="bg-white d-none d-sm-inline-flex"
                  >
                    <Icon name="arrow-left"></Icon>
                    <span>Back</span>
                  </Button>
                  <Button
                    color="light"
                    outline
                    className="btn-icon bg-white d-inline-flex d-sm-none"
                  >
                    <Icon name="arrow-left"></Icon>
                  </Button>
                </Link>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <Block>
            <Row className="gy-5">
              <Col lg="5">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Application Info</BlockTitle>
                    <p>Submission date, approve date, status etc.</p>
                  </BlockHeadContent>
                </BlockHead>
                <Card className="card-bordered">
                  <ul className="data-list is-compact">
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Submitted By</div>
                        <div className="data-value">
                          {customerData.checked_by_user_name}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Submitted At</div>
                        {/* <div className="data-value">{customerData.customer_created_at}</div> */}
                        {`${moment(customerData.customer_created_at).format(
                          "DD/MM/YYYY"
                        )}`}{" "}
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Status</div>
                        <div className="data-value">
                          <Badge
                            size="sm"
                            color={
                              customerData.customer_ekyc_status === "Approved"
                                ? "outline-success"
                                : customerData.customer_ekyc_status ===
                                  "Pending"
                                ? "outline-info"
                                : "outline-danger"
                            }
                            className="badge-dim"
                          >
                            {customerData.customer_ekyc_status}
                          </Badge>
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Last Checked</div>
                        <div className="data-value">
                          <div className="user-card">
                            <UserAvatar
                              theme="orange-dim"
                              text={findUpper(
                                customerData.checked_by_user_name
                                  ? customerData.checked_by_user_name
                                  : "-"
                              )}
                            ></UserAvatar>
                            <div className="user-info">
                              <span className="tb-lead">
                                {customerData.checked_by_user_name
                                  ? customerData.checked_by_user_name
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Last Checked At</div>
                        {/* <div className="data-value">{customerData.customer_updated_at}</div> */}
                        {`${moment(customerData.customer_updated_at).format(
                          "DD/MM/YYYY"
                        )}`}{" "}
                      </div>
                    </li>
                  </ul>
                </Card>
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Uploaded Documents</BlockTitle>
                    <p>Here is user uploaded documents.</p>
                  </BlockHeadContent>
                </BlockHead>
                {customerData &&
                  customerData.docs.map((d) => {
                    return (
                      <>
                        <Card className="card-bordered">
                          <ul className="data-list is-compact">
                            <li className="data-item">
                              <div className="data-col">
                                <div className="data-label">Document Type</div>
                                <div className="data-value">
                                  {d.customer_doc_type}
                                </div>
                              </div>
                            </li>
                            {/* <li className="data-item">
                            <div className="data-col">
                              <div className="data-label">File Name</div>
                              <div className="data-value">{d.customer_doc_file_name}</div>
                            </div>
                          </li>
                          <li className="data-item">
                            <div className="data-col">
                              <div className="data-label">File Url</div>
                              <div className="data-value">{d.customer_doc_file_url}</div>
                            </div>
                          </li> */}
                            <li className="data-item">
                              <div className="data-col">
                                <div className="data-label">Image</div>
                                {/* <div className="data-value">{customerData.doc}</div> */}
                                {d.customer_doc_file_url ? (
                                  <>
                                    {" "}
                                    <a
                                      href={d.customer_doc_file_url}
                                      target="_blank"
                                      style={{ zIndex: "99999999999" }}
                                    >
                                      <img
                                        src={d.customer_doc_file_url}
                                        height="30"
                                        width="30"
                                      />
                                      &nbsp;&nbsp;
                                    </a>
                                  </>
                                ) : (
                                  ""
                                )}
                              </div>
                            </li>
                          </ul>
                        </Card>
                      </>
                    );
                  })}
              </Col>

              <Col lg="7">
                <BlockHead>
                  <BlockHeadContent>
                    <BlockTitle tag="h5">Applicant Information</BlockTitle>
                    <p>Basic info, like name, phone, address, country etc.</p>
                  </BlockHeadContent>
                </BlockHead>
                <Card className="card-bordered">
                  <ul className="data-list is-compact">
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">First Name</div>
                        {/* <div className="data-value">{customerData.name?.split(" ")[0]}</div> */}
                        <div className="data-value">
                          {customerData.customer_name}
                        </div>
                      </div>
                    </li>

                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Email Address</div>
                        <div className="data-value">
                          {customerData.customer_email}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Phone Number</div>
                        <div className="data-value text-soft">
                          {/* <em>{customerData.customer_mobile}</em> */}
                          <div className="data-value">
                            {customerData.customer_mobile}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Customer Address</div>
                        <div className="data-value text-soft">
                          {/* <em>{customerData.customer_mobile}</em> */}
                          <div className="data-value">
                            {customerData.customer_address
                              ? customerData.customer_address
                              : "-"}
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Aadhar Number</div>
                        <div className="data-value">
                          {customerData.customer_adhar_number
                            ? customerData.customer_adhar_number
                            : "-"}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Customer Partner</div>
                        <div className="data-value">
                          {customerData.customer_partner
                            ? customerData.customer_partner
                            : "-"}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Customer Reseller</div>
                        <div className="data-value">
                          {customerData.customer_reseller
                            ? customerData.customer_reseller
                            : "-"}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Customer Plan</div>
                        <div className="data-value">
                          {customerData.customer_plan
                            ? customerData.customer_plan
                            : "-"}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">
                          Customer Installation Amount
                        </div>
                        <div className="data-value">
                          {customerData.customer_installation_amt
                            ? customerData.customer_installation_amt
                            : "-"}
                        </div>
                      </div>
                    </li>
                    <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">
                          Customer Security Amount
                        </div>
                        <div className="data-value">
                          {customerData.customer_security_amt
                            ? customerData.customer_security_amt
                            : "-"}
                        </div>
                      </div>
                    </li>
                    {/* <li className="data-item">
                      <div className="data-col">
                        <div className="data-label">Telegram</div>
                        <div className="data-value">
                          <span>@tokenlite</span>{" "}
                          <a href="https://t.me/tokenlite">
                            <Icon name="telegram"></Icon>
                          </a>
                        </div>
                      </div>
                    </li> */}
                  </ul>
                </Card>
              </Col>
            </Row>
          </Block>
        </Content>
      )}
    </React.Fragment>
  );
};
export default KycDetailsRegular;
