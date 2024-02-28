import React from "react";
import PageContainer from "../../layout/page-container/PageContainer";
import { Link } from "react-router-dom";
import { Block, BlockContent, Button } from "../../components/Component";

const ThankyouPage = () => {
  return (
    <PageContainer>
      <Block className="nk-block-middle wide-xs mx-auto">
        <BlockContent className="nk-error-ld text-center">
          <h6 className="nk-error-head">🙏</h6>
          <h3 className="nk-error-title">Your documents are submitted successfully</h3>
          <p className="nk-error-text">
            Our team member will verify your documents ASAP!
          </p>
          {/* <Link to={`${process.env.PUBLIC_URL}/`}>
            <Button color="primary" size="lg" className="mt-2">
              Back To Home
            </Button>
          </Link> */}
        </BlockContent>
      </Block>
    </PageContainer>
  );
};
export default ThankyouPage;
