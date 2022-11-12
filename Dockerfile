FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html
EXPOSE 80
RUN chmod -R a+r /usr/share/nginx/html
