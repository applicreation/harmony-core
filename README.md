# harmony-core

## Details

This is the core module used by Harmony.

## Prerequisites

The only tool required is [Docker Desktop](https://www.docker.com/products/docker-desktop).

## Usage

```yaml
# docker-compose.yaml
---

services:
  proxy:
    image: ghcr.io/applicreation/harmony-proxy:latest
    ports:
      - 80:80
  core:
    image: ghcr.io/applicreation/harmony-core:latest
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
docker compose up
```
