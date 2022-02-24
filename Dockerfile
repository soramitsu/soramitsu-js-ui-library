FROM    nginxinc/nginx-unprivileged:1.20
COPY    ./storybook-static /usr/share/nginx/html