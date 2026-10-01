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

==> How to create new resource on Azure
1. Click on create resource on top left corner with + sign.
2. Search for Playwright Workspace Marketplaces and click on it.
3. Enter details like resource name, workspace name, reporting is ENABLE and your storage account name.
4. Click on Review + Create button.
5. Now click on Get Started to menu to follow next steps to make connection of you local machine to Azure Cloud.
6. Run your tests in local by npx playwright test --config=playwright.service.config.ts --workers=20 command
7. Now you can check your test result in Tests/Test runs menu.
