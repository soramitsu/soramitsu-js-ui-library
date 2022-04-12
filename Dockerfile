FROM    nginxinc/nginx-unprivileged:1.20
COPY    ./packages/ui/storybook-static /usr/share/nginx/html