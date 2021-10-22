import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time with an offset from UTC/Greenwich in the ISO-8601 calendar system using the format ParseCaseSensitive(false)(ParseCaseSensitive(false)(Value(Year,4,10,EXCEEDS_PAD)'-'Value(MonthOfYear,2)'-'Value(DayOfMonth,2))'T'(Value(HourOfDay,2)':'Value(MinuteOfHour,2)[':'Value(SecondOfMinute,2)[Fraction(NanoOfSecond,0,9,DecimalPoint)]]))ParseStrict(false)Offset(+HH:MM:ss,'Z')ParseStrict(true) */
  OffsetDateTime: any;
};

export type Message = {
  __typename?: 'Message';
  datetime: Scalars['OffsetDateTime'];
  messageId: Scalars['String'];
  text: Scalars['String'];
  userId: Scalars['String'];
};

export type Mutations = {
  __typename?: 'Mutations';
  /**
   *
   *   Post `messages`. return posted datetime when it succeeded
   *
   *   - `channelId` should be "1" or "2" or "3"
   *   - `userId` should be "Sam", "Russell", "Joyse"
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *   500|`Couldn't save message, please retry.`
   *
   */
  postMessage?: Maybe<Message>;
};


export type MutationsPostMessageArgs = {
  channelId: Scalars['String'];
  text: Scalars['String'];
  userId: Scalars['String'];
};

export type Queries = {
  __typename?: 'Queries';
  /**
   *
   *   get latest `messages`
   *
   *   - `channelId` should be "1" or "2" or "3"
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *
   */
  fetchLatestMessages?: Maybe<Array<Message>>;
  /**
   *
   *   Get more `messages`.
   *
   *   - if `old` = true, you can fetch older messages than messageId
   *   - if `old` = false, you can fetch newer messages than messageId
   *   - `message` length is at most 10
   *
   *   Code|Error
   *   ---|---
   *   400|`Channel not found`
   *   400|`Message not found`
   *
   */
  fetchMoreMessages?: Maybe<Array<Message>>;
};


export type QueriesFetchLatestMessagesArgs = {
  channelId: Scalars['String'];
};


export type QueriesFetchMoreMessagesArgs = {
  channelId: Scalars['String'];
  messageId: Scalars['String'];
  old: Scalars['Boolean'];
};

export type FetchLatestMessagesQueryVariables = Exact<{
  channelId: Scalars['String'];
}>;


export type FetchLatestMessagesQuery = { __typename?: 'Queries', fetchLatestMessages?: Array<{ __typename?: 'Message', userId: string, text: string, datetime: any, id: string }> | null | undefined };

export type PostMessageMutationVariables = Exact<{
  channelId: Scalars['String'];
  text: Scalars['String'];
  userId: Scalars['String'];
}>;


export type PostMessageMutation = { __typename?: 'Mutations', postMessage?: { __typename?: 'Message', userId: string, text: string, datetime: any, id: string } | null | undefined };

export type MessageFragment = { __typename?: 'Message', userId: string, text: string, datetime: any, id: string };

export const MessageFragmentDoc = gql`
    fragment Message on Message {
  id: messageId
  userId
  text
  datetime
}
    `;
export const FetchLatestMessagesDocument = gql`
    query FetchLatestMessages($channelId: String!) {
  fetchLatestMessages(channelId: $channelId) {
    ...Message
  }
}
    ${MessageFragmentDoc}`;

/**
 * __useFetchLatestMessagesQuery__
 *
 * To run a query within a React component, call `useFetchLatestMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchLatestMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchLatestMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useFetchLatestMessagesQuery(baseOptions: Apollo.QueryHookOptions<FetchLatestMessagesQuery, FetchLatestMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchLatestMessagesQuery, FetchLatestMessagesQueryVariables>(FetchLatestMessagesDocument, options);
      }
export function useFetchLatestMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchLatestMessagesQuery, FetchLatestMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchLatestMessagesQuery, FetchLatestMessagesQueryVariables>(FetchLatestMessagesDocument, options);
        }
export type FetchLatestMessagesQueryHookResult = ReturnType<typeof useFetchLatestMessagesQuery>;
export type FetchLatestMessagesLazyQueryHookResult = ReturnType<typeof useFetchLatestMessagesLazyQuery>;
export type FetchLatestMessagesQueryResult = Apollo.QueryResult<FetchLatestMessagesQuery, FetchLatestMessagesQueryVariables>;
export const PostMessageDocument = gql`
    mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
  postMessage(channelId: $channelId, text: $text, userId: $userId) {
    ...Message
  }
}
    ${MessageFragmentDoc}`;
export type PostMessageMutationFn = Apollo.MutationFunction<PostMessageMutation, PostMessageMutationVariables>;

/**
 * __usePostMessageMutation__
 *
 * To run a mutation, you first call `usePostMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMessageMutation, { data, loading, error }] = usePostMessageMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      text: // value for 'text'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function usePostMessageMutation(baseOptions?: Apollo.MutationHookOptions<PostMessageMutation, PostMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument, options);
      }
export type PostMessageMutationHookResult = ReturnType<typeof usePostMessageMutation>;
export type PostMessageMutationResult = Apollo.MutationResult<PostMessageMutation>;
export type PostMessageMutationOptions = Apollo.BaseMutationOptions<PostMessageMutation, PostMessageMutationVariables>;