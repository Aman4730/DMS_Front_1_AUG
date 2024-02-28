import React, { useState, useEffect, useContext } from "react";
// import Content from "../../../layout/content/Content";
import Content from "../../layout/content/Content";
import moment from 'moment-timezone';


// import Head from "../../../layout/head/Head";
import Head from "../../layout/head/Head";
import {
  Modal,
  ModalBody,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  DropdownItem,
  Badge,
  Form
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
// import { kycData, filterStatus, filterDoc, bulkActionKycOptions } from "./KycData";
import { kycData, filterStatus, filterDoc, bulkActionKycOptions } from "../../../src/pages/pre-built/kyc-list-regular/KycData";
// import { filterRole, filterStatus, userData } from "../../pages/pre-built/user-manage/UserData";
import { filterRole, userData } from "../../pages/pre-built/user-manage/UserData";
import { useForm } from "react-hook-form";

// import { findUpper } from "../../../utils/Utils";
import { bulkActionOptions, findUpper } from "../../../src/utils/Utils";

import { Link } from "react-router-dom";
import { CustomerContext } from "../../context/CustomerContext";
import { AuthContext } from "../../context/AuthContext";
import { FileUploaderContext } from "../../context/FileUploaderContext";
import { CustomerEkycContext } from "../../context/CustomerEkycContext";

const KycListRegular = ({ history }) => {
  const { contextData, addCustomer, getCustomer, updateCustomer, updateKycStatus, customerFormData, setCustomerFormData, updateEkycCustomerData } = useContext(CustomerContext);
  const { uploadDoc } = useContext(FileUploaderContext);
  const { partnerListOptions, resellerListOptions, planListOptions, setPartnerListOptions,
    setResellerListOptions, setPlanListOptions, getPartner, getReseller, getPlan, getCustomerDataByMobile } = useContext(CustomerEkycContext);
  const { setAuthToken } = useContext(AuthContext);
  const [customerData, setCustomerData] = contextData;
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [tablesm, updateTableSm] = useState(false);
  const [data, setData] = useState(kycData);
  const [viewModal, setViewModal] = useState(false);
  const [detail, setDetail] = useState({});
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const [customerUserIds, setCustomerUserIds] = useState([]);
  const [otherDocType, setOtherDocType] = useState([
    { value: "Driving License", label: "Driving License" },
    { value: "Passport", label: "Passport" },
    { value: "Pan", label: "Pan" },
    { value: "Voter Id", label: "Voter Id" },

  ]);
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = customerData;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setData([...sortedData]);
    }
  };

  const handleSelectInputChange = (e, name) => {
    if(name == 'partner'){
      getResellerList({ partnerName: e.value })
    }
    if(name == 'reseller'){
      getPlanList({ partnerName: customerFormData.partner, resellerName:  e.value })
    }
    setCustomerFormData({ ...customerFormData, [name]: e.value })
  }
  const onUpdateClick = (id) => {
    customerData && customerData.map((customer) => {
      if (customer.customer_id == id) {
        const { docs } = customer;
        let customerData = {
          name: customer.customer_name,
          userId: customer.customer_user_id,
          email: customer.customer_email,
          mobile: customer.customer_mobile,
          partner: customer.customer_partner,
          reseller: customer.customer_reseller,
          plan: customer.customer_plan,
          installationAmt: customer.customer_installation_amt,
          securityAmount: customer.customer_security_amt,
          address: customer.customer_address,
          aadharNumber: customer.customer_adhar_number,
          aadharFront: { file_name: "", file_url: "" },
          aadharBack: { file_name: "", file_url: "" },
          otherDocType: "Driving License",
          otherDocFront: { file_name: "", file_url: "" },
          otherDocBack: { file_name: "", file_url: "" },
        }
        let adhaarFront = docs.filter(d => d.customer_doc_type == "Aadhaar Front");
        let adhaarBack = docs.filter(d => d.customer_doc_type == "Aadhaar Back");
        let otherDoc = docs.filter(d => d.customer_doc_type != "Aadhaar Front" && d.customer_doc_type != "Aadhaar Back");
        if (adhaarFront.length) {
          adhaarFront = adhaarFront[0];
          const { customer_doc_file_name, customer_doc_file_url } = adhaarFront;
          // setCustomerFormData({ ...customerFormData, aadharFront: { file_name: customer_doc_file_name, file_url: customer_doc_file_url } })
          customerData.aadharFront = { file_name: customer_doc_file_name, file_url: customer_doc_file_url };
          // setCustomerFormData({ ...customerFormData, aadharFront: { file_name: customer_doc_file_name, file_url: customer_doc_file_url } })
        }
        if (adhaarBack.length) {
          adhaarBack = adhaarBack[0];
          const { customer_doc_file_name, customer_doc_file_url } = adhaarBack;
          customerData.aadharBack = { file_name: customer_doc_file_name, file_url: customer_doc_file_url };
          // setCustomerFormData({ ...customerFormData, aadharBack: { file_name: customer_doc_file_name, file_url: customer_doc_file_url } })
        }
        if (otherDoc.length) {
          otherDoc.map((doc, i) => {
            const { customer_doc_file_name, customer_doc_file_url, customer_doc_type } = doc;
            // setCustomerFormData({ ...customerFormData, otherDocType: customer_doc_type });
            if (i == 0) {
              customerData.otherDocType = customer_doc_type;
              // setCustomerFormData({
              //   ...customerFormData,
              //   otherDocType: customer_doc_type,
              //   otherDocFront: { file_name: customer_doc_file_name, file_url: customer_doc_file_url }
              // })

              customerData.otherDocFront = { file_name: customer_doc_file_name, file_url: customer_doc_file_url };
              // setCustomerFormData({ ...customerFormData, otherDocType: customer_doc_type, otherDocFront: { file_name: customer_doc_file_name, file_url: customer_doc_file_url }});
            } else {
              customerData.otherDocBack = { file_name: customer_doc_file_name, file_url: customer_doc_file_url };
              // setCustomerFormData({ ...customerFormData, otherDocBack: { file_name: customer_doc_file_name, file_url: customer_doc_file_url } })

              // setCustomerFormData({ ...customerFormData, otherDocBack: { file_name: customer_doc_file_name, file_url: customer_doc_file_url }});
            }
          })
        }
        setCustomerFormData(customerData);
        setModal({ edit: false, add: true });
        setCustomerId(id)
      }
    });


  }
  useEffect(() => {
    getPartnerList()
    // getResellerList()
    // getPlanList()
  }, [])

  const getPartnerList = () => {
    getPartner({},
      (apiRes) => {
        const { data: { data, meta: { code, message }, token } } = apiRes;
        if (code == 200) {
          getPartnerListOptions(data.length ? data : [])
        }
        setAuthToken(token);
      },
      (apiErr) => {
      })
  };
  const getResellerList = (data) => {
    getReseller(data,
      (apiRes) => {
        const { data: { data, meta: { code, message }, token } } = apiRes;
        if (code == 200) {
          getResellerListOptions(data.length ? data : [])
        }
        setAuthToken(token);
      },
      (apiErr) => {
      })
  };
  const getPlanList = (data) => {
    getPlan(data,
      (apiRes) => {
        const { data: { data, meta: { code, message }, token } } = apiRes;
        if (code == 200) {
          getPlanListOptions(data.length ? data : [])
        }
        setAuthToken(token);
      },
      (apiErr) => {
      })
  };

  const getPartnerListOptions = (data) => {
    let finalPartnerList = [];
    data & data.length & data.map(d => {
      let obj = {
        value: d.Partner,
        label: d.Title + " " + d.Partner,
      }
      finalPartnerList.push(obj)
    })
    setPartnerListOptions(finalPartnerList)
  }
  const getResellerListOptions = (data) => {
    let finalResellerListOptions = [];
    data & data.length & data.map(d => {
      let obj = {
        value: d.Reseller,
        label: d.TITAL + " " + d.Reseller,
      }
      finalResellerListOptions.push(obj)
    })
    setResellerListOptions(finalResellerListOptions);
  }
  const getPlanListOptions = (data) => {
    let finalPlanListOptions = [];
    data & data.length & data.map(d => {
      let obj = {
        value: d.Plan,
        label: d.Plan,
      }
      finalPlanListOptions.push(obj)
    })
    setPlanListOptions(finalPlanListOptions);
  }








  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = kycData.filter((item) => {
        return item.name.toLowerCase().includes(onSearchText.toLowerCase());
      });
      setData([...filteredObject]);
    } else {
      setData([...kycData]);
    }
  }, [onSearchText]);

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  // function to declare the state change
  const onActionText = (e) => {
    setActionText(e.value);
  };


  // function to select all the items of the table
  const selectorCheck = (e) => {
    let newData;
    newData = customerData.map((item) => {
      item.check = e.currentTarget.checked;
      return item;
    });
    setData([...newData]);
  };

  // function to change the property of an item of the table
  const onSelectChange = (e, id) => {
    let newData = customerData;
    let index = newData.findIndex((item) => item.id === id);
    newData[index].check = e.currentTarget.checked;
    setData([...newData]);
  };

  // function to fire actions after dropdowm select
  const onActionClick = (e) => {
    if (actionText === "Reject") {
      let newData = customerData.map((item) => {
        if (item.check === true) item.status = "Rejected";
        return item;
      });
      setData([...newData]);
    } else if (actionText === "Delete") {
      let newData;
      newData = customerData.filter((item) => item.check !== true);
      setData([...newData]);
    }
  };


  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };


  //! submit function to edit a new item
  const onStatusUpdateClickSubmit = (id, status) => {
    // let formData = spocFormData;
    updateKycStatus(
      {
        customer_id: id,
        customer_ekyc_status: status
      },
      res => {
        debugger;
        const { data: { meta: { code, message } } } = res;
        // if (code === 200) {
        // resetForm();
        // setModal({ edit: false }, { add: false });
        getCustomersByAPi({ pageNum: currentPage });

        // } else {
        // }
      },
      err => {
      })

  };



  // function to change to approve property for an item
  const onApproveClick = (id) => {
    // let newData = customerData;
    // let index = newData.findIndex((item) => item.id === id);
    // newData[index].status = "PAN Card";
    // setData([...newData]);
    onStatusUpdateClickSubmit(id, 'Approved')
  };
  const onChangeMobile = (e) => {
    let mobile = e.target.value ? e.target.value : "";
    if (mobile.length < 10) return;
    getCustomerDataByMobile(mobile,
      res => {
        const { data: { data: { UserDetails }, meta: { code, message } } } = res;
        if(code===200){
          let finalUserIDData = [];
          UserDetails.map(user=>{
            finalUserIDData.push({ value: user.User_Id, label: user.User_Id, user })
          })
          setCustomerUserIds(finalUserIDData)
        }
      },
      err => {
      })

  };

  // function to change to reject property for an item
  const onRejectClick = (id) => {
    // let newData = customerData;
    // let index = newData.findIndex((item) => item.id === id);
    // newData[index].status = "Voter Id";
    // setData([...newData]);
    onStatusUpdateClickSubmit(id, 'Rejected')
  };

  // function to load detail data
  const loadDetail = (id) => {
    let index = customerData.findIndex((item) => item.customer_id === id);
    setDetail(customerData[index]);
  };

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = customerData.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => {
    debugger;
    setCurrentPage(pageNumber);
    getCustomersByAPi({ pageNum: pageNumber });
  };
  const { errors, register, handleSubmit } = useForm();


  // function to reset the form
  const resetForm = () => {
    setCustomerFormData({
      name: "",
      userId: "",
      email: "",
      mobile: "",
      partner: "",
      reseller: "",
      plan: "",
      installationAmt: "",
      securityAmount: "",
      address: "",
      aadharNumber: "",
      aadharFront: { file_name: "", file_url: "" },
      aadharBack: { file_name: "", file_url: "" },
      otherDocType: "Driving License",
      otherDocFront: { file_name: "", file_url: "" },
      otherDocBack: { file_name: "", file_url: "" },
    });
    setCustomerId(0)

  };





  // function to handel file upload
  const onFileUpload = (e, type) => {
    const { target: { files } } = e;
    let file = files.length ? files[0] : false;
    if (file) {
      uploadDoc(file, 'admin',
        (uploadedFileRes) => {
          const { data: { data: { file_name, file_path }, meta: { code, message }, token } } = uploadedFileRes;
          if (code == 200) {

            setCustomerFormData({ ...customerFormData, [type]: { file_name: file_name, file_url: file_path } })
          }
          setAuthToken(token);
        },
        (apiErr) => {
        });
    }

  };
  useEffect(() => {
    getCustomersByAPi({ pageNum: currentPage });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //todo 
  const getCustomersByAPi = ({ pageNum }) => {
    getCustomer({ pageNumber: pageNum, pageSize: itemPerPage, search: onSearchText },
      (apiRes) => {
        const { data: { data: { data, total }, meta: { code, message }, token } } = apiRes;
        if (code == 200) {
          setCustomerData(data);
          setTotalCustomers(total)
        }
        setAuthToken(token);
      },
      (apiErr) => {
      })
  };
  // submit function to add a new item
  const onFormSubmit = () => {

    let submittedData = customerFormData

    if (customerId) {
      debugger;
      submittedData.customerId = customerId;
      updateEkycCustomerData(submittedData,
        (apiRes) => {
          const { data: { data, meta: { code, message }, token } } = apiRes;
          if (code == 200) {
            // getCustomersByAPi({ pageNum: currentPage });
            // getUsers();
            // getCustomersByAPi();
            // resetForm();
            // setModal({ edit: false }, { add: false });
          }
          setAuthToken(token);
        },
        (apiErr) => {
        });
      // resetForm();
    } else {
      addCustomer(submittedData,
        (apiRes) => {
          const { data: { data, meta: { code, message }, token } } = apiRes;
          if (code == 200) {
            // // getUsers();
            // getCustomersByAPi();
            // resetForm();
            // setModal({ edit: false }, { add: false });
          }
          setAuthToken(token);
        },
        (apiErr) => {
        });
      }
      
      
      resetForm();
      getCustomersByAPi({ pageNum: currentPage });
    // resetForm();
    setModal({ edit: false }, { add: false });
  };



  return (
    <React.Fragment>
      <Head title="KYC Lists - Regular"></Head>
      <Content>
        <BlockHead size="sm">
          <BlockBetween>
            <BlockHeadContent>
              <BlockTitle page>Upload Documents </BlockTitle>
              <BlockDes className="text-soft">
                <p>You have total {totalCustomers} Upload documents.</p>
              </BlockDes>
            </BlockHeadContent>
            <BlockHeadContent>
              {/* <Button color="light" outline className="bg-white d-none d-sm-inline-flex">
                <Icon name="download-cloud"></Icon>
                <span>Export</span>
              </Button> */}

              <Button color="primary" className="btn-icon" onClick={() => setModal({ add: true })}>
                <Icon name="plus"></Icon>
              </Button>


              <Button color="light" outline className="btn-icon bg-white d-inline-flex d-sm-none">
                <Icon name="download-cloud"></Icon>
              </Button>
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block>
          <DataTable className="card-stretch">
            <div className="card-inner position-relative card-tools-toggle">
              <div className="card-title-group">
                <div className="card-tools">
                  <div className="form-inline flex-nowrap gx-3">
                    {/* <div className="form-wrap">
                      <RSelect
                        // options={bulkActionKycOptions}
                        className="w-130px"
                        placeholder="Bulk Action"
                        onChange={(e) => onActionText(e)}
                      />
                    </div> */}
                    {/* <div className="btn-wrap">
                      <span className="d-none d-md-block">
                        <Button
                          color="light"
                          outline
                          disabled={actionText === "" ? true : false}
                          className="btn-dim"
                          onClick={() => onActionClick()}
                        >
                          Apply
                        </Button>
                      </span>
                      <span className="d-md-none">
                        <Button
                          color="light"
                          outline
                          disabled={actionText === "" ? true : false}
                          className="btn-dim btn-icon"
                          onClick={() => onActionClick()}
                        >
                          <Icon name="arrow-right"></Icon>
                        </Button>
                      </span>
                    </div> */}
                  </div>
                </div>
                <div className="card-tools mr-n1">
                  <ul className="btn-toolbar gx-1">
                    <li>
                      <Button
                        onClick={(ev) => {
                          ev.preventDefault();
                          toggle();
                        }}
                        className="btn-icon search-toggle toggle-search"
                      >
                        <Icon name="search"></Icon>
                      </Button>
                    </li>
                    <li className="btn-toolbar-sep"></li>
                    {/* <li>
                      <div className="toggle-wrap">
                        <Button
                          className={`btn-icon btn-trigger toggle ${tablesm ? "active" : ""}`}
                          onClick={() => updateTableSm(true)}
                        >
                          <Icon name="menu-right"></Icon>
                        </Button>
                        <div className={`toggle-content ${tablesm ? "content-active" : ""}`}>
                          <ul className="btn-toolbar gx-1">
                            <li className="toggle-close">
                              <Button className="btn-icon btn-trigger toggle" onClick={() => updateTableSm(false)}>
                                <Icon name="arrow-left"></Icon>
                              </Button>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <div className="dot dot-primary"></div>
                                  <Icon name="filter-alt"></Icon>
                                </DropdownToggle>
                                <DropdownMenu
                                  right
                                  className="filter-wg dropdown-menu-xl"
                                  style={{ overflow: "visible" }}
                                >
                                  <div className="dropdown-head">
                                    <span className="sub-title dropdown-title">Advanced Filter</span>
                                  </div>
                                  <div className="dropdown-body dropdown-body-rg">
                                    <Row className="gx-6 gy-3">
                                      <Col size="6">
                                        <FormGroup>
                                          <label className="overline-title overline-title-alt">Doc Type</label>
                                          <RSelect options={filterDoc} placeholder="Any Type" />
                                        </FormGroup>
                                      </Col>
                                      <Col size="6">
                                        <FormGroup>
                                          <label className="overline-title overline-title-alt">Status</label>
                                          <RSelect options={filterStatus} placeholder="Any Status" />
                                        </FormGroup>
                                      </Col>
                                      <Col size="12">
                                        <FormGroup>
                                          <Button type="button" color="secondary">
                                            Filter
                                          </Button>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </div>
                                  <div className="dropdown-foot between">
                                    <a
                                      className="clickable"
                                      href="#reset"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      Reset Filter
                                    </a>
                                    <a
                                      href="#save"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                      }}
                                    >
                                      Save Filter
                                    </a>
                                  </div>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className="btn btn-trigger btn-icon dropdown-toggle">
                                  <Icon name="setting"></Icon>
                                </DropdownToggle>
                                <DropdownMenu right className="dropdown-menu-xs">
                                  <ul className="link-check">
                                    <li>
                                      <span>Show</span>
                                    </li>
                                    <li className={itemPerPage === 10 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(10);
                                        }}
                                      >
                                        10
                                      </DropdownItem>
                                    </li>
                                    <li className={itemPerPage === 15 ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setItemPerPage(15);
                                        }}
                                      >
                                        15
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                  <ul className="link-check">
                                    <li>
                                      <span>Order</span>
                                    </li>
                                    <li className={sort === "dsc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("dsc");
                                          sortFunc("dsc");
                                        }}
                                      >
                                        DESC
                                      </DropdownItem>
                                    </li>
                                    <li className={sort === "asc" ? "active" : ""}>
                                      <DropdownItem
                                        tag="a"
                                        href="#dropdownitem"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                          setSortState("asc");
                                          sortFunc("asc");
                                        }}
                                      >
                                        ASC
                                      </DropdownItem>
                                    </li>
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className={`card-search search-wrap ${!onSearch && "active"}`}>
                <div className="card-body">
                  <div className="search-content">
                    <Button
                      onClick={() => {
                        setSearchText("");
                        toggle();
                      }}
                      className="search-back btn-icon toggle-search"
                    >
                      <Icon name="arrow-left"></Icon>
                    </Button>
                    <input
                      type="text"
                      className="border-transparent form-focus-none form-control"
                      placeholder="Search by user or email"
                      value={onSearchText}
                      onChange={(e) => onFilterChange(e)}
                    />
                    <Button className="search-submit btn-icon">
                      <Icon name="search"></Icon>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DataTableBody>
              <DataTableHead>
                {/* <DataTableRow className="nk-tb-col-check">
                  <div className="custom-control custom-control-sm custom-checkbox notext">
                    <input
                      type="checkbox"
                      className="custom-control-input form-control"
                      id="uid_1"
                      onChange={(e) => selectorCheck(e)}
                    />
                    <label className="custom-control-label" htmlFor="uid_1"></label>
                  </div>
                </DataTableRow> */}
                <DataTableRow>
                  <span>User</span>
                </DataTableRow>
                {/* <DataTableRow size="mb">
                  <span>Doc Type</span>
                </DataTableRow> */}
                <DataTableRow size="md">
                  <span>Documents</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span>Submitted</span>
                </DataTableRow>
                <DataTableRow size="md">
                  <span>Status</span>
                </DataTableRow>
                <DataTableRow size="lg">
                  <span>Checked by</span>
                </DataTableRow>
                <DataTableRow className="nk-tb-col-tools">&nbsp;</DataTableRow>
              </DataTableHead>

              {currentItems.length > 0
                ? currentItems.map((item, index) => {
                  return (
                    <DataTableItem key={item.customer_id}>
                      {/* <DataTableRow className="nk-tb-col-check">
                        <div className="custom-control custom-control-sm custom-checkbox notext">
                          <input
                            type="checkbox"
                            className="custom-control-input form-control"
                            defaultChecked={item.check}
                            id={item.id + "uid1"}
                            key={Math.random()}
                            onChange={(e) => onSelectChange(e, item.id)}
                          />
                          <label className="custom-control-label" htmlFor={item.id + "uid1"}></label>
                        </div>
                      </DataTableRow> */}
                      <DataTableRow>
                        <Link to={`${process.env.PUBLIC_URL}/kyc-details-regular/${item.customer_id}`}>
                          <div className="user-card">
                            <UserAvatar
                              theme={item.avatarBg}
                              text={findUpper(item.customer_name)}
                              image={item.image}
                            ></UserAvatar>
                            <div className="user-info">
                              <span className="tb-lead">
                                {item.customer_name}{" "}
                                <span
                                  className={`dot dot-${item.customer_ekyc_status === "Approved"
                                    ? "success"
                                    : item.customer_ekyc_status === "Pending"
                                      ? "info"
                                      : "danger"
                                    } d-md-none ml-1`}
                                ></span>
                              </span>
                              <span>{item.customer_mobile}</span>
                            </div>
                          </div>
                        </Link>
                      </DataTableRow>
                      <DataTableRow size="mb">
                        <span className="tb-lead-sub">{item.docs.length}</span>
                        <span className="tb-lead-sub">{""}</span>
                      </DataTableRow>
                      {/* <DataTableRow size="md">
                        <ul className="list-inline list-download">
                          {item.front && (
                            <li>
                              Front Side{" "}
                              <a
                                href="#download"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                className="popup"
                              >
                                <Icon name="download"></Icon>
                              </a>
                            </li>
                          )}
                          {item.back && (
                            <li>
                              Back Side{" "}
                              <a
                                href="#download"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                className="popup"
                              >
                                <Icon name="download"></Icon>
                              </a>
                            </li>
                          )}
                        </ul>
                      </DataTableRow> */}
                      <DataTableRow size="lg">
                        {/* <span className="tb-date">{item.customer_created_at}</span> */}
                        {`${moment(item.customer_created_at).format("DD/MM/YYYY")}`}{" "}
                      </DataTableRow>
                      <DataTableRow size="md">
                        <span
                          className={`tb-status text-${item.customer_ekyc_status === "Approved" ? "success" : item.customer_ekyc_status === "Pending" ? "info" : "danger"
                            }`}
                        >
                          {item.customer_ekyc_status}
                        </span>
                        {item.customer_ekyc_status !== "Pending" && (
                          <TooltipComponent
                            icon="info"
                            direction="top"
                            id={item.customer_ekyc_status + item.checked_by_user_name + item.customer_adhar_number}
                            text={`${item.customer_ekyc_status} ${moment(item.customer_updated_at).format("DD/MM/YYYY")}`}
                          ></TooltipComponent>
                        )}
                        {!item.customer_ekyc_status === "Pending" && (
                          <span>
                            <TooltipComponent icon="info" direction="top" text={moment(item.customer_created_at).format("DD/MM/YYYY")} id={item.customer_id} />
                          </span>
                        )}
                      </DataTableRow>
                      <DataTableRow size="lg">
                        <div className="user-card">
                          <UserAvatar theme="orange-dim" size="xs" text={item.checked_by_user_name ? findUpper(item.checked_by_user_name) : ""}></UserAvatar>
                          <div className="user-name">
                            <span className="tb-lead">{item.checked_by_user_name} </span>
                          </div>
                        </div>
                      </DataTableRow>

                      <DataTableRow className="nk-tb-col-tools">
                        <ul className="nk-tb-actions gx-1">
                          <li
                            className="nk-tb-action-hidden"
                            onClick={() => {
                              loadDetail(item.customer_id);
                              setViewModal(true);
                            }}
                          >
                            <TooltipComponent
                              tag="a"
                              containerClassName="btn btn-trigger btn-icon"
                              id={"view" + item.customer_id}
                              icon="eye-fill"
                              direction="top"
                              text="Quick View"
                            />
                          </li>
                          {item.customer_ekyc_status === "Rejected" ? null : item.customer_ekyc_status === "Approved" ? (
                            <li className="nk-tb-action-hidden" onClick={() => onRejectClick(item.customer_id)}>
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"reject" + item.customer_id}
                                icon="cross-fill-c"
                                direction="top"
                                text="Reject"
                              />
                            </li>
                          ) : (
                            <React.Fragment>
                              <li className="nk-tb-action-hidden" onClick={() => onApproveClick(item.customer_id)}>
                                <TooltipComponent
                                  tag="a"
                                  containerClassName="btn btn-trigger btn-icon"
                                  id={"approve" + item.customer_id}
                                  icon="check-fill-c"
                                  direction="top"
                                  text="Approve"
                                />
                              </li>
                              <li className="nk-tb-action-hidden" onClick={() => onRejectClick(item.customer_id)}>
                                <TooltipComponent
                                  tag="a"
                                  containerClassName="btn btn-trigger btn-icon"
                                  id={"reject" + item.customer_id}
                                  icon="cross-fill-c"
                                  direction="top"
                                  text="Reject"
                                />
                              </li>
                            </React.Fragment>
                          )}
                          <li>
                            <UncontrolledDropdown>
                              <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
                                <Icon name="more-h"></Icon>
                              </DropdownToggle>
                              <DropdownMenu right>
                                <ul className="link-list-opt no-bdr">
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#view"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        loadDetail(item.customer_id);
                                        setViewModal(true);
                                      }}
                                    >
                                      <Icon name="eye"></Icon>
                                      <span>Quick View</span>
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#details"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        onUpdateClick(item.customer_id);
                                      }}
                                    >
                                      <Icon name="edit"></Icon>
                                      <span>Update Details</span>
                                    </DropdownItem>
                                  </li>
                                  <li>
                                    <DropdownItem
                                      tag="a"
                                      href="#details"
                                      onClick={(ev) => {
                                        ev.preventDefault();
                                        history.push(`${process.env.PUBLIC_URL}/kyc-details-regular/${item.customer_id}`);
                                      }}
                                    >
                                      <Icon name="focus"></Icon>
                                      <span>View Details</span>
                                    </DropdownItem>
                                  </li>
                                  {item.customer_ekyc_status === "Rejected" ? null : item.customer_ekyc_status === "Approved" ? (
                                    <li onClick={() => onRejectClick(item.customer_id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#reject"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="na"></Icon>
                                        <span>Reject User</span>
                                      </DropdownItem>
                                    </li>
                                  ) : (
                                    <React.Fragment>
                                      <li onClick={() => onApproveClick(item.customer_id)}>
                                        <DropdownItem
                                          tag="a"
                                          href="#approve"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="check-thick"></Icon>
                                          <span>Approve</span>
                                        </DropdownItem>
                                      </li>
                                      <li onClick={() => onRejectClick(item.customer_id)}>
                                        <DropdownItem
                                          tag="a"
                                          href="#suspend"
                                          onClick={(ev) => {
                                            ev.preventDefault();
                                          }}
                                        >
                                          <Icon name="na"></Icon>
                                          <span>Suspend User</span>
                                        </DropdownItem>
                                      </li>
                                    </React.Fragment>
                                  )}
                                </ul>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </li>
                        </ul>
                      </DataTableRow>
                    </DataTableItem>
                  );
                })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {currentItems.length > 0 ? (
                <PaginationComponent
                  noDown
                  itemPerPage={itemPerPage}
                  totalItems={totalCustomers}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
      </Content>

      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} className="modal-dialog-centered" size="lg">
        <ModalBody>
          <a
            href="#cancel"
            onClick={(ev) => {
              ev.preventDefault();
              setViewModal(false);
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="nk-modal-head">
            <h4 className="nk-modal-title title">
              KYC Details <small className="text-primary"> {detail.customer_id}</small>
            </h4>
          </div>
          <div className="nk-tnx-details mt-sm-3">
            <Row className="gy-3">
              <Col lg={6}>
                <span className="sub-text">User ID</span>
                <span className="caption-text">{detail.customer_user_id}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Applicant Name </span>
                <span className="caption-text text-break">{detail.customer_name}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Document Type </span>
                <span className="caption-text">EKYC</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Status</span>
                <Badge
                  color={detail.customer_ekyc_status === "Approved" ? "success" : detail.customer_ekyc_status === "Pending" ? "info" : "danger"}
                  size="md"
                >
                  {detail.customer_ekyc_status}
                </Badge>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Date</span>
                <span className="caption-text"> {moment(detail.customer_updated_at).format("DD/MM/YYYY")}</span>
              </Col>
              <Col lg={6}>
                <span className="sub-text">Checked By</span>
                <span className="caption-text"> {detail.checked_by_user_name}</span>
              </Col>
            </Row>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal.add} toggle={() => setModal({ add: false })} className="modal-dialog-centered" size="xl">
        <ModalBody>
          <a
            href="#close"
            onClick={(ev) => {
              ev.preventDefault();
              onFormCancel();
            }}
            className="close"
          >
            <Icon name="cross-sm"></Icon>
          </a>
          <div className="p-2">
            <h5 className="title">
              {customerId ? "UPDATE KYC" : "Add KYC"}
            </h5>
            <div className="data-head mt-5">
              <h6 className="overline-title">Customer Details</h6>
            </div>
            <div className="mt-4">
              <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
               
                <Col md="6">
                  <FormGroup>
                    <label className="form-label">Mobile Number</label>
                    <input
                      className="form-control"
                      type="tel"
                      name="mobile"
                      maxLength={10}
                      // value={customerFormData.mobile}
                      defaultValue={customerFormData.mobile}
                      placeholder="10 Digit Mobile Number"
                      ref={register({ required: "This field is required" })}
                      onChange={(e) => {
                        onChangeMobile(e)
                        // setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value })
                      }}
                    />
                    {errors.mobile && <span className="invalid">{errors.mobile.message}</span>}
                  </FormGroup>
                </Col>
                <Col md="6">
                <FormGroup>
                    {/* customer_reseller_id */}
                    <label className="form-label">User ID</label>
                    <div className="form-control-wrap">
                      <RSelect
                        placeholder="Select User Id"
                        options={customerUserIds}
                        value={{ value: customerFormData.userId, label: customerFormData.userId }}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, userId: e.value })}
                      />
                    </div>
                  </FormGroup>

         
                </Col>
                <Col md="6">
                  <FormGroup>
                    <label className="form-label">Customer Name</label>
                    <input
                      className="form-control"
                      type="text"
                      name="name"
                      value={customerFormData.name}
                      placeholder="Enter Customer name"
                      ref={register({ required: "This field is required" })}
                      onChange={(e) => setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value })}
                    />
                    {errors.name && <span className="invalid">{errors.name.message}</span>}
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
                      placeholder="Enter Customer email"
                      onChange={(e) => setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value })}
                      ref={register({
                        // required: "This field is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address",
                        },
                      })}
                    />
                    {errors.email && <span className="invalid">{errors.email.message}</span>}
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    {/* customer_reseller_id */}
                    <label className="form-label">Partner</label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={partnerListOptions}
                        value={{ value: customerFormData.partner, label: customerFormData.partner ? "M/s" + customerFormData.partner : "Select" }}
                        onChange={(e) => handleSelectInputChange(e, "partner")}
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
                        value={{ value: customerFormData.reseller, label: customerFormData.reseller ? "M/s" + customerFormData.reseller : "Select" }}
                        onChange={(e) => handleSelectInputChange(e, "reseller")}
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
                        value={{ value: customerFormData.plan, label: customerFormData.plan ? customerFormData.plan : "Select" }}
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
                        placeholder="Enter Amount"
                        // ref={register({ required: "This field is required" })}
                        // onChange={(e) => handleInputChange(e)}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value })}

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
                        defaultValue={customerFormData.securityAmount}
                        // defaultValue={customerFormData.mobile}
                        placeholder=""
                        // ref={register({ required: "This field is required" })}
                        // onChange={(e) => handleInputChange(e)}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value })}

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
                        // value={customerEKYCFormData.address}
                        value={customerFormData.address}
                        placeholder=""
                        // ref={register({ required: "This field is required" })}
                        // onChange={(e) => handleInputChange(e)}
                        onChange={(e) => setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value })}

                      />
                    </div>
                  </FormGroup>
                </Col>


                <Col md="12">
                  <div className="data-head">
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
                      defaultValue={customerFormData.aadharNumber}
                      placeholder="XXXX-XXXX-XXXX-XXXX"
                      onChange={(e) => setCustomerFormData({ ...customerFormData, [e.target.name]: e.target.value })}
                    // ref={register({ required: "This field is required" })}
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
                          // multiple
                          className="custom-file-input"
                          id="aadharFront"
                          // value={customerFormData.aadharFront.file_name ? customerFormData.aadharFront.file_name : ""}
                          onChange={(e) => onFileUpload(e, "aadharFront")}
                        />
                        <label className="custom-file-label" htmlFor="customMultipleFiles">
                          {customerFormData.aadharFront.file_url ? customerFormData.aadharFront.file_name : "Choose files"}
                        </label>
                      </div>
                    </div>
                    {errors.name && <span className="invalid">{errors.name.message}</span>}
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
                        <label className="custom-file-label" htmlFor="customMultipleFiles">
                          {customerFormData.aadharBack.file_url ? customerFormData.aadharBack.file_name : "Choose files"}
                        </label>
                      </div>
                    </div>
                    {errors.name && <span className="invalid">{errors.name.message}</span>}
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label className="form-label">Other Document</label>
                    <div className="form-control-wrap">
                      <RSelect
                        options={otherDocType}
                        value={{ value: customerFormData.otherDocType, label: customerFormData.otherDocType ? customerFormData.otherDocType : "Select" }}
                        onChange={(e) => handleSelectInputChange(e, "otherDocType")}
                        placeholder="Please Other Doc Type"

                      />
                    </div>
                    {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label className="form-label">Other Document (Front)</label>
                    <div className="form-control-wrap">
                      <div className="custom-file">
                        <input
                          type="file"
                          // multiple
                          className="custom-file-input"
                          id="otherDocFront"
                          onChange={(e) => onFileUpload(e, "otherDocFront")}
                        />
                        <label className="custom-file-label" htmlFor="customMultipleFiles">
                          {customerFormData.otherDocFront.file_url ? customerFormData.otherDocFront.file_name : "Choose files"}
                        </label>
                      </div>
                    </div>
                    {/* {errors.name && <span className="invalid">{errors.name.message}</span>} */}
                  </FormGroup>
                </Col>
                <Col md="4">
                  <FormGroup>
                    <label className="form-label">Other Document (Back)</label>
                    <div className="form-control-wrap">
                      <div className="custom-file">
                        <input
                          type="file"
                          multiple
                          className="custom-file-input"
                          id="otherDocBack"
                          onChange={(e) => onFileUpload(e, "otherDocBack")}
                        />
                        <label className="custom-file-label" htmlFor="customMultipleFiles">
                          {customerFormData.otherDocBack.file_url ? customerFormData.otherDocBack.file_name : "Choose files"}
                        </label>
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
                          onFormCancel();
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
        </ModalBody>
      </Modal>

    </React.Fragment>
  );
};
export default KycListRegular;
