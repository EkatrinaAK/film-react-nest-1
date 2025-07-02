#!/bin/bash
set -e

DB_NAME=${DATABASE_NAME:-prac}

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    ALTER USER postgres WITH PASSWORD '$POSTGRES_PASSWORD';
    
    
    SELECT 'CREATE DATABASE "$DB_NAME"' 
    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$DB_NAME')\gexec
    
   
    GRANT ALL PRIVILEGES ON DATABASE "$DB_NAME" TO postgres;
EOSQL