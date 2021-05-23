import React from "react";
// import { API } from "../backend";
import shopify from "../images/shopify.svg";

const ShopifyAuth = () => {
  function handleSigin(e) {
    e.preventDefault();
    window.open("http://localhost:4000/auth/shopify", "_self");
  }

  return (
    <>
      <div className="card text-center h-full justify-center">
        <div className="card-header">Welcome</div>
        <div className="card-body">
          <h5 className="card-title">Email Editor</h5>
          <p className="card-text">
            Lets increase business with awesome email editor
          </p>
          <div className="card-text" onClick={handleSigin}>
            <div className="flex btn btn-primary w-56">
              <img
                src={shopify}
                alt=""
                style={{
                  height: "30px",
                  width: "30px",
                  filter: "invert(100%)",
                }}
              />
              Login with shopify auth
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopifyAuth;
