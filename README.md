# API Proxy Cacher

API Proxy Cacher is a simple server designed to cache API requests, facilitating the development of frontend projects even when working offline, such as during travel or in environments without internet access.

## Table of contents
- [Features](#features)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Caching**: API Proxy Cacher caches API requests, allowing you to work offline.
- **Easy to use**: API Proxy Cacher is easy to use, just set the API URL and start the server.

## Configuration
API Proxy Cacher can be configured using environment variables.

### Environment Variables
| Variable     | Description                                              | Default                 |
|--------------|----------------------------------------------------------|-------------------------|
| `TARGET_URL` | The API target URL to call.                              | `http://localhost:3000` |
| `PORT`       | The port that the server will listen on.                 | `8080`                  |
| `OFFLINE`    | If `true`, the server will not make requests to the API. | `false`                 |

## Getting Started
### Installation
Clone the project from GitHub and install the dependencies:

```bash
yarn install
```

### Usage
Start the server:
```bash
yarn start
```
The server will be running on localhost:8080 by default. You can change the port by setting the `PORT` environment variable.

The server will start caching requests. When there is no internet connection, the server will automatically return the cached response, but if you don't want to wait, just set the `OFFLINE` environment variable to `true`.

## Contributing
Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License
API Proxy Cacher is licensed under the [MIT License](LICENSE).
