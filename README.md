<p align="center">
  <a href="https://github.com/betrybe/process-content/actions"><img alt="javscript-action status" src="https://github.com/betrybe/process-content/workflows/units-test/badge.svg"></a>
</p>

# GitHub Action: Process Content from Merge

A GitHub action that process and creates content after merge from a specific _Pull Request_.

## Example usage
```yaml
steps:
  - name: Process Content
    uses: betrybe/process-content@main
    with:
      token: ${{ secrets.GITHUB_TOKEN }}
      dirPath: ${{ secrets.FILES_PATH}}
      apiKey: ${{ secrets.CONTENT_API_KEY}}
      chapterApiURL:  ${{ secrets.CONTENT_CHAPTER_API_URL}}
      versionApiURL:  ${{ secrets.CONTENT_VERSION_API_URL}}
```

## Inputs

This action accepts the following configuration parameters via `with:`

- `token`

  **Required**

  The Github secrets token for checkout the repo

- `dirPath`

  **Required**

  The directory path of files to be processed

- `apiKey`

  **Required**

  The Key for access on Trybe Api


- `chapterApiURL`

  **Required**

  Trybe Application Chapter env URL to process chapters

- `versionApiURL`

  **Required**

  Trybe Application Version env URL to process versions

- `awsAccessKey`

  **Required**

  AWS Key for authentication via aws-sdk library

- `awsSecret`

  **Required**

  AWS Secret for authentication via aws-sdk library

- `bucketName`

  **Required**

  AWS S3 Bucket name for storing assets

- `pullRequestMergedAt`

  **Required**

  Time stamp data of when the PR was merged

- `pullRequestMergeCommitId`

  **Required**

  Pull request number that triggered the action

- `pullRequestId`

  **Required**

  Pull request number that triggered the action

- `chunkSize`

  **Required**

  Size of group of files to be sent to chapter creation

- `intervalBetweenChunks`

  **Required**

  Interval in milliseconds between each group of chapter creation requests

## Outputs

- `result`

  If a new version was createad or not by the action

  ```json
  {"ok": true, "status": 200}
  ```


## Local Setup

Install the dependencies

```bash
npm install
```

Add Enviroment Variables

```bash
cp .env.example .env
```

Notice that in the `.env` file we have the **CONTENT_API_KEY** environment variable. Change its current value, from `<API_KEY>` to the value you want to use. It can be any value, for example:

```
CONTENT_API_KEY = dev_test_key
```

After doing this, go to the file `dev.exs` of the project **Trybe**. In this file add the following line to `config: trybe`:

```
content_api: "dev_test_key"
```

~~**PS:**~~ if your Trybe project is running, restart it.

**Importante**: Make sure that the `FILES_PATH` and` ASSETS_PATH` environment variables really reflect the path that your `.md` files and images are in.

Run locally

```bash
node index.js
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)
...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
const core = require('@actions/core');
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run package
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Usage

You can now consume the action by referencing the v1 branch

```yaml
uses: betrybe/process-content@v1
with:
  token: ${{ secrets.GITHUB_TOKEN }}
  dirPath: ${{ secrets.FILES_PATH}}
  apiKey: ${{ secrets.CONTENT_API_KEY}}
  chapterApiURL:  ${{ secrets.CONTENT_CHAPTER_API_URL}}
  versionApiURL:  ${{ secrets.CONTENT_VERSION_API_URL}}
```

See the [actions tab](https://github.com/actions/javascript-action/actions) for runs of this action! :rocket:
