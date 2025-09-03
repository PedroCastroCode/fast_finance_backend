FROM node:18.2.0-alpine3.14

RUN mkdir -p /usr/src/template
WORKDIR /usr/src/template

RUN apk update && apk upgrade && apk add \
  curl \
  git \
  wget \
  zsh \
  procps

COPY . /usr/src/template/

EXPOSE 3333

RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
    -t https://github.com/denysdovhan/spaceship-prompt \
    -a 'SPACESHIP_PROMPT_ADD_NEWLINE="false"' \
    -a 'SPACESHIP_PROMPT_SEPARATE_LINE="false"' \
    -p git \
    -p ssh-agent \
    -p https://github.com/zsh-users/zsh-autosuggestions \
    -p https://github.com/zsh-users/zsh-completions

CMD [ "./start.sh" ]