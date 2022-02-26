import gql from "graphql-tag";

export const FRAG_BRANCH_CORE = gql`
  fragment BranchCore on BranchNode {
    id
    next
    isBackAvail
    isSubmitAvail
    scene {
      id
      bg
      elementsConnection {
        edges {
          row
          col
          node {
            id
            title
            ... on LinkEl {
              to
            }
            ... on McEl {
              options
            }
          }
        }
      }
    }
  }
`;
