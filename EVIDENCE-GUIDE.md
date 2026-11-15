# Evidence Guide — Tasks 1 to 10

Use the IBM Cloud Skills Network lab terminal. Replace every value inside angle brackets before running a command. The submitted evidence must be your real terminal output or code, not this guide.

## Before you start

```bash
git clone https://github.com/Amir888-s/guestbook-kubernetes-final-project.git
cd guestbook-kubernetes-final-project
ibmcloud login --sso
ibmcloud cr region-set global
ibmcloud cr login
ibmcloud cr namespace-list
```

Set variables using your actual values:

```bash
export MY_NAMESPACE=<your-registry-namespace>
export MY_CLUSTER=<your-cluster-name>
export IMAGE=us.icr.io/$MY_NAMESPACE/guestbook
ibmcloud ks cluster config --cluster "$MY_CLUSTER"
kubectl get nodes
sed -i "s|<namespace>|$MY_NAMESPACE|g" deployment.yml
```

## Task 1 — Updated Dockerfile

Submit the complete Dockerfile code. It contains the required COPY and EXPOSE instructions.

```bash
cat Dockerfile
```

Save as **task1-dockerfile.txt**.

## Task 2 — Push Guestbook v1

```bash
cp public/index.html public/index-v2.html
cp public/index-v1.html public/index.html
docker build -t "$IMAGE:v1" .
docker push "$IMAGE:v1"
ibmcloud cr images
mv public/index-v2.html public/index.html
```

Save the successful push and v1 listing as **task2-image-push-v1.txt**.

## Task 3 — Show deployed Guestbook v1

```bash
sed -i "s|guestbook:v2|guestbook:v1|g" deployment.yml
kubectl apply -f deployment.yml
kubectl apply -f service.yml
kubectl rollout status deployment/guestbook
kubectl get service guestbook
```

Wait for an external IP and open it. Capture the URL, **Guestbook - v1**, input, and Submit button as **task3-guestbook-v1.png**.

## Task 4 — Create HPA

```bash
kubectl apply -f hpa.yml
kubectl get hpa guestbook
```

The current replicas can initially show 0 until metrics are ready. Save as **task4-hpa-created.txt**.

## Task 5 — Prove scaling

```bash
kubectl apply -f load-generator.yml
kubectl get hpa guestbook --watch
```

Wait until REPLICAS is greater than 1, press Ctrl+C, then:

```bash
kubectl get hpa guestbook
kubectl get deployment guestbook
kubectl get pods -l app=guestbook
kubectl delete -f load-generator.yml
```

Save output showing increased replicas as **task5-hpa-scaled.txt**.

## Task 6 — Build and push v2

```bash
docker build -t "$IMAGE:v2" .
docker push "$IMAGE:v2"
ibmcloud cr images
docker inspect --format='{{index .RepoDigests 0}}' "$IMAGE:v2"
```

Save the build, push, and final digest as **task6-image-push-v2.txt**.

## Task 7 — Apply updated deployment

```bash
sed -i "s|guestbook:v1|guestbook:v2|g" deployment.yml
kubectl apply -f deployment.yml
kubectl rollout status deployment/guestbook
kubectl get deployment guestbook
```

Save as **task7-deployment-v2.txt**.

## Task 8 — Show v2 code and page

```bash
grep -n -E '<title>|<h1>' public/index.html
```

Capture the deployed page showing **Guestbook - v2**. Save **task8-index-v2.txt** and **task8-guestbook-v2.png**.

## Task 9 — Rollout history

```bash
kubectl rollout history deployment/guestbook
kubectl rollout history deployment/guestbook --revision=2
```

Save as **task9-rollout-history.txt**.

## Task 10 — Roll back and show ReplicaSets

```bash
kubectl rollout undo deployment/guestbook
kubectl rollout status deployment/guestbook
kubectl get deployment guestbook
kubectl get rs -l app=guestbook
kubectl rollout history deployment/guestbook
```

Save as **task10-rollback.txt**.

## Submission rules

- Run every command in the active IBM Cloud lab.
- Do not invent terminal output.
- Keep commands and complete successful outputs visible.
- Keep the browser URL and requested heading visible in page screenshots.
