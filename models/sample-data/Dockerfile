# Step 1: Use the official MongoDB image as the base image
FROM mongodb/mongodb-community-server:latest

# Step 2: Set environment variables
ENV MONGO_INITDB_DATABASE Dinovate

# Step 3: Copy the sample data into the container (assuming the tar.gz is in the same directory as this Dockerfile)
COPY Dinovate.tar.gz /tmp/Dinovate.tar.gz

# Step 4: Unpack the sample data in the container
RUN tar -xzvpf /tmp/Dinovate.tar.gz -C /tmp

# Step 5: Set the entrypoint to run MongoDB
ENTRYPOINT ["mongod", "--bind_ip_all"]

# Step 6: Use CMD to restore the data and keep the container running
CMD ["bash", "-c", "mongorestore --db Dinovate /tmp/Dinovate && tail -f /dev/null"]
