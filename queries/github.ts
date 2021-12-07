import { gql } from "@apollo/client";

export const CREATE_ISSUES = gql`
  mutation CreateIssue($id: String!, $title: String!, $body: String!) {
    createIssue(input: { repositoryId: $id, title: $title, body: $body }) {
      issue {
        number
        body
      }
    }
  }
`;

export const LIST_USERS_WITH_PAGINATION = gql`
  query ListUsers($query: String!, $cursor: String) {
    search(query: $query, type: USER, first: 20, after: $cursor) {
      userCount
      edges {
        node {
          ... on User {
            name
            avatarUrl
            login
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const LIST_REPOSITORIES = gql`
  query ListRepositories($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, first: 20, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
              avatarUrl
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const LIST_REPOSITORIES_WITH_PAGINATION = gql`
  query ListRepositories($query: String!, $cursor: String) {
    search(query: $query, type: REPOSITORY, first: 20, after: $cursor) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
              avatarUrl
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;
