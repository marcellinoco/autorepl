#!/bin/bash

echo "Start to execute script"
echo "============================================================"

# docker-compose down

copy_env() {
    local dir=$1
    local env_file_name=${2:-".env"}

    if [ -d "$dir" ]; then
        echo "Directory '$dir' exists. Checking if it's a Git repository..."
    else
        echo "Directory '$dir' does not exist. Cloning repository..."
    fi

    cp .env "./$dir/$env_file_name"
    echo "Environment file copied to $dir/$env_file_name"
    echo "'$dir': Done"
    echo "============================================================"
}

declare -a repos=( 
    "frontend|.env"
    "server|app.env"
)

for repo in "${repos[@]}"; do
    IFS='|' read -r dir repo_url env_file_name <<< "$repo"
    copy_env "$dir" "$repo_url" "$env_file_name"
done

if command -v docker >/dev/null 2>&1; then
    echo "Docker is installed."
else
    echo "Docker is not installed. Please install :)"
    exit 1
fi

if command -v docker-compose >/dev/null 2>&1; then
    echo "Docker Compose is installed."
else
    echo "Docker Compose is not installed. Please install; :)"
    exit 1
fi

sudo docker-compose up -d --build
sudo docker image prune -f
