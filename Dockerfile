FROM  nginxinc/nginx-unprivileged:1.20.0-alpine
COPY  ./storybook-static /usr/share/nginx/html