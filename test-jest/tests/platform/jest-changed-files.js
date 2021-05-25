import { getChangedFilesForRoots, findRepos } from 'jest-changed-files';

getChangedFilesForRoots(["../"], {
  lastCommit: true,
}).then(res => {
  console.log("changedFiles: ", res.changedFiles);
});

findRepos(["../"]).then(repos => {
  console.log("repos: ", repos);
});