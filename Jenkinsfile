pipeline {
    agent any
    
    stages {
        stage('Pull Repositories') {
            steps {
                echo 'Hello, World Koding!'
            }
        }
        
        stage('Stop Container') {
            steps {
                echo 'Stopping the running container...'
                sh 'docker stop prod-casheer-fe-container || true'
                sh 'docker rm prod-casheer-fe-container || true'
                echo 'Container stopped.'
            }
        }
        
        stage('Docker Images') {
            steps {
                echo 'Building Docker images...'
                
                // Menghapus image sebelumnya
                sh 'docker rmi prod-casheer-fe-image:latest || true'
                
                echo 'Proses Build'
                sh 'docker build -t prod-casheer-fe-image:latest .'
                echo 'Menampilkan hasil images'
                sh 'docker images'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Running the container...'
                sh 'docker run -d --name prod-casheer-fe-container -p 3000:3000 prod-casheer-fe-image:latest'
                echo 'Container is now running.'
                sh 'docker ps'
            }
        }
    }
}