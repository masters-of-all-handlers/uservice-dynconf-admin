FROM yobasystems/alpine-nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html
COPY .htpasswd /etc/.htpasswd
EXPOSE 80
RUN chmod -R a+r /usr/share/nginx/html
