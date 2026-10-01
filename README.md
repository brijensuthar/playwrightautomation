==> Following command is use to make connection between GitHub Action to Azure (Particular User Login) to make CI/CD pipeline

az ad sp create-for-rbac `
  --name "github-playwright" `
  --role "Contributor" `
  --scopes "/subscriptions/7b069a4b-76e5-4dad-b34a-a1112b5a9e2b/resourceGroups/rsrc" `
  --json-auth

==> Following command is used make connection of storage of robot user to display report on azure.

az role assignment create `
   --assignee "3f771c10-18a1-4b7b-a6b0-7a32f80e7a73" `
   --role "Storage Blob Data Contributor" `
   --scope \$(az storage account show --name pwstrgrsrcfe85 --resource-group rsrc --query id -o tsv)
