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
                sh 'docker stop dev-casheer-fe-container || true'
                sh 'docker rm dev-casheer-fe-container || true'
                echo 'Container stopped.'
            }
        }
        
        stage('Docker Images') {
            steps {
                echo 'Building Docker images...'
                
                // Menghapus image sebelumnya
                sh 'docker rmi dev-casheer-fe-image:latest || true'
                
                echo 'Proses Build'
                sh 'docker build -t dev-casheer-fe-image:latest .'
                echo 'Menampilkan hasil images'
                sh 'docker images'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Running the container...'
                sh 'docker run -d --name dev-casheer-fe-container -p 2000:2000 dev-casheer-fe-image:latest'
                echo 'Container is now running.'
                sh 'docker ps'
            }
        }
    }
}