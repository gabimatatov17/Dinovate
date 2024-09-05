# MongoDB Docker Restore Procedure

This guide provides step-by-step instructions to load the sample data to  mongodb container. 

## Steps

### 1. Run MongoDB Docker Container

```bash
docker run --name mongodb -p 27017:27017 -d mongodb/mongodb-community-server:latest
```

### 2. Extract the sample data
```bash
tar -xzvpf Dinovate.tar.gz
```

### 3. Copy the dump data to the mongodb container
```bash
docker cp Dinovate/ mongodb:/tmp/Dinovate
```

### 4. Execute the mongo restore command
```bash
docker exec mongodb mongorestore --db Dinovate /tmp/dump/Dinovate
```

### 5. Connect to the mongodb instance and check the db and the collections
```bash
mongosh --port 27017
show dbs
use Dinovate
show collection
```
