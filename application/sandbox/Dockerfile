FROM ubuntu:bionic

ARG DENO_VERSION

RUN apt-get update
RUN apt-get install -y --fix-missing curl
RUN groupadd -r deno && useradd -s /bin/bash -g deno deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s $DENO_VERSION
RUN mkdir -p /home/deno && mv /root/.local/bin/deno /home/deno/deno
RUN chown -R deno:deno /home/deno

USER deno
WORKDIR /home/deno
