import React from "react"
import gql from "graphql-tag"
import { compose, graphql } from "react-apollo";
import { importStore } from "./store";

importStore();

const getPageNameQuery = gql`
    query {
        apolloClientDemo @client {
            currentPageName
        }
    }
`;
const getPageNameOptions = {
  props: ({ data }) => ({
    currentPageName: data && data.apolloClientDemo ? data.apolloClientDemo.currentPageName : undefined,
  })
};

const updatePageNameQuery = gql`
    mutation updatePageName($name: String!) {
        updatePageName(name: $name) @client {
            currentPageName
        }
    }
`;


type CompProps = {
  currentPageName?: string
  updatePageName?: (type: { variables: { name: string } }) => void
}

const TestPage = (props: CompProps) => {
  if (!props) return null;
  return (
    <div>
      <a onClick={() => props.updatePageName({ variables: { name: Math.random().toString() } })} >Click</a>
      <br />
      Test : {props.currentPageName}
    </div>
  )
}

export default compose(
  graphql(getPageNameQuery, getPageNameOptions as any),
  graphql(updatePageNameQuery, { name: 'updatePageName' })
)(TestPage);