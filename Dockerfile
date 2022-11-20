FROM yobasystems/alpine-nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./build /etc/nginx/html
# COPY .htpasswd /etc/.htpasswd
EXPOSE 80
RUN chmod -R a+r /etc/nginx/html
