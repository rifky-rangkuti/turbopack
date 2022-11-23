import React from "react";

function index() {
  return null;
}
export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/pokemon",
      permanent: true,
    },
    props: {},
  };
};
export default index;
