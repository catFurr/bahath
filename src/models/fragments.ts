import gql from "graphql-tag";

export const FRAG_BRANCH_CORE = gql`
  fragment BranchCore on BranchNode {
    branchID
    next
    isBackAvail
    isSubmitAvail
    scene {
      sceneID
      bg
      elementsConnection {
        edges {
          row
          col
          node {
            elementID
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
