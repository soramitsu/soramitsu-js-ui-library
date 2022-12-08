FROM  nginxinc/nginx-unprivileged:1.23-alpine
COPY  ./storybook-static /usr/share/nginx/html
