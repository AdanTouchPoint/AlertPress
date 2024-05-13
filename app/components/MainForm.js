"use client";
import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import List from "./List";
import ListSelect from "./ListSelect";
import AIPrompt from "./AIPrompt";
import EmailForm from "./EmailForm";
import ThankYou from "./ThankYou";
import { Link, animateScroll as scroll } from "react-scroll";
import { fetchRepresentatives } from "../assets/petitions/fetchRepresentatives";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import LoadingMainForm from "./LoadingMainForm";
const MainForm = ({
  leads,
  setLeads,
  dataUser,
  setDataUser,
  mp,
  setMp,
  setEmailData,
  emailData,
  clientId,
  states,
  tweet,
  typData,
  mainData,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  senator,
  setSenator,
  setDataQuestions,
  dataQuestions,
  questions,
  setQuestions,
  configurations,
  allDataIn,
  setAllDataIn,
  colors,
  formFields,
  emails,
  setEmails
}) => {
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [showList, setShowList] = useState(true);
  const [showFindForm, setShowFindForm] = useState(false);
  const [hideIAPrompt, setHideIAPrompt] = useState(true);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(true);
  const [tac, setTac] = useState(false);
  const [showListSelect,setShowListSelect] = useState(false)
 
  const [many, setMany] =  useState(false)
  const [showMainContainer, setShowMainContainer] = useState(false)
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  const handleTerms = (e) => {
    if (e.target.checked === true) {
      setTac(true);
    } else {
      setTac(false);
    }
  };
  const selectAll = (e) => {
  fetchLeads(
    true,
    backendURLBase,
    endpoints,
    clientId,
    dataUser,
    emailData,
    'NA',
    'checkbox-list-email-preference-lead'
  );
  setMany(true)
setEmails([
  ...mp,
  ...senator
]
)
e.preventDefault()
setShowListSelect(false)
setShowList(true)
  }
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const back = (e) => {
    e.preventDefault;
    setShowFindForm(false)
    setShowList(true)
  }
  const click = async (e) => {
    e.preventDefault();
    console.log(validated, 'validated')
    setValidated(true);
    setShowLoadSpin(true);
    setError(false);
    fetchLeads(
      true,
      backendURLBase,
      endpoints,
      clientId,
      dataUser,
      emailData,
      'NA',
      'basic-data-user'
    );
    setLeads(leads + 1)
  };
  if (!mainData) return "loading datos";
  if (!mp) return "loading datos";
  return (
    <div className={"contenedor main-form-flex-container"}>
      <div className={"container instructions"}></div>
      <div className={"form-container"} hidden={showMainContainer} >
        <div  className={"container container-content" }>
          {error ? (
            <Alert variant={"danger"}>
              Please fill all fields. Also, please make sure there are no spaces
              before of after your email or postcode.
            </Alert>
          ) : null}
          <Form
            name="fm-find"
            onSubmit={click}
            noValidate
            validated={validated}
            hidden={showFindForm}
          >
            <div className="instructions-container">
              <h3 className="main-texts-color main-text-title">{mainData.title}</h3>
              <p className="main-texts-color main-text-instruction">{mainData.instruction}</p>
            </div>
            {/* <h3 className="find-her-mp-text main-texts-color">{mainData.firstFormLabel1}</h3> */}
            <div className="fields-form">
              {formFields.map((field, key) => {
                return field.type !== "state" ? (
                  <Form.Group  className="field" key={key}>
                    <Form.Label className="select-label main-texts-color labels-text-format" htmlFor={`emailInput-mainForm${key}`}>
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id={`emailInput-mainForm${key}`}
                      type={field.type === 'emailUser' ? 'email' : field.type}
                      placeholder={field.placeholder}
                      name={field.type ===  "name" ? "userName" : field.type }
                      onChange={handleChange}
                      className="input-color main-form-inputs"
                      required
                    />
                  </Form.Group>
                ) : states.length > 0 ? (
                  <Form.Group className={"field"} key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Select
                      aria-label="DefaulValue"
                      required
                      name={field.type}
                      id="stateSelect-mainForm"
                      onChange={handleChange}
                    >
                      <option key={"vacio"} value={""}>
                        {field.placeholder}
                      </option>
                      {states.sort().map((estate) => (
                        <option key={estate} value={estate}>
                          {estate}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                ) : (
                  <Form.Group className="field" key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id="emailInput-mainForm"
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.type}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                );
              })}
            </div>
            <Form.Group
              style={{ textAlign: "justify" }}
              className="field select-styles-form terms-and-cond-input"
              controlId="conditions"
            >
              <Form.Check
                name="conditions"
                onClick={handleTerms}
                className="links-checkboxes-color terms-and-cond-input"
                // bsPrefix="custom-checkbox"
                required
                label={
                  <a
                    target={"_blank"}
                    className="links-checkboxes-color"
                    rel={"noreferrer"}
                    href={mainData.termsAndConditionsURL}
                  >
                    Terms and Conditions
                  </a>
                }
              />
            </Form.Group>
            <Form.Group 
              className="main-find-btn-container"
            >
            </Form.Group>
            {showLoadSpin ? (
              loading("spinner-containerB")
            ) : null}
          </Form>
          <div className={"container senators-container"}>
            <div className="representatives-container">
              {
                <ListSelect
                  setError={setError}
                  setValidated={setValidated}
                  setEmails={setEmails}
                  leads={leads}
                  setLeads={setLeads}
                  emails={emails}
                  tac={tac}
                  setShowListSelect={setShowListSelect}
                  setHideIAPrompt={setHideIAPrompt}
                  setShowFindForm={setShowFindForm}
                  showFindForm={showFindForm}
                  emailData={emailData}
                  setEmailData={setEmailData}
                  dataUser={dataUser}
                  mp={mp}
                  clientId={clientId}
                  // key={index}
                  tweet={tweet}
                  allDataIn={allDataIn}
                  setAllDataIn={setAllDataIn}
                  showMainContainer={showMainContainer}
                  setShowMainContainer={setShowMainContainer}
                  backendURLBase={backendURLBase}
                  endpoints={endpoints}
                  
                />
              }
            </div>
          </div>
        </div>  
    </div>
    <AIPrompt
      many={many}
      setMany={setMany}
      setShowList={setShowList}
      setLeads={setLeads}
      leads={leads}
      setShowThankYou={setShowThankYou}
      setShowFindForm={setShowFindForm}
      setHideIAPrompt={setHideIAPrompt}
      hideIAPrompt={hideIAPrompt}
      dataUser={dataUser}
      emailData={emailData}
      setEmailData={setEmailData}
      setDataUser={setDataUser}
      clientId={clientId}
      endpoints={endpoints}
      backendURLBase={backendURLBase}
      backendURLBaseServices={backendURLBaseServices}
      mainData={mainData}
      questions={questions}
      setQuestions={setQuestions}
      setDataQuestions={setDataQuestions}
      dataQuestions={dataQuestions}
      allDataIn={allDataIn}
      setAllDataIn={setAllDataIn}
      configurations={configurations}
      setShowMainContainer={setShowMainContainer}
        
      />
      <ThankYou
        emailData={emailData}
        setDataUser={setDataUser}
        setEmailData={setEmailData}
        setShowFindForm={setShowFindForm}
        setShowThankYou={setShowThankYou}
        clientId={clientId}
        typData={typData}
        showThankYou={showThankYou}
        setShowMainContainer={setShowMainContainer}
        colors={colors}
      />
    </div>
  );
};
export default MainForm;