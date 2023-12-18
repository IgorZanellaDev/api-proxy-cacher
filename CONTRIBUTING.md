# Contributing to API Proxy Cacher

Thank you for considering contributing to API Proxy Cacher! Your help is essential for making this project better for everyone.

## How to Contribute

To contribute to API Proxy Cacher, follow these steps:

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Create a new branch for your contribution:
   ```bash
   git checkout -b feat/new-feature
    ```
4. Commit your changes (use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)).
5. Push your changes to your forked repository.
6. Submit a pull request to the `main` branch of the `api-proxy-cacher` repository.
7. Wait for your pull request to be reviewed and merged.

## Code style
Use Prettier to format your code. Configure your editor to use the Prettier extension for your editor of choice.

## Commit style
Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to format your commit messages.

## Database migrations
If you make changes to the database schema, you must create a new migration file. To do this, run the following command:
```bash
yarn prisma migrate dev --name <migration-name>
```
Push the cache.db file always without rows data. 

## Reporting Bugs
If you find a bug, please report it by opening an issue on the GitHub repository.

## License
By contributing to API Proxy Cacher, you agree that your contributions will be licensed under its MIT license. Thank you!