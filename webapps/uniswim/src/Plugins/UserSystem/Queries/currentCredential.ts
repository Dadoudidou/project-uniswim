import gql from "graphql-tag"

export const CurrentCredentialQuery = gql`
    query currentCredential {
        credential {
            token
        }
    }
`;

export type CurrentCredentialData = {
    credential: {
        token: string
    }
}
