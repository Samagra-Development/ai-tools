# Use an official nginx runtime as a parent image
FROM nginx

RUN rm -rf /etc/nginx/conf.d/
RUN rm /etc/nginx/nginx.conf

# Copy the contents of the local conf.d folder to the image's conf.d directory
COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d /etc/nginx/conf.d/
COPY certificates /etc/nginx/certificates