ARG VARIANT="20"
FROM mcr.microsoft.com/devcontainers/javascript-node:1-${VARIANT}

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends bundler

# COPY ./script-in-your-repo.sh /tmp/scripts/script-in-codespace.sh
# RUN apt-get update && bash /tmp/scripts/script-in-codespace.sh

# Install homebrew
RUN git clone https://github.com/Homebrew/brew ~/.linuxbrew/Homebrew \
&& mkdir ~/.linuxbrew/bin \
&& ln -s ../Homebrew/bin/brew ~/.linuxbrew/bin \
&& eval $(~/.linuxbrew/bin/brew shellenv) \
&& brew --version

# Install hugo
RUN brew install hugo