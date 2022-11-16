# Store Manager Project

## Summary

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Additional Info</a></li>
  </ol>
</details>

## About The Project

RESTful API using Model-Service-Controller architecture (MSC).
Dropshipping store management API, to create, read, update and delete products and sales.

> This is a project developed to better understand how the MSC architecture works.

### Build With

![JavaScript][JavaScript.io]

[![NodeJS][NodeJS.io]][NodeJS-url]

[![Express][Express.io]][Express-url]

[![MySQL][MySQL.io]][MySQL-url]

[![Mocha][Mocha.io]][Mocha-url]

[![Chai][Chai.io]][Chai-url]

[![Docker][Docker.io]][Docker-url]


## Getting Started
To run this project, it's recommended to use Docker

### Installation

1. Clone the repo
```
  git clone git@github.com:biancaoura/project-store-manager.git
```
2. Run the docker services: `node` and `db`
```sh
  docker-compose up -d
```
3. Run the container
```
  docker exec -it store_manager bash
```
4. Install npm packages
```
  npm install
```
5. Run the project

```
  npm start
```
Alternatively, to run with `nodemon`:
```
  npm run debug
```

## Usage

Since this is a simple back-end project, there's no front-end.
Using `StoreManager` DB (`migration.sql` and `seed.sql`).

### Products Route

#### GET `/products`
- Lists all products in the format:
```json
[
  {
    "id": 1,
    "name": "Thor's Hammer"
  },
  {
    "id": 2,
    "name": "Ion Cannon"
  }
  /* ... */
]
```

#### GET `/products/:id`
- Takes a number parameter, and, if the id is an existing product, will return the info:
```json
{
  "id": 1,
  "name": "Thor's Hammer"
}
```

#### GET `/products/search`
- The query param should follow the format:
```
  /products/search?q=hammer
```
- If there's a corresponding item, the response will be like:
```json
[
  {
    "id": 1,
    "name": "Thor's Hammer"
  }
]
```
- If there's no parameter, the response will return all of the products:
```json
[
  {
    "id": 1,
    "name": "Thor's Hammer"
  },
  {
    "id": 2,
    "name": "Ion Cannon"
  }
  /* ... */
]
```

#### POST `/products`
- Creates a new product.
- The product name must have at least 5 characters and the body should have the following format:
```json
{
  "name": "Product Name"
}
```
- If the product is successfully created, the response should be like:
```json
{
  "id": 4,
  "name": "Product Name"
}
```

#### PUT `/products/:id`
- Takes a number parameter, and updates the product, if it exists
- The body should follow the format:
```json
{
  "name": "Loki's Hammer"
}
```
- When successfully updating, the response should be like:
```json
{
  "id": 1,
  "name": "Loki's Hammer"
}
```

#### DELETE `/products/:id`
- Takes a number parameter, and deletes the product, if it exists
- Will return a HTTP `204` status if the product is deleted.

### Sales Route

#### GET `/sales`
- Lists all sales in the format:
```json
[
  {
    "saleId": 1,
    "date": "2022-11-11T04:54:29.000Z",
    "productId": 1,
    "quantity": 10
  },
  {
    "saleId": 1,
    "date": "2022-11-11T04:54:54.000Z",
    "productId": 2,
    "quantity": 10
  }

  /* ... */
]
```

#### GET `/sales/:id`
- Takes a number parameter, and, if the id is an existing sale, will return the info:
```json
[
  {
    "date": "2022-11-11T04:54:29.000Z",
    "productId": 1,
    "quantity": 10
  },
  {
    "date": "2022-11-11T04:54:54.000Z",
    "productId": 2,
    "quantity": 10
  }

  /* ... */
]
```

#### POST `/sales`
- Creates a new sale
- The body should have the following format:
```json
[
  {
    "productId": 1,
    "quantity": 10
  },
  {
    "productId": 2,
    "quantity": 1
  }
]
```
- If the sale is successfully created, the response should be like:
```json
{
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 10
    },
    {
      "productId": 2,
      "quantity": 1
    }
  ]
}
```

#### PUT `/sales/:id`
- Takes a number parameter, and updates the sale, if it exists
- The body should follow the format:
```json
[
  {
    "productId": 1,
    "quantity": 5
  },
  {
    "productId": 2,
    "quantity": 3
  }
]
```
- When successfully updating, the response should be like:
```json
{
  "saleId": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 5
    },
    {
      "productId": 2,
      "quantity": 3
    }
  ]
}
```

#### DELETE `/sales/:id`
- Takes a number parameter, and deletes the sale, if it exists
- Will return a HTTP `204` status if the sale is successfully deleted.

## Additional Info
- This was a project developed at Trybe
- My first project using MSC architecture and tests with `mocha`, `chai` and `sinon`
> `docker-compose.yml`, `migration.sql` and `seed.sql` files provided by Trybe

[JavaScript.io]: https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=javascript&logoColor=black
[Express.io]: https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white
[Express-url]: https://expressjs.com
[Mocha.io]: https://img.shields.io/badge/mocha-8D6748?style=flat-square&logo=mocha&logoColor=white
[Mocha-url]: https://mochajs.org
[Chai.io]: https://img.shields.io/badge/chai-A30701?style=flat-square&logo=chai&logoColor=white
[Chai-url]: https://www.chaijs.com
[NodeJS.io]: https://img.shields.io/badge/node.js-339933?style=flat-square&logo=node.js&logoColor=white
[NodeJS-url]: https://nodejs.org/en/
[MySQL.io]: https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com
[Docker.io]: https://img.shields.io/badge/docker-2496ED?style=flat-square&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com