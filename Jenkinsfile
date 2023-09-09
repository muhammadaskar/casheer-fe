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

        stage('Copy .env.example to .env') {
            steps {
                // Use cat to read the content of .env.example and tee to write it to .env
                sh 'cat .env.example | tee .env'
            }
        }

        stage('Set Environment Variables') {
            steps {
                // Use Jenkins environment variables to replace values in the .env file
                sh "sed -i 's|VITE_REACT_APP_BASE_URL=.*|VITE_REACT_APP_BASE_URL=${VITE_REACT_APP_BASE_URL}' .env"
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
    post {
        success {
            // Script to be executed if the deployment is successful
            slackSend color: 'good', message: 'Deployment successful for *dev-casheer-fe* :white_check_mark:. The application has been deployed successfully.'
        }
        failure {
            // Script to be executed if the deployment fails
            slackSend color: 'danger', message: 'Deployment failed for *dev-casheer-fe* :x:. There was an issue during the deployment process.'
        }
    }
}