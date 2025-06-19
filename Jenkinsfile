pipeline {
    agent any

    environment {
        IMAGE_NAME = 'vkoushik15/vbelog-fend'
        FRONTEND_EC2_IP = '51.21.182.121'
        SSH_KEY_PATH = '/home/ubuntu/newkey1.pem'
    }

    stages {
        stage('Clone Frontend Repo') {
            steps {
                git 'https://github.com/vkoushik07/vibelog-fend'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
                        docker push $IMAGE_NAME
                    '''
                }
            }
        }

        stage('Deploy to Frontend EC2') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no -i $SSH_KEY_PATH ubuntu@$FRONTEND_EC2_IP << EOF
                    docker stop frontend-app || true
                    docker rm frontend-app || true
                    docker pull $IMAGE_NAME
                    docker run -d -p 80:80 --name frontend-app $IMAGE_NAME
EOF
                '''
            }
        }
    }
}

