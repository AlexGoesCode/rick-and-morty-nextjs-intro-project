# Project 5: Spike 2

# GraphQL

**GraphQL** at it's core is a **Query Language** - a computer language used to make queries in databases and information systems. Think of it less as a tool, and more like a different way of thinking. It was created and has been used by Facebook since 2012, and was made open source in 2015. Developed as an [alternative](https://hygraph.com/blog/graphql-vs-rest-apis) to **REST API** to reduce network usage. 

REST API responses are pre-defined, so a specific endpoint is always going to return the same data, whether your front-end needs the entire response or not. The concept of GraphQL is that the front-end can define on request exactly what they want, and the API does all the hard lifting to filter/sort the data on the server side and returns exactly what is needed. This makes _building_ a GraphQL API quite challenging, but _using_ a GraphQL API a very pleasant developer experience. 

A good analogy is the **RESTaurant** analogy:

In a restaurant that runs like a REST API, when you order a sandwich, you receive is exactly what's listed on the menu. If you want your sandwich to be without cheese and tomato, you have to remove it yourself after it's already on your plate. Additionally, if you want to add pickles, you have to order a whole hamburger, just to the take the pickle off the hamburger and put it on your sandwich.

In a restaurant that runs like a GraphQL API, you can specify when you order that you don't want cheese and tomato, and that you want to add pickles. What you get on your plate is exactly what you want - you don't have to manually rebuild your sandwich once it's in front of you, you just eat it! 

No more huge objects just to use a single property, and no more fetching 10 endpoints with `Promise.all()` and patching them together with JavaScript. GraphQL can return you everything in a single request! GraphQL drastically reduces **over-fetching** by letting the front-end query only what it needs, instead of taking all data supplied by an endpoint and relying on JavaScript functions on the client's device to process the data.

![RESTaurant](gql-sandwich.jpg)

## Queries & Mutations

Because of the way requests in GraphQL must be made, they use the word **Query** to refer to requests to **read** data (like a `GET` request), and **Mutation** refers to requests for **create**, **update** or **delete** (ie. a change to the database, like a `POST`). This language is necessary because a GraphQL API only has **one** endpoint, and every HTTP request must be a `POST`. This is because the body of the request will contain all the instructions, so even if you only want to read data, you still need to send a body, which requires a `POST` request. 

## Explorer

The **GraphQL Explorer** is a tool that substitutes the static documentation you'll be used to having to read through for REST APIs. It is an **IDE** (**Interactive Developer Environment**) generated from the Schemas of the API. In our MERN project, we created Schemas for our documents, but these were not shared outside our app. GraphQL Schemas are **exposed** by default, so the Explorer can use it to know all accessible fields, and the connections between the Types, which let's us create and test valid Queries and Mutations. It really depends on the API developers whether they have their own custom Explorer tool hosted at the main endpoint, for others you'll need to use a dashboard. For example, see the same Star Wars API on [**StepZen**](https://dashboard.stepzen.com/explorer?endpoint=https://swapi-graphql.netlify.app/.netlify/functions/index) and [**Apollo Studio**](https://studio.apollographql.com/public/star-wars-swapi/variant/current/home).

We can look at another simple example of a GraphQL API with [Countries API](https://studio.apollographql.com/public/countries/variant/current/explorer) (this is not the same at the REST Countries API). This one even has an Explorer hosted at the [endpoint](https://countries.trevorblades.com/graphql). Let's make some test queries. We can even do **Relational Queries**, which let us request data from more than one collection in a single request! 

There should always be a documentation tag with some details about the Schemas and Types, which shouldn't look too unfamiliar. It will not be exactly what you know, as they're not using Typescript or Mongoose Types, but their own Type System: **GraphQL Schema Definition Language (SDL)**. It's worth noting the reversed syntax for optional variables between Typescript and GraphQL - in Typescript, all properties are **required** unless specified as optional with a question mark, in GraphQL all properties are **optional** unless specified as required with an exclamation point.

The exposed Schema can also be fetched by Postman. Paste your endpoint, set the **request method** to `POST`, and the body to **GraphQL**. Postman will **Auto-fetch** the Schema, and you can now start typing, or use <kbd>Ctrl</kbd> + <kbd>Spacebar</kbd> to see autocomplete suggestions.

## Variables

Some Queries and Mutations will need some additional information. If you're fetching a single entity from the Countries, Continents or Languages collections, a Type for singular Country, Continent or Language exists for this purpose, but you're going to have to specify _which_. This could be hard-coded into the Query, but this is very inflexible, so a **variable** can be passed into the Query. The [syntax](https://www.apollographql.com/blog/graphql/basics/the-anatomy-of-a-graphql-query/ ) can be a bit confusing at first, think of it like passing parameters into a function: **dollar signs** (**$**) indicate a placeholder name for a variable, and the Type of the variable **must** be defined. Multiple variables can be separated by commas.

The documentation states we can use the `code` of a Country, which is of Type `ID!`. We then specify we're looking for a single Country with a code of `$code`:

```graphql
query getCont ($code: ID!) {
    continent (code: $code) {
        name
        countries {
            name
        }
    }
}
```
In Postman and Explorers, variables can be added from a side-panel. They will usually need to be `JSON`:

```json
{ "code": "OC" }
```

This syntax is also how we can **filter**, ie. "search" for items that match a criteria. This will need to be predefined by the developers, but having the Schema available means we can see which fields can be used to filter a collection. Click the Types as they're suggested by the Explorer to learn more. Not all APIs will operate the same, but it's common to use **Comparison Operators** to define the filter. 

```graphql
query CountriesByCurrency($currency: String) {
    countries (filter: { currency: { eq: $currency } }) {
        name
    }
}

{ "currency": "AUD" }
```

```graphql
query CountriesByCurrency($currency: [String!]) {
    countries (filter: { currency: { in: $currency } }) {
        name
    }
}

{ "currency": ["AUD", "NZD"] }
```

## Fetch API and GraphQL

Like usual, we can look at Postman sample code to see how a GraphQL fetch can be made. This is the raw Query without any library - you can see that it should be formatted with line breaks and spaces. If we trigger an error, the error message will give exact position (line/column coordinates) of the problem. It's nice that Postman does this for us, but this can be confusing and messy when used this way in our code.