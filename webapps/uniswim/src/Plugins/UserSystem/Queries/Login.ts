import gql from "graphql-tag"
import { graphql } from "react-apollo"

export const LoginMutation = gql`
    mutation LoginMutation($email: String!, $password: String!){
        createCredential(email:$email,password:$password)
    }
`;

export type LoginMutationVariables = {
    email: string
    password: string
}

export type LoginMutationData = {
    createCredential: string
}
