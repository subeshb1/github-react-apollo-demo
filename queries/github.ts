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
    search(query: $query, type: USER, first: 10, after: $cursor) {
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

export const SEARCH_USER_REPOSITORIES = gql`
  query ListRepositoriesByUser($login: String!, $cursor: String) {
    user(login: $login) {
      repositories(first: 75, after: $cursor) {
        edges {
          node {
            name
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            owner {
              login
              avatarUrl
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const LIST_REPOSITORY_ISSUES = gql`
  query ListRepositoryIssues($owner: String!, $name: String!, $cursor: String) {
    repository(owner: $owner, name: $name) {
      issues(first: 20, after: $cursor) {
        edges {
          node {
            id
            number
            title
            body
            createdAt
            state
            author {
              login
              avatarUrl
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const FIND_REPO_BY_NAME = gql`
  query FindRepoByName($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      owner {
        login
      }
    }
  }
`;
