# Project 5: Spike 3

# Apollo

[**Apollo**](https://www.apollographql.com/) is still the most popular library for assisting with GraphQL. It's by no means the only option, and it's quite a large package, but it comes with functionality that can be utilized by both front and back-end applications. To use it front-end, we'll install **graphql** and the **@apollo/client** packages:

```
npm install @apollo/client graphql
```

~~Let's follow the steps on Apollo's [Getting Started](https://www.apollographql.com/docs/react/get-started) documentation to set up the client. Make sure you're looking at the docs for React! I will create a new `apolloClient.ts` file and export the `client` variable (the `uri` property will need to be updated to the endpoint for the API you're working with). Following their example, we can then fetch data through the `client` with `.query()` and `gql`.~~

~~This works fine, but the next step demonstrates how we can configure Apollo like a Context - it will generate a **Provider** which we can wrap around our app. Put it as high as it needs to be to add Apollo functionality to all your components. Once it's set up, we can use the `useQuery()` hook anywhere _inside_ the Provider.~~

So as I was revising this material for the spike today, I realised that Apollo Client as it currently exists is incompatible with Next.js' App Router. It is called "Apollo Client" because it uses client side tools to help you make GraphQL Queries and Mutations more easily. As we covered yesterday, however, the newest version of Next.js defaults to **Server Side Rendering**. You could manually include `"use client"` in all your Components, but this really defeats the purpose of using Next.js at all. 

Apollo are working on a solution to this, for now they have an [experimental support package](https://www.npmjs.com/package/@apollo/experimental-nextjs-app-support) available. We are going to use this today! I used [this article](https://www.apollographql.com/blog/using-apollo-client-with-next-js-13-releasing-an-official-library-to-support-the-app-router), and sample code from [this repository](https://github.com/apollographql/apollo-client-nextjs/tree/main/examples/polls-demo) to find this solution.

We're going to install the package:

```
npm install @apollo/experimental-nextjs-app-support
```

From here we will copy the `<ApolloWrapper>` Component from the article (we'll need to substitute the `uri` for our own GraphQL API endpoint). This wrapper is substituting the `<ApolloProvider>` from the documentation, which it is a Client Side Component that is going to pass down the Apollo Client tools to all its children. Think of it like an Apollo Context - we want it as high in our component tree as possible so as much of our app as possible has access to it. For this project, we can use our top level `layout.tsx`.

For Client Components, Apollo will now work like normal. Let's give it a try! For organisation, we can keep all our Queries together in a file and import them when needed. A GraphQL Query can be saved as a variable using `gql` and a stringified query:

```ts
import { gql } from "@apollo/client";

export const GETALLCOUNTRIES = gql`
    query GetAllCountries {
        countries {
            emoji
            name
            code
        }
    }
`
```

### Configuring your Environment

One criticism aimed at GraphQL has been how difficult it can be to write Queries and Mutations straight from the code editor. There are a few tools we can use though, to set up a working environment that makes using a GraphQL API much easier. There are two VSCode extensions I recommend installing: 
- GraphQL: Language Feature Support
- GraphQL: Syntax Highlighting

If we install them and then look at our Queries, even though they're still just strings in Template Literals, your theme should apply to the Query properties, making it much easier to see what you're doing. We can go a step further and define a `.graphqlrc` - this is a config file, the documentation for **GraphQL: Language Feature Support** gives many options you can set, but the main one we want is `schema`, where we can actually give VSCode the API endpoint. The extension can fetch the Schema. Now we can get auto-complete suggestions straight in VSCode!

```json
{
  "schema": "https://countries.trevorblades.com/graphql"
}
```

This file needs to be in the **root directory open in VSCode**. We're only configuring a local environment to make development easier, this file isn't actually relevant to your project. So, if you have a higher directory open, you'll need this file to be there, in what _VSCode_ considers the root, rather than the root of your _project_. Alternatively there are extension settings that can be adapted for this. 

### Client Side Queries

To [execute a query](https://www.apollographql.com/docs/react/data/queries#executing-a-query) in a Client Component, we use the `useQuery()` hook which returns an object holding 3 states: `loading`,`error`, and `data`. The first required argument is the Query to be fetched. Since we're working in the Client Side, we have to treat these states the way we always have - `data` and `error` could be `undefined`, and `loading` will be `true` until there is either data or an error to show. A second optional argument is an **options** object: this is how we pass variables, on the `variables` property. 

```tsx
  const { loading, error, data } = useQuery<Type>(QUERY, { variables: { key: "value" } });
```

If you choose to work with Apollo and `useQuery()`, it's important to understand that query result are automatically **cached** (this is defined when we create the Client). This is to reduce requests to your server, but this could leave your front-end with stale data. The Hook will also return a [`refetch()`](https://www.apollographql.com/docs/react/data/refetching) function for every Query, which can be called to bypass the existing cache and force a request for fresh data.

### Server Side Queries

Our Server Components can't use the hooks passed down by the `<ApolloWrapper>`, so the experimental package we installed is going to give us some new tools that they _can_ use. There are issues with cache (the Client Components will have their own cache stored by Apollo, this can fall out of sync with the Server Components' cache being held by Next.js) and also possibly "race conditions" (which refers to inconsistencies that could occur when a Server Component is still rendering, but an overlapping query from a Client Component causes a conflict). This is a Next.js problem, not an Apollo problem, it just becomes more apparent when working with a framework built for making requests!

We're going to create a file to save an Apollo Client instance for our Server - I think it would be best to save it in a `lib` or `utils` folder:

```ts
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: "graphql endpoint goes here",
    }),
  });
});
```

We can now import `getClient` into an asynchronous Server Component and use it like so:

```tsx
  const data = await getClient().query<Type>({
    query: QUERY,
    variables: { key: "value" },
  });
```

There is very little documentation or examples to gather best practises, but the Component can be wrapped in a `<Suspense>` with a `fallback` for loading, and the `error.tsx` will handle errors. 

### useSearchParams

https://nextjs.org/docs/app/api-reference/functions/use-search-params