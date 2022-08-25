# harmony-core

## Details

This is the core module used by Harmony.

## Prerequisites

* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [git-secret](https://git-secret.io/installation)

## Usage

```yaml
# docker-compose.yaml
---

services:
  proxy:
    image: ghcr.io/applicreation/harmony-proxy:v0
    ports:
      - 80:80
  core:
    image: ghcr.io/applicreation/harmony-core:v0
    env_file:
      - ./.harmony/core/.env
    volumes:
      - ./.harmony/core:/root/.harmony:ro
  # module config
```

```yaml
# ./.harmony/core/config.yaml
---

name: Core
modules: [ ]
```

## Development

```shell
git secret init
git secret reveal
```

```shell
docker compose run --rm core npm install
docker compose up
```
